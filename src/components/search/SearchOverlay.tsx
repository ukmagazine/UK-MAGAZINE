'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock, Search, Sparkles, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useSearch } from '@/components/providers/SearchProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { categoryShortName } from '@/i18n/category';
import { usePresence } from '@/hooks/usePresence';
import { categories } from '@/data/categories';
import { formatShortDate } from '@/lib/format';
import type { SearchPreviewItem } from '@/lib/search-index';
import { cn } from '@/lib/utils';
import { normalizePersian, normalizeTerms } from '@/lib/persian';

interface SearchOverlayProps {
  /**
   * A slim projection of the corpus, built on the server. Only the fields the
   * preview needs cross the boundary — article bodies never do.
   */
  articles: SearchPreviewItem[];
  suggestions: string[];
}

const MAX_PREVIEW = 6;

/** Exit animation duration, shared by the motion config and the unmount timer. */
const EXIT_MS = 280;

/**
 * Full-screen search overlay.
 *
 * Opens on the header button, "/" or Cmd/Ctrl+K. Results preview live as you
 * type; submitting navigates to the full results page.
 */
export function SearchOverlay({ articles, suggestions }: SearchOverlayProps) {
  const { open, closeSearch, recent, rememberSearch, clearRecent } = useSearch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [query, setQuery] = useState('');
  const { t } = useLocale();

  // Stay mounted for the exit animation, then unmount for certain.
  const { present, entered } = usePresence(open, EXIT_MS, Boolean(reduced));

  // Autofocus the field and reset state each time the overlay opens.
  useEffect(() => {
    if (!open) return;
    setQuery('');
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  // Escape closes; Tab stays inside the panel.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSearch();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, closeSearch]);

  // Lightweight client-side preview over titles, summaries and tags.
  const results = useMemo(() => {
    const terms = normalizeTerms(query);
    if (terms.length === 0) return [];

    return articles
      .map((article) => {
        const haystack = normalizePersian(
          `${article.title} ${article.summary} ${article.tags.join(' ')} ${article.categoryName}`,
        );
        const title = normalizePersian(article.title);
        const score = terms.reduce(
          (total, term) =>
            total +
            (title.includes(term) ? 10 : 0) +
            (haystack.includes(term) ? 3 : 0),
          0,
        );
        return { article, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_PREVIEW)
      .map((entry) => entry.article);
  }, [articles, query]);

  function goToResults(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;
    rememberSearch(trimmed);
    closeSearch();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    goToResults(query);
  }

  if (!present) return null;

  return (
    <>
      {/* Scrim */}
      <div
        onClick={closeSearch}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-overlay bg-ink/55 backdrop-blur-[3px] transition-opacity duration-200 ease-editorial',
          entered ? 'opacity-100' : 'opacity-0',
          // Never intercept clicks unless the overlay is actually open.
          entered ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.search}
        className={cn(
          'fixed inset-x-0 top-0 z-overlay max-h-[100dvh] overflow-y-auto overscroll-contain bg-surface shadow-overlay transition-all duration-[280ms] ease-editorial',
          entered ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
          entered ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
            <span aria-hidden="true" className="block h-[3px] w-full bg-brand-red" />

            <div className="frame py-5 sm:py-7">
              {/* Input ------------------------------------------- */}
              <form onSubmit={onSubmit} role="search" className="flex items-center gap-3">
                <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-red" />

                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.search.overlayPlaceholder}
                  aria-label={t.search.overlayPlaceholder}
                  className="min-h-[48px] w-full flex-1 border-0 bg-transparent font-serif text-xl text-ink outline-none placeholder:text-ink-faint sm:text-2xl"
                />

                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label={t.search.close}
                  className="-me-2.5 inline-flex h-11 w-11 shrink-0 items-center justify-center text-ink transition-colors hover:text-brand-red"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </form>

              <div className="mt-4 border-t border-line pt-5">
                {query.trim() === '' ? (
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {/* Suggested topics --------------------------- */}
                    <div>
                      <p className="label mb-3 flex items-center gap-1.5 text-ink-soft">
                        <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-brand-red" />
                        {t.search.suggested}
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {suggestions.map((topic) => (
                          <li key={topic}>
                            <button
                              type="button"
                              onClick={() => goToResults(topic)}
                              className="inline-flex min-h-[44px] items-center border border-line px-3 text-sm text-ink-soft transition-colors hover:border-ink hover:text-brand-red"
                            >
                              {topic}
                            </button>
                          </li>
                        ))}
                      </ul>

                      <p className="label mb-3 mt-7 text-ink-soft">{t.search.browseDesks}</p>
                      <ul className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <li key={category.slug}>
                            <Link
                              href={`/category/${category.slug}`}
                              onClick={closeSearch}
                              className="inline-flex min-h-[44px] items-center border border-line px-3 text-sm text-ink-soft transition-colors hover:border-ink hover:text-brand-red"
                            >
                              {categoryShortName(category)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recent searches ---------------------------- */}
                    <div>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="label flex items-center gap-1.5 text-ink-soft">
                          <Clock aria-hidden="true" className="h-3.5 w-3.5 text-brand-red" />
                          {t.search.recent}
                        </p>
                        {recent.length > 0 ? (
                          <button
                            type="button"
                            onClick={clearRecent}
                            className="text-xs font-medium text-ink-soft underline decoration-line-strong underline-offset-2 transition-colors hover:text-brand-red"
                          >
                            {t.search.clear}
                          </button>
                        ) : null}
                      </div>

                      {recent.length === 0 ? (
                        <p className="text-sm text-ink-faint">
                          {t.search.noRecent}
                        </p>
                      ) : (
                        <ul className="divide-y divide-line border-y border-line">
                          {recent.map((term) => (
                            <li key={term}>
                              <button
                                type="button"
                                onClick={() => goToResults(term)}
                                className="flex min-h-[44px] w-full items-center justify-between gap-3 py-2 text-left text-sm text-ink transition-colors hover:text-brand-red"
                              >
                                {term}
                                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 rtl:-scale-x-100" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  /* Empty state ------------------------------------ */
                  <div className="py-8 text-center">
                    <p className="font-serif text-2xl text-ink">No stories match “{query}”.</p>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                      Try a broader term, a desk name such as “science”, or browse the sections
                      above.
                    </p>
                  </div>
                ) : (
                  /* Live preview ----------------------------------- */
                  <div>
                    <p className="label mb-3 text-ink-soft" aria-live="polite">
                      {results.length} quick {results.length === 1 ? 'match' : 'matches'}
                    </p>

                    <ul className="divide-y divide-line border-y border-line">
                      {results.map((article) => (
                        <li key={article.id}>
                          <Link
                            href={`/article/${article.slug}/`}
                            onClick={closeSearch}
                            className="group flex items-start justify-between gap-4 py-3.5"
                          >
                            <span className="min-w-0">
                              <span className="label mb-1 block text-brand-red">
                                {article.categoryShortName}
                              </span>
                              <span className="clamp-2 block font-serif text-base leading-snug text-ink transition-colors group-hover:text-brand-red sm:text-lg">
                                {article.title}
                              </span>
                            </span>
                            <span className="tabular shrink-0 pt-5 text-xs text-ink-faint">
                              {formatShortDate(article.publishedAt)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => goToResults(query)}
                      className={cn(
                        'group mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand-red',
                      )}
                    >
                      <span className="link-underline">See all results for “{query}”</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1 rtl:-scale-x-100"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
      </div>
    </>
  );
}
