import type { SponsoredKind } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Commercial-content disclosure.
 *
 * Three states, and each has to be distinguishable from editorial *and from
 * each other*. Under the UK CAP Code, paid content presented as editorial
 * without clear labelling is a compliance problem, and `advertorial` is
 * exactly the case the rule exists for — a reader cannot tell it apart from
 * editorial by looking.
 *
 * So the label is set at body-copy size in a filled chip, not as small grey
 * type. `paid` and `advertorial` share the brand wash because both involve
 * money; `supported` is visually quieter because no payment changed hands,
 * but it is still labelled.
 */
const DISCLOSURES = {
  paid: {
    label: 'تبلیغ',
    text: 'این مطلب با پرداخت هزینه منتشر شده است.',
    band: 'border-brand-red bg-brand-wash',
    chip: 'bg-brand-red text-white',
    body: 'text-brand-deep',
  },
  advertorial: {
    label: 'رپورتاژ آگهی',
    text: 'این مطلب با پرداخت هزینه و به سفارش آگهی‌دهنده تهیه شده است.',
    band: 'border-brand-red bg-brand-wash',
    chip: 'border border-brand-red bg-surface text-brand-deep',
    body: 'text-brand-deep',
  },
  supported: {
    label: 'معرفی',
    text: 'انتخاب تحریریه، بدون دریافت هزینه.',
    band: 'border-ink-soft bg-surface-soft',
    chip: 'bg-ink text-white',
    body: 'text-ink-strong',
  },
} as const;

/** Short label for a card in a listing. */
const PILLS = {
  paid: { label: 'تبلیغ', className: 'bg-brand-red text-white' },
  advertorial: { label: 'رپورتاژ', className: 'border border-brand-red bg-surface text-brand-deep' },
  supported: { label: 'معرفی', className: 'bg-ink text-white' },
} as const;

interface SponsorDisclosureProps {
  sponsored: SponsoredKind;
  className?: string;
}

/** The band shown immediately above an article headline. */
export function SponsorDisclosure({ sponsored, className }: SponsorDisclosureProps) {
  if (!sponsored) return null;

  const disclosure = DISCLOSURES[sponsored];

  return (
    <aside
      // Announced rather than decorative: the reader needs this before the
      // headline, not after they have taken the piece for a news report.
      role="note"
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-sm border-s-4 px-4 py-3',
        disclosure.band,
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex items-center rounded-sm px-2.5 py-1 text-sm font-bold',
          disclosure.chip,
        )}
      >
        {disclosure.label}
      </span>
      <span className={cn('text-sm leading-relaxed', disclosure.body)}>{disclosure.text}</span>
    </aside>
  );
}

/**
 * The same distinction on a card, so a reader browsing a feed can tell before
 * clicking rather than after.
 */
export function SponsorPill({ sponsored, className }: SponsorDisclosureProps) {
  if (!sponsored) return null;

  const pill = PILLS[sponsored];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-0.5 text-2xs font-bold uppercase tracking-[0.08em]',
        pill.className,
        className,
      )}
    >
      {pill.label}
    </span>
  );
}
