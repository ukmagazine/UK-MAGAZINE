'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { Dictionary } from '@/i18n/dictionaries';

interface SectionHeaderProps {
  /** Literal title. Ignored when `titleKey` is supplied. */
  title: string;
  /** Key into the `sections` dictionary, so the label translates. */
  titleKey?: keyof Dictionary['sections'];
  /** Optional standfirst. Only rendered by the `display` size. */
  description?: string;
  /** Small uppercase kicker. Only rendered by the `display` size. */
  kicker?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  /**
   * `label` (default) is the compact uppercase rule used to separate homepage
   * and category sections — a red marker, the section name, and an optional
   * link. `display` is the large serif treatment reserved for page-level
   * headings such as About and Newsletter.
   */
  size?: 'label' | 'display';
  as?: 'h2' | 'h3';
}

/**
 * Section heading.
 *
 * Defaults to a compact editorial rule rather than a large title: a page with
 * eight display-sized section headings reads as oversized and pushes the
 * content that matters below the fold.
 */
export function SectionHeader({
  title,
  titleKey,
  description,
  kicker,
  href,
  linkLabel,
  className,
  size = 'label',
  as: Heading = 'h2',
}: SectionHeaderProps) {
  const { t } = useLocale();
  const label = titleKey ? t.sections[titleKey] : title;
  const linkText = linkLabel ?? t.home.viewAll;
  if (size === 'label') {
    return (
      <div
        className={cn(
          'mb-6 flex items-center justify-between gap-4 border-b border-line pb-3',
          className,
        )}
      >
        <Heading className="label flex items-center text-ink">
          <span aria-hidden="true" className="me-2.5 h-[3px] w-5 bg-brand-red" />
          {label}
        </Heading>

        {href ? (
          <Link
            href={href}
            className="group -my-2 inline-flex shrink-0 items-center gap-1.5 py-2 text-xs font-medium text-ink-soft transition-colors hover:text-brand-red"
          >
            {linkText}
            <ArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 rtl:-scale-x-100"
            />
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn('mb-8 border-t border-line pt-5', className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="max-w-2xl">
          {kicker ? (
            <p className="label mb-2 flex items-center text-brand-red">
              <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-brand-red" />
              {kicker}
            </p>
          ) : null}

          <Heading className="font-serif text-3xl tracking-[-0.03em] text-ink sm:text-4xl">
            {title}
          </Heading>

          {description ? (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{description}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="group inline-flex min-h-[44px] items-center gap-1.5 self-end text-sm font-medium text-ink transition-colors hover:text-brand-red"
          >
            <span className="link-underline">{linkText}</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1 rtl:-scale-x-100"
            />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
