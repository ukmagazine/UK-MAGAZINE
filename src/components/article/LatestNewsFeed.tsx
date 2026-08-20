'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { AdSlot } from '@/components/ads/AdSlot';
import { ArticleBadge } from '@/components/article/ArticleBadge';
import { BookmarkButton } from '@/components/article/BookmarkButton';
import { CategoryLabel } from '@/components/ui/CategoryLabel';
import { RelativeTime } from '@/components/ui/RelativeTime';
import { formatTime } from '@/lib/format';
import type { CardArticle } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';
import { FEED_AD_INTERVAL } from '@/data/ads';
import { site } from '@/data/site';

interface LatestNewsFeedProps {
  articles: CardArticle[];
  title?: string;
  className?: string;
  /** Shows the fixed publication time in a left rail, wire-service style. */
  showTimeRail?: boolean;
  /** Tighter rows without bookmark controls, for narrow homepage columns. */
  compact?: boolean;
}

/** Chronological stream of recent stories with timestamps. */
export function LatestNewsFeed({
  articles,
  title,
  className,
  showTimeRail = true,
  compact = false,
}: LatestNewsFeedProps) {
  const { t } = useLocale();
  const heading = title ?? t.home.latest;
  if (articles.length === 0) return null;

  return (
    <section className={cn(className)} aria-labelledby="latest-heading">
      <h2 id="latest-heading" className="label mb-5 flex items-center text-ink">
        <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-brand-red" />
        {heading}
      </h2>

      <ol className="divide-y divide-line border-b border-line">
        {articles.map((article, index) => (
          <Fragment key={article.id}>
          <li
            className={cn('group relative flex items-start gap-4', compact ? 'py-3.5' : 'py-4')}
          >
            {showTimeRail ? (
              <span
                aria-hidden="true"
                className="tabular hidden w-14 shrink-0 pt-[3px] text-xs font-medium text-ink-faint sm:block"
              >
                {formatTime(article.publishedAt)}
              </span>
            ) : null}

            <div className="min-w-0 flex-1">
              <div className="relative z-10 mb-1.5 flex flex-wrap items-center gap-2">
                <CategoryLabel category={article.categoryRef} />
                <ArticleBadge kind={article.kind} />
              </div>

              <h3
                className={cn(
                  'font-serif font-medium leading-snug text-ink',
                  compact ? 'text-[0.95rem]' : 'text-base sm:text-lg',
                )}
              >
                <Link
                  href={`/article/${article.slug}/`}
                  className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] hover:text-brand-red focus-visible:text-brand-red"
                >
                  {article.title}
                </Link>
              </h3>

              <p className="mt-1.5 text-xs text-ink-soft">
                <RelativeTime iso={article.publishedAt} />
              </p>
            </div>

            {compact || !site.features.bookmarks ? null : (
              <BookmarkButton
                articleId={article.id}
                title={article.title}
                className="relative z-10"
              />
            )}
          </li>
          {(index + 1) % FEED_AD_INTERVAL === 0 ? (
            <AdSlot placement="feed" as="li" className="border-t border-line py-4" />
          ) : null}
          </Fragment>
        ))}
      </ol>
    </section>
  );
}
