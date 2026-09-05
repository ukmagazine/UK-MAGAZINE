import { Clapperboard, MessageSquareQuote, Mic, Radio, Telescope } from 'lucide-react';
import type { ArticleKind } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * 🔴 One entry per `ArticleKind` except `report`, which is the unbadged
 * default. A kind added to the union without an entry here reaches
 * `BADGES[kind]` as `undefined` and the destructure below throws during the
 * static export — a build failure, not a missing badge.
 */
const BADGES = {
  breaking: { label: 'فوری', Icon: Radio },
  opinion: { label: 'دیدگاه', Icon: MessageSquareQuote },
  video: { label: 'ویدیو', Icon: Clapperboard },
  analysis: { label: 'تحلیل', Icon: Telescope },
  interview: { label: 'مصاحبه', Icon: Mic },
} as const;

interface ArticleBadgeProps {
  kind: ArticleKind;
  className?: string;
  inverted?: boolean;
}

/**
 * Editorial treatment badge. Plain reports carry no badge, so the marker only
 * ever appears where it signals something.
 */
export function ArticleBadge({ kind, className, inverted = false }: ArticleBadgeProps) {
  if (kind === 'report') return null;

  const { label, Icon } = BADGES[kind];
  const isBreaking = kind === 'breaking';

  return (
    <span
      className={cn(
        'label inline-flex items-center gap-1.5 border px-2 py-1',
        isBreaking
          ? 'border-brand-red bg-brand-red text-white'
          : inverted
            ? 'border-white/45 text-white'
            : 'border-line bg-surface text-ink-soft',
        className,
      )}
    >
      <Icon aria-hidden="true" className="h-3 w-3" />
      {label}
    </span>
  );
}
