import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ResolvedArticle } from '@/lib/types';
import { cn } from '@/lib/utils';

interface NextArticleNavProps {
  previous?: ResolvedArticle;
  next?: ResolvedArticle;
  className?: string;
}

/** Previous / next navigation in publication order. */
export function NextArticleNav({ previous, next, className }: NextArticleNavProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="گزارش پیشین و پسین"
      className={cn('grid grid-cols-1 border-y border-line sm:grid-cols-2', className)}
    >
      {previous ? (
        <Link
          href={`/article/${previous.slug}/`}
          className="group flex flex-col gap-2 border-b border-line p-5 transition-colors hover:bg-surface-soft sm:border-b-0 sm:border-e sm:p-7"
        >
          <span className="label inline-flex items-center gap-1.5 text-ink-soft">
            <ArrowLeft
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:-translate-x-1 rtl:-scale-x-100"
            />
            گزارش تازه‌تر
          </span>
          <span className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-brand-red">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={`/article/${next.slug}/`}
          className="group flex flex-col items-start gap-2 p-5 transition-colors hover:bg-surface-soft sm:items-end sm:p-7 sm:text-end"
        >
          <span className="label inline-flex items-center gap-1.5 text-ink-soft">
            گزارش پیشین
            <ArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:translate-x-1 rtl:-scale-x-100"
            />
          </span>
          <span className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-brand-red">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
