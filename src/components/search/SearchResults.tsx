'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArticleCard } from '@/components/article/ArticleCard';
import { categories } from '@/data/categories';
import { useLocale } from '@/components/providers/LocaleProvider';
import { categoryShortName } from '@/i18n/category';
import { searchCards } from '@/lib/search-cards';
import type { CardArticle, CategorySlug, DateRange, SortOrder } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SearchResultsProps {
  /** Card-shaped corpus supplied by the server page. */
  articles: CardArticle[];
}

const SORT_VALUES: ReadonlyArray<{ value: SortOrder; key: 'relevance' | 'newest' | 'oldest' | 'mostRead' }> = [
  { value: 'relevance', key: 'relevance' },
  { value: 'newest', key: 'newest' },
  { value: 'oldest', key: 'oldest' },
  { value: 'most-read', key: 'mostRead' },
];

const RANGE_VALUES: ReadonlyArray<{ value: DateRange; key: 'any' | 'day' | 'week' | 'month' | 'year' }> = [
  { value: 'any', key: 'any' },
  { value: '24h', key: 'day' },
  { value: 'week', key: 'week' },
  { value: 'month', key: 'month' },
  { value: 'year', key: 'year' },
];

/**
 * Full search results.
 *
 * Reads the query from the URL so results are linkable and shareable, then
 * filters the card projection handed down by the server. A brief loading state
 * runs on each query change to model the latency a real backend would add.
 */
export function SearchResults({ articles }: SearchResultsProps) {
  const router = useRouter();
  const params = useSearchParams();
  const reduced = useReducedMotion();
  const { t, locale } = useLocale();

  const queryParam = params.get('q') ?? '';

  const [input, setInput] = useState(queryParam);
  const [selected, setSelected] = useState<CategorySlug[]>([]);
  const [range, setRange] = useState<DateRange>('any');
  const [sort, setSort] = useState<SortOrder>('relevance');
  const [loading, setLoading] = useState(false);

  // Keep the field in sync when the reader navigates with browser history.
  useEffect(() => {
    setInput(queryParam);
  }, [queryParam]);

  // Simulated fetch latency, so the loading state is real rather than decorative.
  useEffect(() => {
    if (!queryParam) return;
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 320);
    return () => window.clearTimeout(timer);
  }, [queryParam, selected, range, sort]);

  const results = useMemo(
    () =>
      queryParam
        ? searchCards(articles, { query: queryParam, categorySlugs: selected, range, sort })
        : [],
    [articles, queryParam, selected, range, sort],
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  }

  function toggleCategory(slug: CategorySlug) {
    setSelected((current) =>
      current.includes(slug) ? current.filter((entry) => entry !== slug) : [...current, slug],
    );
  }

  return (
    <div className="frame py-10 sm:py-14">
      <header className="mx-auto max-w-3xl text-center">
        <p className="label mb-3 flex items-center justify-center text-brand-red">
          <span aria-hidden="true" className="me-2 h-[3px] w-6 bg-brand-red" />
          {t.search.title}
        </p>
        <h1 className="font-serif text-display tracking-[-0.025em] text-ink">{t.search.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          {t.search.emptyBody}
        </p>

        <form onSubmit={onSubmit} role="search" className="mt-8">
          <label htmlFor="search-input" className="sr-only">
            {t.search.title}
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
              />
              <input
                id="search-input"
                type="search"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t.search.placeholder}
                className="min-h-[52px] w-full border border-line bg-surface ps-11 pe-4 text-base text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-ink"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-[52px] items-center justify-center bg-brand-red px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
            >
              {t.nav.search}
            </button>
          </div>
        </form>
      </header>

      {/* Filters ---------------------------------------------- */}
      <div className="mt-12 border-y border-line py-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-5">
          <p className="label flex items-center gap-2 text-ink">
            <SlidersHorizontal aria-hidden="true" className="h-3.5 w-3.5 text-brand-red" />
            {t.search.refine}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="range-select" className="text-xs font-medium text-ink-soft">
              {t.search.published}
            </label>
            <select
              id="range-select"
              value={range}
              onChange={(event) => setRange(event.target.value as DateRange)}
              className="min-h-[40px] border border-line bg-surface px-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            >
              {RANGE_VALUES.map((option) => (
                <option key={option.value} value={option.value}>
                  {t.filters[option.key]}
                </option>
              ))}
            </select>

            <label htmlFor="sort-select" className="text-xs font-medium text-ink-soft">
              {t.search.sortBy}
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOrder)}
              className="min-h-[40px] border border-line bg-surface px-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            >
              {SORT_VALUES.map((option) => (
                <option key={option.value} value={option.value}>
                  {t.filters[option.key]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          role="group"
          aria-label={t.search.refine}
          className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap"
        >
          {categories.map((category) => {
            const active = selected.includes(category.slug);
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => toggleCategory(category.slug)}
                aria-pressed={active}
                className={cn(
                  'inline-flex min-h-[40px] shrink-0 items-center border px-4 text-sm transition-colors duration-200',
                  active
                    ? 'border-brand-red bg-brand-red text-white'
                    : 'border-line text-ink-soft hover:border-ink hover:text-ink',
                )}
              >
                {categoryShortName(category, locale)}
              </button>
            );
          })}

          {selected.length > 0 ? (
            <button
              type="button"
              onClick={() => setSelected([])}
              className="inline-flex min-h-[40px] shrink-0 items-center px-3 text-sm font-medium text-ink-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-brand-red"
            >
              {t.search.clearDesks}
            </button>
          ) : null}
        </div>
      </div>

      {/* Results ---------------------------------------------- */}
      <div className="mt-9">
        {!queryParam ? (
          <EmptyState
            title={t.search.emptyTitle}
            body={t.search.emptyBody}
          />
        ) : loading ? (
          <ResultsSkeleton />
        ) : results.length === 0 ? (
          <EmptyState
            title={`${t.search.noResults} “${queryParam}”`}
            body={t.search.noResultsBody}
          />
        ) : (
          <>
            <p aria-live="polite" className="tabular mb-7 text-xs uppercase tracking-[0.14em] text-ink-faint">
              {results.length} {results.length === 1 ? t.search.result : t.search.results} — “{queryParam}”
            </p>

            <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {results.map((article, index) => (
                  <motion.div
                    key={article.id}
                    layout={!reduced}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(index, 5) * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ArticleCard article={article} variant="standard" headingLevel="h2" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-line bg-surface-soft px-6 py-16 text-center">
      <span
        aria-hidden="true"
        className="mx-auto mb-5 block h-[3px] w-10 bg-brand-red"
      />
      <p className="font-serif text-2xl text-ink sm:text-3xl">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}

/** Skeleton placeholders reserve the same space the results will occupy. */
function ResultsSkeleton() {
  const { t } = useLocale();

  return (
    <div
      role="status"
      aria-label={t.search.loading}
      className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[16/10] w-full bg-surface-soft" />
          <div className="mt-4 h-2.5 w-20 bg-surface-soft" />
          <div className="mt-3 h-4 w-full bg-surface-soft" />
          <div className="mt-2 h-4 w-4/5 bg-surface-soft" />
          <div className="mt-4 h-3 w-32 bg-surface-soft" />
        </div>
      ))}
      <span className="sr-only">{t.search.loading}</span>
    </div>
  );
}
