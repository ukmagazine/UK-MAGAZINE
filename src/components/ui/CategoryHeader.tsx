import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatCount } from '@/lib/format';

interface CategoryHeaderProps {
  category: Category;
  articleCount: number;
  className?: string;
}

/**
 * Category landing header.
 *
 * Each desk gets a subtle identity via a very low-opacity tint wash behind the
 * title; red remains the only saturated colour on the page.
 */
export function CategoryHeader({ category, articleCount, className }: CategoryHeaderProps) {
  return (
    <header className={cn('relative overflow-hidden border-b border-line', className)}>
      {/* Desk tint, kept faint so the palette stays red-and-white. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.055]"
        style={{ background: `linear-gradient(120deg, ${category.tint} 0%, transparent 62%)` }}
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-20 w-20 bg-brand-red sm:h-28 sm:w-28"
        style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
      />

      <div className="frame relative py-8 sm:py-10">
        <nav aria-label="مسیر راهبری" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-soft">
            <li>
              <Link
                href="/"
                className="inline-flex min-h-[44px] items-center transition-colors hover:text-brand-red"
              >
                خانه
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3 w-3 text-line-strong rtl:-scale-x-100" />
            </li>
            <li>
              <span className="font-medium text-ink">{category.name}</span>
            </li>
          </ol>
        </nav>

        <p className="label mb-2.5 flex items-center text-brand-red">
          <span aria-hidden="true" className="me-2 h-[3px] w-6 bg-brand-red" />
          سرویس
        </p>

        <h1 className="max-w-3xl font-serif text-display tracking-[-0.025em] text-ink">
          {category.name}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          {category.standfirst}
        </p>

        <p className="tabular mt-5 text-xs uppercase tracking-[0.14em] text-ink-faint">
          {formatCount(articleCount)} گزارش
        </p>
      </div>
    </header>
  );
}
