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
   * Renders the red slash alone, without the wordmark text. Used in the sticky
   * header, where the publication name would crowd the navigation. The link
   * still carries an accessible name via its aria-label.
   */
  markOnly?: boolean;
}

/**
 * The UK MAGAZINE wordmark: a sharp red angular slash followed by the name, set
 * in the display serif with the second half in a lighter weight.
 */
export function Wordmark({
  className,
  inverted = false,
  asText = false,
  markOnly = false,
}: WordmarkProps) {
  const content = (
    // The mark is laid out left-to-right even on this right-to-left page: it is
    // a Latin brand lockup, and the red slash belongs at its leading edge.
    // Without this the RTL flow puts the slash after the name.
    <span
      dir="ltr"
      className={cn('group/mark inline-flex items-baseline gap-2 xs:gap-3', className)}
    >
      {/*
        Angular red slash — the brand's geometric signature.
        A gradient gives it depth and a specular highlight sweeps across on a
        slow loop. The global reduced-motion rule stops the sweep for readers
        who ask for it, leaving the static gloss.
      */}
      <span
        aria-hidden="true"
        className="relative isolate h-[1.72em] w-[0.92em] shrink-0 translate-y-[0.22em] overflow-hidden bg-gradient-to-br from-[#ff3b2f] via-brand-red to-brand-deep drop-shadow-[0_3px_10px_rgba(225,6,0,0.45)] transition-transform duration-500 ease-editorial group-hover/mark:scale-110"
        // A bold forward slash: vertical left/right edges, sheared to the right.
        style={{ clipPath: 'polygon(46% 0, 100% 0, 54% 100%, 0 100%)' }}
      >
        {/* Sweeping specular highlight. */}
        <span className="absolute inset-y-0 -left-1/2 w-1/2 animate-sheen bg-gradient-to-r from-transparent via-white/75 to-transparent" />
        {/* Static top-edge gloss, so the mark still reads as polished at rest. */}
        <span className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent" />
      </span>
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
      aria-label={`${site.name} — home`}
      className="inline-flex min-h-[44px] items-center"
    >
      {content}
    </Link>
  );
}
