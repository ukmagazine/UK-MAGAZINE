'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArticleCard } from '@/components/article/ArticleCard';
import type { CardArticle } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';

interface EditorsPicksRowProps {
  articles: CardArticle[];
}

/**
 * Editor's Picks as a row of elevated cards.
 *
 * A four-up grid on wide screens; below that, a swipeable snap row with
 * compact previous/next controls. Scrolling is native, so keyboard and
 * touch behaviour come for free.
 */
export function EditorsPicksRow({ articles }: EditorsPicksRowProps) {
  const { t } = useLocale();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateControls();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    return () => {
      track.removeEventListener('scroll', updateControls);
      window.removeEventListener('resize', updateControls);
    };
  }, [updateControls]);

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: 'smooth' });
  }, []);

  const arrowClass =
    'inline-flex h-8 w-8 items-center justify-center rounded-sm border border-line bg-surface text-ink transition-colors duration-200 hover:border-ink hover:text-brand-red disabled:cursor-default disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink';

  return (
    <div>
      {/* Section rule: label left, "View all" and the scroll controls right —
          the controls sit on the rule itself, as in the reference. */}
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-line pb-3">
        <h2 className="label flex items-center text-ink">
          <span aria-hidden="true" className="me-2.5 h-[3px] w-5 bg-brand-red" />
          {t.home.editorsPicks}
        </h2>

        <div className={cn('flex items-center gap-2', !canPrev && !canNext && '[&>button]:hidden')}>
          <Link
            href="/category/world"
            className="-my-2 inline-flex items-center py-2 text-xs font-medium text-ink-soft transition-colors hover:text-brand-red"
          >
            {t.home.viewAll}
          </Link>
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            aria-label={t.home.prevPicks}
            className={arrowClass}
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            aria-label={t.home.nextPicks}
            className={arrowClass}
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 xs:-mx-5 xs:px-5 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 xl:mx-0 xl:grid xl:snap-none xl:grid-cols-4 xl:overflow-visible xl:px-0"
      >
        {articles.map((article) => (
          <div
            key={article.id}
            className="w-[82%] min-w-0 shrink-0 snap-start xs:w-[70%] sm:w-[46%] lg:w-[31%] xl:w-auto"
          >
            <ArticleCard article={article} variant="pick" headingLevel="h3" />
          </div>
        ))}
      </div>
    </div>
  );
}
