import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { ArticleBadge } from '@/components/article/ArticleBadge';
import { SponsorPill } from '@/components/article/SponsorDisclosure';
import { ArticleMeta } from '@/components/article/ArticleMeta';
import { BookmarkButton } from '@/components/article/BookmarkButton';
import { CategoryLabel } from '@/components/ui/CategoryLabel';
import { formatRank } from '@/lib/format';
import { RelativeTime } from '@/components/ui/RelativeTime';
import { formatReadingTime } from '@/lib/format';
import type { CardArticle } from '@/lib/types';
import { cn } from '@/lib/utils';

export type ArticleCardVariant =
  | 'featured' // large lead card with imagery
  | 'standard' // image above, text below — the default grid card
  | 'horizontal' // thumbnail beside text
  | 'compact' // text only, for dense lists
  | 'image' // image-dominant, text overlaid
  | 'numbered' // ranked list entry
  | 'breaking' // urgent treatment
  | 'opinion' // columnist treatment
  | 'video' // video story with play affordance
  | 'pick' // elevated editorial card (Editor's Picks row)
  | 'rail'; // compact thumbnail row for narrow sidebars

interface ArticleCardProps {
  article: CardArticle;
  variant?: ArticleCardVariant;
  /** Zero-based position, required by the `numbered` variant. */
  index?: number;
  /** Hides the summary where vertical space is tight. */
  showSummary?: boolean;
  showBookmark?: boolean;
  /** Set on the first card above the fold so Next preloads the image. */
  priority?: boolean;
  className?: string;
  /** Heading level, so each page keeps a valid outline. */
  headingLevel?: 'h2' | 'h3' | 'h4';
  sizes?: string;
  /** Overrides the image aspect ratio, for magazine-style layouts. */
  imageAspect?: string;
}

const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

/**
 * One card component, nine editorial treatments.
 *
 * Every variant uses the same "stretched link" pattern: the headline anchor
 * covers the card via a pseudo-element, so the whole card is clickable while
 * assistive technology sees exactly one link, and the bookmark button stays
 * independently focusable above it.
 */
