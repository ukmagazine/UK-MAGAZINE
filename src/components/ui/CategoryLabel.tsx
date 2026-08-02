'use client';

import Link from 'next/link';
import type { CardCategory } from '@/lib/types';
import { categoryShortName } from '@/i18n/category';
import { cn } from '@/lib/utils';

interface CategoryLabelProps {
  category: CardCategory;
  className?: string;
  /** Light-on-dark, for use over imagery. */
  inverted?: boolean;
  /** Renders as plain text when already inside a link. */
  asText?: boolean;
}

/** Compact desk label with a red leading marker. */
export function CategoryLabel({
  category,
  className,
  inverted = false,
  asText = false,
}: CategoryLabelProps) {
  const classes = cn(
    // `py-2 -my-2` grows the tap target without altering the visual rhythm.
    'label inline-flex items-center gap-1.5 transition-colors',
    asText ? null : 'py-2 -my-2',
    inverted ? 'text-white' : 'text-brand-red hover:text-brand-deep',
    className,
  );

  const content = (
    <>
      <span
        aria-hidden="true"
        className={cn('h-[3px] w-3 shrink-0', inverted ? 'bg-white' : 'bg-brand-red')}
      />
      {categoryShortName(category)}
    </>
  );

  if (asText) return <span className={classes}>{content}</span>;

  return (
    <Link href={`/category/${category.slug}`} className={classes}>
      {content}
    </Link>
  );
}
