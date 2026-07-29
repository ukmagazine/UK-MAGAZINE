'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ArticleCard } from '@/components/article/ArticleCard';
import type { CardArticle } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';
import { fill } from '@/i18n/dictionaries';

interface CategoryStreamProps {
  articles: CardArticle[];
  topics: string[];
  /** Stories revealed per page. */
  pageSize?: number;
}

/**
 * Topic filters plus a load-more control.
 *
 * Filtering is client-side over the desk's stories; the result count and an
 * aria-live region keep screen readers informed as the list changes.
 */
export function CategoryStream({ articles, topics, pageSize = 6 }: CategoryStreamProps) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [visible, setVisible] = useState(pageSize);
  const reduced = useReducedMotion();
  const { t } = useLocale();

  const filtered = useMemo(() => {
    if (!activeTopic) return articles;
    const needle = activeTopic.toLowerCase();
    return articles.filter((article) =>
      article.tags.some((tag) => tag.toLowerCase() === needle),
    );
  }, [articles, activeTopic]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  function selectTopic(topic: string | null) {
    setActiveTopic(topic);
    setVisible(pageSize);
  }

  return (
    <section aria-labelledby="stream-heading">
      <div className="mb-7 border-t border-line pt-5">
        <h2 id="stream-heading" className="label mb-4 flex items-center text-ink">
          <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-brand-red" />
          {t.filters.allStories}
        </h2>

        {/* Topic filters ------------------------------------- */}
        <div
          role="group"
          aria-label={t.filters.allStories}
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          <button
            type="button"
            onClick={() => selectTopic(null)}
            aria-pressed={activeTopic === null}
            className={cn(
              'inline-flex min-h-[40px] shrink-0 items-center border px-4 text-sm transition-colors duration-200',
              activeTopic === null
                ? 'border-brand-red bg-brand-red text-white'
                : 'border-line text-ink-soft hover:border-ink hover:text-ink',
            )}
          >
            {t.filters.all}
          </button>

          {topics.map((topic) => {
            const active = activeTopic === topic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => selectTopic(topic)}
                aria-pressed={active}
                className={cn(
                  'inline-flex min-h-[40px] shrink-0 items-center border px-4 text-sm transition-colors duration-200',
                  active
                    ? 'border-brand-red bg-brand-red text-white'
                    : 'border-line text-ink-soft hover:border-ink hover:text-ink',
                )}
              >
                {topic}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="tabular mt-4 text-xs uppercase tracking-[0.14em] text-ink-faint">
          {t.filters.showing} {shown.length} {t.filters.of} {filtered.length}
          {activeTopic ? ` in ${activeTopic}` : ''}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-line bg-surface-soft px-6 py-14 text-center">
          <p className="font-serif text-2xl text-ink">{t.search.noResults} “{activeTopic}”</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
            {t.search.noResultsBody}
          </p>
          <button
            type="button"
            onClick={() => selectTopic(null)}
            className="mt-6 inline-flex min-h-[44px] items-center bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-red"
          >
            {t.filters.allStories}
          </button>
        </div>
      ) : (
        <>
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
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((current) => current + pageSize)}
                className="group inline-flex min-h-[48px] items-center gap-2 border border-ink px-7 text-sm font-semibold text-ink transition-colors duration-200 hover:border-brand-red hover:bg-brand-red hover:text-white"
              >
                {fill(t.filters.loadMore, { count: Math.min(remaining, pageSize) })}
                <span aria-hidden="true" className="tabular text-xs opacity-60">
                  ({remaining} {t.filters.left})
                </span>
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
