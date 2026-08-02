import { Binoculars, Flag, Layers, Sparkles, Zap } from 'lucide-react';
import type { Briefing } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SmartBriefingProps {
  briefing: Briefing;
  className?: string;
  /** Compact rendering for cards and sidebars. */
  variant?: 'panel' | 'inline';
  headingLevel?: 'h2' | 'h3';
}

const SECTIONS = [
  { key: 'whatHappened', label: 'چه اتفاقی افتاد', Icon: Zap },
  { key: 'whyItMatters', label: 'چرا مهم است', Icon: Flag },
  { key: 'biggerPicture', label: 'تصویر بزرگ‌تر', Icon: Layers },
  { key: 'whatToWatch', label: 'چه چیزی را دنبال کنیم', Icon: Binoculars },
] as const;

/**
 * The UK MAGAZINE briefing panel — our structured summary format.
 *
 * Each row is a compact heading with a red marker and a single sentence of
 * substance, closing with the key takeaway set in the display serif.
 */
export function SmartBriefing({
  briefing,
  className,
  variant = 'panel',
  headingLevel: Heading = 'h2',
}: SmartBriefingProps) {
  const rows = SECTIONS.filter(({ key }) => Boolean(briefing[key]));

  return (
    <aside
      className={cn(
        'relative',
        variant === 'panel' ? 'rounded-md border border-line bg-surface p-5 shadow-card sm:p-7' : 'py-2',
        className,
      )}
      aria-labelledby="briefing-heading"
    >
      {variant === 'panel' ? (
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-6 w-6 bg-brand-red"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />
      ) : null}

      <Heading
        id="briefing-heading"
        className="label mb-5 flex items-center gap-2 text-brand-red"
      >
        <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
        خلاصهٔ گزارش
      </Heading>

      <dl className="space-y-4">
        {rows.map(({ key, label, Icon }) => (
          <div key={key} className="grid grid-cols-[auto_1fr] gap-x-3">
            <dt className="col-span-2 mb-1 flex items-center gap-2 text-2xs font-semibold uppercase tracking-[0.14em] text-ink">
              <Icon aria-hidden="true" className="h-3.5 w-3.5 text-brand-red" />
              {label}
            </dt>
            <dd className="col-span-2 border-s border-line ps-4 text-sm leading-relaxed text-ink-soft">
              {briefing[key]}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 border-t border-line pt-5">
        <p className="label mb-2 text-ink-soft">نکتهٔ کلیدی</p>
        <p className="font-serif text-lg leading-snug text-ink sm:text-xl">
          {briefing.keyTakeaway}
        </p>
      </div>
    </aside>
  );
}
