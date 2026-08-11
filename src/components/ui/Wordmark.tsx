import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

interface WordmarkProps {
  className?: string;
  /** Renders light-on-dark, for the footer. */
  inverted?: boolean;
  /** Suppresses the link wrapper when the mark sits inside another link. */
  asText?: boolean;
  /**
   * Renders the mark alone, without the name. Used where the publication name
   * would crowd the row. The link still carries an accessible name via its
   * aria-label.
   */
  markOnly?: boolean;
}

/**
 * The UK MAGAZINE lockup: the circular mark beside the publication name.
 *
 * The mark is circular and reads as a mark, not a wordmark, so it sits beside
 * the words «UK Magazine» set in the site's own typeface rather than being
 * cropped or reconstructed into a horizontal lockup. The circle, the arc and
 * the curved `uk magazine` text are all part of the mark as the audience
 * already knows it.
 *
 * Served from `public/logo.png` — 160px square, 5.4 KB, derived from the
 * 2000×2000 master archived at `brand/ukmag-logo.png` (see the note there).
 * The master is 865 KB and is never served.
 */
export function Wordmark({
  className,
  inverted = false,
  asText = false,
  markOnly = false,
}: WordmarkProps) {
  const content = (
    // The lockup is laid out left-to-right even on this right-to-left page: it
    // is a Latin brand lockup and the mark belongs at its leading edge.
    // Without this the RTL flow puts the mark after the name.
    <span
      dir="ltr"
      className={cn('group/mark inline-flex items-center gap-2 xs:gap-2.5', className)}
    >
      <Image
        src="/logo.png"
        alt=""
        width={160}
        height={160}
        priority
        className={cn(
          'h-9 w-9 shrink-0 transition-transform duration-500 ease-editorial group-hover/mark:scale-105 sm:h-10 sm:w-10',
          /**
           * The purple mark rendered as pure white for dark or brand-coloured
           * surfaces. There is no separate white file and none is needed:
           * brightness(0) flattens every colour — including the gradient on the
           * "U" and any residual shadow — to black, and invert(1) then makes it
           * white.
           */
          inverted && '[filter:brightness(0)_invert(1)]',
        )}
      />

      {markOnly ? null : (
        <span
          className={cn(
            'whitespace-nowrap font-serif text-base leading-none tracking-[-0.02em] xs:text-[1.375rem] sm:text-2xl',
            inverted ? 'text-white' : 'text-ink',
          )}
        >
          <span className="font-semibold">{site.wordmark.lead}</span>
          <span
            className={cn('ml-[0.28em] font-normal', inverted ? 'text-white/70' : 'text-ink-soft')}
          >
            {site.wordmark.trail}
          </span>
        </span>
      )}
    </span>
  );

  if (asText) return content;

  return (
    <Link
      href="/"
      aria-label={`${site.name} — صفحهٔ اصلی`}
      className="inline-flex min-h-[44px] items-center"
    >
      {content}
    </Link>
  );
}