export function ArticleCard({
  article,
  variant = 'standard',
  index = 0,
  showSummary = true,
  showBookmark = true,
  priority = false,
  className,
  headingLevel: Heading = 'h3',
  sizes = DEFAULT_SIZES,
  imageAspect,
}: ArticleCardProps) {
  const href = `/article/${article.slug}/`;

  const headline = (
    <Heading className={headlineClass(variant)}>
      <Link
        href={href}
        className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] hover:text-brand-red focus-visible:text-brand-red"
      >
        {article.title}
      </Link>
    </Heading>
  );

  const bookmark = showBookmark ? (
    <BookmarkButton
      articleId={article.id}
      title={article.title}
      inverted={variant === 'image' || variant === 'featured'}
      className="relative z-10"
    />
  ) : null;

  // ---------------------------------------------------------------- //
  // Compact — text only, for sidebars and dense feeds
  // ---------------------------------------------------------------- //
  if (variant === 'compact') {
    return (
      <article className={cn('group relative flex items-start justify-between gap-3', className)}>
        <div className="min-w-0 flex-1">
          <div className="relative z-10 mb-1.5 flex flex-wrap items-center gap-2">
            <CategoryLabel category={article.categoryRef} />
            <SponsorPill sponsored={article.sponsored} />
          </div>
          {headline}
          <ArticleMeta article={article} className="mt-2" />
        </div>
        {bookmark}
      </article>
    );
  }

  // ---------------------------------------------------------------- //
  // Numbered — ranked "Most read" entries with an oversized figure
  // ---------------------------------------------------------------- //
  if (variant === 'numbered') {
    return (
      /* Deliberately spare — a red rank and the headline, as in a printed
         "most read" column. Category and byline live on the story itself. */
      <article
        className={cn(
          'group relative flex items-start gap-3 border-t border-line py-3.5 first:border-t-0 first:pt-0',
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="tabular w-6 shrink-0 pt-[2px] text-sm font-semibold leading-snug text-brand-red"
        >
          {formatRank(index)}
        </span>

        <div className="min-w-0 flex-1">
          {headline}
          <ArticleMeta article={article} className="mt-1.5" />
        </div>
      </article>
    );
  }

  // ---------------------------------------------------------------- //
  // Rail — compact thumbnail row for the narrow top-stories sidebar
  // ---------------------------------------------------------------- //
  if (variant === 'rail') {
    return (
      <article className={cn('group relative flex items-start gap-3', className)}>
        <Link href={href} tabIndex={-1} aria-hidden="true" className="shrink-0">
          <span className="relative block h-[68px] w-[68px] overflow-hidden rounded-sm bg-surface-soft">
            <Image
              src={article.image}
              alt=""
              fill
              sizes="68px"
              className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.06]"
            />
          </span>
        </Link>

        <div className="min-w-0 flex-1">
          <CategoryLabel category={article.categoryRef} className="relative z-10 mb-1" />
          {headline}
          <ArticleMeta article={article} className="mt-1.5" />
        </div>

        <ArrowRight
          aria-hidden="true"
          className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-faint transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:text-brand-red rtl:-scale-x-100"
        />
      </article>
    );
  }

  // ---------------------------------------------------------------- //
  // Horizontal — thumbnail beside text
  // ---------------------------------------------------------------- //
  if (variant === 'horizontal') {
    return (
      <article className={cn('group relative flex items-start gap-4 sm:gap-5', className)}>
        <Link href={href} tabIndex={-1} aria-hidden="true" className="shrink-0">
          <span className="relative block h-[76px] w-[104px] overflow-hidden rounded-sm bg-surface-soft sm:h-[92px] sm:w-[132px]">
            <Image
              src={article.image}
              alt=""
              fill
              sizes="132px"
              className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.06]"
            />
          </span>
        </Link>

        <div className="min-w-0 flex-1">
          <div className="relative z-10 mb-1.5 flex flex-wrap items-center gap-2">
            <CategoryLabel category={article.categoryRef} />
            <ArticleBadge kind={article.kind} />
            <SponsorPill sponsored={article.sponsored} />
          </div>
          {headline}
          {showSummary ? (
            <p className="clamp-2 mt-2 text-sm leading-relaxed text-ink-soft">{article.summary}</p>
          ) : null}
          <ArticleMeta article={article} className="mt-2.5" />
        </div>

        {bookmark}
      </article>
    );
  }

  // ---------------------------------------------------------------- //
  // Image — full-bleed photograph with text overlaid
  // ---------------------------------------------------------------- //
  if (variant === 'image') {
    return (
      <article
        className={cn('group relative isolate overflow-hidden rounded-md bg-ink', className)}
      >
        {/* Landscape on phones — a 4:5 portrait crop runs ~430px tall in a
            single column and pushes the next story far down. */}
        <div
          className={cn('relative w-full', imageAspect ?? 'aspect-[16/10] sm:aspect-[3/4]')}
        >
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.05]"
          />
          {/* Gradient scrim keeps overlaid text above 4.5:1 contrast. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="relative z-10 mb-2.5 flex flex-wrap items-center gap-2">
            <CategoryLabel category={article.categoryRef} inverted />
            <ArticleBadge kind={article.kind} inverted />
            <SponsorPill sponsored={article.sponsored} />
          </div>
          {headline}
          <ArticleMeta article={article} inverted className="mt-3" />
        </div>

        {showBookmark ? <div className="absolute right-4 top-4 z-10">{bookmark}</div> : null}
      </article>
    );
  }

  // ---------------------------------------------------------------- //
  // Featured — the large lead card
  // ---------------------------------------------------------------- //
  if (variant === 'featured') {
    return (
      <article
        className={cn('group relative isolate overflow-hidden rounded-md bg-ink', className)}
      >
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-[21/10]">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/45 to-black/10"
          />
          {/* Angular red corner — the recurring geometric motif. */}
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 h-14 w-14 bg-brand-red"
            style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
          <div className="relative z-10 mb-3 flex flex-wrap items-center gap-2">
            <CategoryLabel category={article.categoryRef} inverted />
            <ArticleBadge kind={article.kind} inverted />
            <SponsorPill sponsored={article.sponsored} />
          </div>
          {headline}
          {showSummary ? (
            <p className="clamp-2 mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              {article.summary}
            </p>
          ) : null}
          <ArticleMeta article={article} inverted className="mt-4" />
        </div>

        {showBookmark ? <div className="absolute right-4 top-4 z-10">{bookmark}</div> : null}
      </article>
    );
  }

  // ---------------------------------------------------------------- //
  // Opinion — no photograph, columnist forward
  // ---------------------------------------------------------------- //
  if (variant === 'opinion') {
    return (
      <article
        className={cn(
          'group relative flex h-full flex-col border-s-2 border-brand-red bg-surface-soft p-5 sm:p-6',
          className,
        )}
      >
        <div className="relative z-10 mb-3 flex flex-wrap items-center gap-2">
          <ArticleBadge kind="opinion" />
          <SponsorPill sponsored={article.sponsored} />
          <CategoryLabel category={article.categoryRef} />
        </div>

        {headline}

        {showSummary ? (
          <p className="clamp-3 mt-3 text-sm leading-relaxed text-ink-soft">{article.summary}</p>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="font-serif text-base text-ink">
              <RelativeTime iso={article.publishedAt} />
            </p>
            <p className="mt-0.5 text-xs text-ink-soft">
              {formatReadingTime(article.readingTime)}
            </p>
          </div>
          {bookmark}
        </div>
      </article>
    );
  }

  // ---------------------------------------------------------------- //
  // Breaking — urgent treatment, no imagery
  // ---------------------------------------------------------------- //
  if (variant === 'breaking') {
    return (
      <article
        className={cn('group relative border border-brand-red/30 bg-brand-wash p-5', className)}
      >
        <div className="relative z-10 mb-3 flex flex-wrap items-center gap-2">
          <ArticleBadge kind="breaking" />
          <SponsorPill sponsored={article.sponsored} />
          <CategoryLabel category={article.categoryRef} />
        </div>

        {headline}

        {showSummary ? (
          <p className="clamp-2 mt-2.5 text-sm leading-relaxed text-ink-soft">{article.summary}</p>
        ) : null}

        <div className="mt-4 flex items-center justify-between gap-3">
          <ArticleMeta article={article} />
          {bookmark}
        </div>
      </article>
    );
  }

  // ---------------------------------------------------------------- //
  // Pick — elevated editorial card for the Editor's Picks row
  // ---------------------------------------------------------------- //
  if (variant === 'pick') {
    return (
      <article
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-editorial hover:-translate-y-0.5 hover:shadow-lift',
          className,
        )}
      >
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
          <span className="relative block aspect-[16/10] w-full overflow-hidden bg-surface-soft">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority={priority}
              sizes={sizes}
              className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.05]"
            />
          </span>
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <div className="relative z-10 mb-2 flex flex-wrap items-center gap-2">
            <CategoryLabel category={article.categoryRef} />
            <ArticleBadge kind={article.kind} />
            <SponsorPill sponsored={article.sponsored} />
          </div>

          {headline}

          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <ArticleMeta article={article} />
            {bookmark}
          </div>
        </div>
      </article>
    );
  }

  // ---------------------------------------------------------------- //
  // Standard and video — image above, text below
  // ---------------------------------------------------------------- //
  return (
    <article className={cn('group relative flex h-full flex-col', className)}>
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
        <span
          className={cn(
            'relative block w-full overflow-hidden rounded-md bg-surface-soft',
            imageAspect ?? 'aspect-[16/10]',
          )}
        >
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.05]"
          />
          {variant === 'video' ? (
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-black/15"
            >
              <span className="flex h-12 w-12 items-center justify-center bg-brand-red text-white transition-transform duration-300 ease-editorial group-hover:scale-110">
                <Play className="ms-0.5 h-5 w-5 fill-current" />
              </span>
            </span>
          ) : null}
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <div className="relative z-10 mb-2 flex flex-wrap items-center gap-2">
          <CategoryLabel category={article.categoryRef} />
          <ArticleBadge kind={article.kind} />
            <SponsorPill sponsored={article.sponsored} />
        </div>

        {headline}

        {showSummary ? (
          <p className="clamp-3 mt-2.5 text-sm leading-relaxed text-ink-soft">{article.summary}</p>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <ArticleMeta article={article} />
          {bookmark}
        </div>
      </div>
    </article>
  );
}

function headlineClass(variant: ArticleCardVariant): string {
  const base = 'font-serif tracking-[-0.015em]';

  switch (variant) {
    case 'featured':
      return cn(base, 'text-hero text-white');
    case 'image':
      return cn(base, 'text-xl leading-snug text-white sm:text-2xl');
    case 'compact':
      return cn(base, 'text-[0.95rem] font-medium leading-snug text-ink sm:text-base');
    case 'rail':
      return cn(base, 'clamp-3 text-[0.9rem] font-medium leading-snug text-ink');
    case 'numbered':
      // Clamped so a narrow ranking column can never wrap into a tall tower.
      return cn(base, 'clamp-2 text-[0.9rem] font-medium leading-snug text-ink');
    case 'horizontal':
      return cn(base, 'text-base leading-snug text-ink sm:text-lg');
    case 'opinion':
      return cn(base, 'text-lg leading-snug text-ink sm:text-xl');
    case 'breaking':
      return cn(base, 'text-lg leading-snug text-ink sm:text-xl');
    case 'pick':
      return cn(base, 'text-lg leading-snug text-ink sm:text-xl');
    default:
      return cn(base, 'text-lg leading-snug text-ink sm:text-xl');
  }
}
