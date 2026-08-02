'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BookmarkX, Compass } from 'lucide-react';
import { useMemo } from 'react';
import { ArticleCard } from '@/components/article/ArticleCard';
import { useBookmarks } from '@/components/providers/BookmarksProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { formatCount } from '@/lib/format';
import type { CardArticle } from '@/lib/types';

interface BookmarksListProps {
  /** The full corpus, so saved ids can be resolved on the client. */
  articles: CardArticle[];
}

/**
 * Saved stories, resolved from the ids in localStorage.
 *
 * Order follows the reader's save order (most recent first), not publication
 * order, because that is the order they will look for them in.
 */
export function BookmarksList({ articles }: BookmarksListProps) {
  const { ids, hydrated, clear } = useBookmarks();
  const reduced = useReducedMotion();
  const { t } = useLocale();

  const saved = useMemo(() => {
    const index = new Map(articles.map((article) => [article.id, article]));
    return ids
      .map((id) => index.get(id))
      .filter((article): article is CardArticle => Boolean(article));
  }, [articles, ids]);

  // Before hydration we cannot know what is saved; reserve the space quietly.
  if (!hydrated) {
    return (
      <div role="status" aria-label={t.bookmarks.title} className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[16/10] w-full bg-surface-soft" />
            <div className="mt-4 h-2.5 w-20 bg-surface-soft" />
            <div className="mt-3 h-4 w-full bg-surface-soft" />
            <div className="mt-2 h-4 w-4/5 bg-surface-soft" />
          </div>
        ))}
        <span className="sr-only">{t.bookmarks.title}</span>
      </div>
    );
  }

  if (saved.length === 0) {
    return (
      <div className="relative border border-line bg-surface-soft px-6 py-20 text-center">
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-14 w-14 bg-brand-red"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-line bg-surface">
          <BookmarkX aria-hidden="true" className="h-6 w-6 text-brand-red" />
        </span>

        <h2 className="font-serif text-2xl text-ink sm:text-3xl">{t.bookmarks.emptyTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          {t.bookmarks.emptyBody}
        </p>

        <Link
          href="/"
          className="group mt-8 inline-flex min-h-[48px] items-center gap-2 bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-red"
        >
          <Compass aria-hidden="true" className="h-4 w-4" />
          {t.bookmarks.browse}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p aria-live="polite" className="tabular text-xs uppercase tracking-[0.14em] text-ink-faint">
          {formatCount(saved.length)}{' '}
          {saved.length === 1 ? t.bookmarks.savedCount : t.bookmarks.savedCountPlural}
        </p>

        <button
          type="button"
          onClick={clear}
          className="inline-flex min-h-[40px] items-center gap-2 border border-line px-4 text-sm font-medium text-ink-soft transition-colors hover:border-brand-red hover:text-brand-red"
        >
          <BookmarkX aria-hidden="true" className="h-4 w-4" />
          {t.bookmarks.clearAll}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {saved.map((article) => (
            <motion.div
              key={article.id}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArticleCard article={article} variant="standard" headingLevel="h2" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
