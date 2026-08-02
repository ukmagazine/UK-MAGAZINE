'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { ArticleCard } from '@/components/article/ArticleCard';
import type { CardArticle } from '@/lib/types';
import { useLocale } from '@/components/providers/LocaleProvider';
import { fill } from '@/i18n/dictionaries';
import { formatCount } from '@/lib/format';

interface CategoryStreamProps {
  articles: CardArticle[];
  /** Stories revealed per page. */
  pageSize?: number;
}

/**
 * A desk's stories as one list, with a load-more control.
 *
 * There is deliberately no topic sub-filter: a desk is already the filter, and
 * a second row of chips split a small corpus into slices that were mostly
 * empty. Readers who want a narrower cut have search.
 */
export function CategoryStream({ articles, pageSize = 6 }: CategoryStreamProps) {
  const [visible, setVisible] = useState(pageSize);
  const reduced = useReducedMotion();
  const { t } = useLocale();

  const shown = articles.slice(0, visible);
  const remaining = articles.length - shown.length;

  if (articles.length === 0) return null;

  return (
    <section aria-label={t.filters.allStories}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((article, index) => (
            <motion.div
              key={article.id}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{
                duration: 0.32,
                delay: Math.min(index % pageSize, 4) * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ArticleCard article={article} variant="standard" headingLevel="h3" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {remaining > 0 ? (
        <div className="mt-12 flex flex-col items-center gap-3">
          <p aria-live="polite" className="tabular text-xs uppercase tracking-[0.14em] text-ink-faint">
            {t.filters.showing} {formatCount(shown.length)} {t.filters.of}{' '}
            {formatCount(articles.length)}
          </p>

          <button
            type="button"
            onClick={() => setVisible((current) => current + pageSize)}
            className="group inline-flex min-h-[48px] items-center gap-2 border border-ink px-7 text-sm font-semibold text-ink transition-colors duration-200 hover:border-brand-red hover:bg-brand-red hover:text-white"
          >
            {fill(t.filters.loadMore, { count: Math.min(remaining, pageSize) })}
          </button>
        </div>
      ) : null}
    </section>
  );
}
