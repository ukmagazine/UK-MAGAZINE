'use client';

import { Star } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { cn } from '@/lib/utils';

interface PinnedLabelProps {
  /** Light-on-dark, for cards whose text sits over a photograph. */
  inverted?: boolean;
  className?: string;
}

/**
 * Marks an article the editor has held at the top of this list.
 *
 * 🔴 Deliberately a sibling of `CategoryLabel` — brand-coloured text with a
 * leading mark — and NOT a filled pill. The filled brand-purple pill on this
 * site is «تبلیغ» (`SponsorPill`). A reader must never be able to take an
 * editorial selection for a paid placement, or a paid placement for an
 * editorial selection.
 *
 * The page decides whether to show it, never the article: an article pinned
 * to the homepage is not pinned on its desk page, and must not be labelled
 * there.
 */
export function PinnedLabel({ inverted = false, className }: PinnedLabelProps) {
  const { t } = useLocale();

  return (
    <span
      className={cn(
        'label inline-flex items-center gap-1',
        inverted ? 'text-white' : 'text-brand-red',
        className,
      )}
    >
      <Star aria-hidden="true" className="h-3 w-3 shrink-0 fill-current" />
      {t.home.pinned}
    </span>
  );
}
