'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleBadge } from '@/components/article/ArticleBadge';
import { ArticleCard } from '@/components/article/ArticleCard';
import { BookmarkButton } from '@/components/article/BookmarkButton';
import { formatLongDate, formatReadingTime } from '@/lib/format';
import { useLocale } from '@/components/providers/LocaleProvider';
import { categoryShortName } from '@/i18n/category';
import type { ResolvedArticle } from '@/lib/types';

interface HeroStoryProps {
  lead: ResolvedArticle;
  support: ResolvedArticle[];
}

/**
 * The homepage lead, composed like the reference spread: one wide architectural
 * image with the headline block set over its left third, and a compact
 * top-stories rail alongside.
 *
 * A white gradient scrim guarantees text contrast whatever the photograph, and
 * below `lg` the composition unstacks into image-then-text so nothing is ever
 * laid over a busy crop on a small screen.
 */
export function HeroStory({ lead, support }: HeroStoryProps) {
  const { t, locale, isRtl } = useLocale();
  const href = `/article/${lead.slug}`;

  return (
    <section aria-labelledby="lead-story-heading" className="pt-6 sm:pt-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
        {/* Lead ------------------------------------------------------ */}
        <article className="group relative overflow-hidden rounded-md border border-line bg-surface shadow-card lg:col-span-9">
          {/*
            Two clean columns rather than text laid over the photograph. An
            overlay only works when the image has a genuinely empty area to sit
            in; over ordinary editorial photography any scrim heavy enough to
            keep the headline legible also veils the subject. Splitting them
            leaves the image completely unobstructed and the text fully sharp.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            {/* Image — second on desktop, first in the stack on mobile. */}
            <div className="relative order-first aspect-[16/10] w-full sm:aspect-[2/1] lg:order-last lg:aspect-auto lg:min-h-[460px]">
              <Image
                src={lead.image}
                alt={lead.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="absolute end-0 top-0 h-14 w-14 bg-brand-red sm:h-16 sm:w-16"
                style={{
                  clipPath: isRtl
                    ? 'polygon(0 0, 100% 0, 0 100%)'
                    : 'polygon(100% 0, 0 0, 100% 100%)',
                }}
              />
            </div>

            {/* Copy */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="relative z-10 flex items-center gap-3">
                {/* `py-2 -my-2` grows the tap target without shifting the row. */}
                <Link
                  href={`/category/${lead.category}`}
                  className="label -my-2 py-2 text-brand-red transition-colors hover:text-brand-deep"
                >
                  {categoryShortName(lead.categoryRef, locale)}
                </Link>
                <span aria-hidden="true" className="h-[2px] w-8 bg-brand-red" />
                <ArticleBadge kind={lead.kind} />
              </div>

              <h1
                id="lead-story-heading"
                className="mt-5 font-serif text-hero text-ink"
              >
                <Link
                  href={href}
                  className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] hover:text-brand-red focus-visible:text-brand-red"
                >
                  {lead.title}
                </Link>
              </h1>

              <p className="mt-4 text-base leading-relaxed text-ink-strong">
                {lead.summary}
              </p>

              {/* Primary CTA — mirrors the stretched headline link, so it is
                  kept out of the tab order and the accessibility tree. */}
              <div className="relative z-10 mt-7">
                <Link
                  href={href}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="group/cta inline-flex min-h-[48px] items-center gap-2.5 rounded-sm bg-ink px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-red"
                >
                  {t.home.readFullStory}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover/cta:translate-x-1 rtl:-scale-x-100"
                  />
                </Link>
              </div>

              <div className="mt-7 flex items-center justify-between gap-4">
                <p className="text-xs text-ink-soft">
                  {t.home.by} <span className="font-medium text-ink">{lead.author.name}</span>
                  <span aria-hidden="true" className="mx-1.5 text-line-strong">
                    ·
                  </span>
                  <time dateTime={lead.publishedAt}>{formatLongDate(lead.publishedAt)}</time>
                  <span aria-hidden="true" className="mx-1.5 text-line-strong">
                    ·
                  </span>
                  {formatReadingTime(lead.readingTime)}
                </p>
                <BookmarkButton articleId={lead.id} title={lead.title} className="relative z-10" />
              </div>
            </div>
          </div>
        </article>

        {/* Top stories rail ----------------------------------------- */}
        <aside className="lg:col-span-3" aria-labelledby="top-stories-heading">
          <div className="border-t border-line pt-5 lg:border-t-0 lg:pt-0">
            <h2 id="top-stories-heading" className="label mb-5 text-ink">
              {t.home.topStories}
            </h2>

            <div className="space-y-5">
              {support.map((article, index) => (
                <div
                  key={article.id}
                  className={index > 0 ? 'border-t border-line pt-5' : undefined}
                >
                  <ArticleCard
                    article={article}
                    variant="rail"
                    showSummary={false}
                    showBookmark={false}
                    headingLevel="h3"
                  />
                </div>
              ))}
            </div>

            <Link
              href="/category/world"
              className="group mt-6 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-brand-red"
            >
              <span className="link-underline">{t.home.moreTopStories}</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1 rtl:-scale-x-100"
              />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
