import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ListChecks } from 'lucide-react';
import type { Metadata } from 'next';
import { ArticleBadge } from '@/components/article/ArticleBadge';
import { ArticleBody, extractHeadings } from '@/components/article/ArticleBody';
import { AuthorCard } from '@/components/article/AuthorCard';
import { BookmarkButton } from '@/components/article/BookmarkButton';
import { NextArticleNav } from '@/components/article/NextArticleNav';
import { ReadingProgress } from '@/components/article/ReadingProgress';
import { RelatedStories } from '@/components/article/RelatedStories';
import { ShareButtons } from '@/components/article/ShareButtons';
import { SmartBriefing } from '@/components/article/SmartBriefing';
import { TableOfContents } from '@/components/article/TableOfContents';
import { NewsletterCard } from '@/components/newsletter/NewsletterCard';
import { AuthorAvatar } from '@/components/ui/AuthorAvatar';
import { RelativeTime } from '@/components/ui/RelativeTime';
import { articles } from '@/data/articles';
import {
  getAdjacent,
  getArticleBySlug,
  getMostRead,
  getRelated,
} from '@/lib/articles';
import { formatLongDate, formatReadingTime } from '@/lib/format';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  jsonLdProps,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every article at build time. */
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return buildMetadata({
      title: 'Story not found',
      description: 'The story you are looking for is not available.',
      path: `/article/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.summary,
    path: `/article/${article.slug}`,
    image: article.image,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
    authors: [article.author.name],
    section: article.categoryRef.name,
    tags: article.tags,
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const headings = extractHeadings(article.body);
  const related = getRelated(article, 3);
  const { previous, next } = getAdjacent(article);
  // Right rail mirrors the reference: a ranked most-read list.
  const mostRead = getMostRead(5)
    .filter((item) => item.id !== article.id)
    .slice(0, 4);
  const path = `/article/${article.slug}`;

  const trail = [
    { name: 'Home', path: '/' },
    { name: article.categoryRef.name, path: `/category/${article.category}` },
    { name: article.title, path },
  ];

  /**
   * Key takeaways as a floating white editorial card. Rendered once and placed
   * in the left rail on xl, or near the top of the article flow below it.
   */
  const keyFactsPanel =
    article.keyFacts && article.keyFacts.length > 0 ? (
      <aside
        className="rounded-md border border-line bg-surface p-5 shadow-card"
        aria-labelledby="key-facts-heading"
      >
        <h2 id="key-facts-heading" className="label mb-4 flex items-center gap-2 text-brand-red">
          <ListChecks aria-hidden="true" className="h-3.5 w-3.5" />
          Key takeaways
        </h2>
        <ul className="space-y-3.5">
          {article.keyFacts.map((fact) => (
            <li key={fact} className="flex gap-2.5 text-sm leading-relaxed text-ink">
              <span
                aria-hidden="true"
                className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full border-[2px] border-brand-red"
              />
              {fact}
            </li>
          ))}
        </ul>
      </aside>
    ) : null;

  return (
    <>
      <script {...jsonLdProps(articleJsonLd(article))} />
      <script {...jsonLdProps(breadcrumbJsonLd(trail))} />

      <ReadingProgress />

      <article className="frame pb-4 pt-8 sm:pt-10">
        {/* Header ---------------------------------------------- */}
        <header className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-soft">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-brand-red"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3 text-line-strong rtl:-scale-x-100" />
              </li>
              <li>
                <Link
                  href={`/category/${article.category}`}
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-brand-red"
                >
                  {article.categoryRef.name}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3 text-line-strong rtl:-scale-x-100" />
              </li>
              <li className="min-w-0">
                <span className="clamp-1 block max-w-[16rem] truncate font-medium text-ink sm:max-w-sm">
                  {article.title}
                </span>
              </li>
            </ol>
          </nav>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Link
              href={`/category/${article.category}`}
              className="label inline-flex min-h-[44px] items-center gap-1.5 text-brand-red transition-colors hover:text-brand-deep"
            >
              <span aria-hidden="true" className="h-[3px] w-4 bg-brand-red" />
              {article.categoryRef.name}
            </Link>
            <ArticleBadge kind={article.kind} />
          </div>

          <h1 className="font-serif text-headline tracking-[-0.02em] text-ink">{article.title}</h1>

          <p className="mt-5 text-lg leading-relaxed text-ink-soft sm:text-xl">
            {article.subtitle}
          </p>

          {/* Byline ------------------------------------------- */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-y border-line py-4">
            <div className="flex items-center gap-3">
              <AuthorAvatar author={article.author} size="md" />
              <div className="text-sm">
                <p className="font-medium text-ink">{article.author.name}</p>
                <p className="text-xs text-ink-soft">{article.author.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-soft">
              <time dateTime={article.publishedAt}>{formatLongDate(article.publishedAt)}</time>
              {article.updatedAt ? (
                <>
                  <span aria-hidden="true" className="text-line-strong">
                    ·
                  </span>
                  <span>
                    Updated <RelativeTime iso={article.updatedAt} />
                  </span>
                </>
              ) : null}
              <span aria-hidden="true" className="text-line-strong">
                ·
              </span>
              <span>{formatReadingTime(article.readingTime)}</span>
            </div>
          </div>

          {/* Share + save ------------------------------------- */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <ShareButtons title={article.title} path={path} />
            <BookmarkButton articleId={article.id} title={article.title} variant="labelled" />
          </div>
        </header>

        {/* Hero image ---------------------------------------- */}
        <figure className="mx-auto mt-9 max-w-5xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-surface-soft">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute right-0 top-0 h-14 w-14 bg-brand-red"
              style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
            />
          </div>
          <figcaption className="mt-2.5 flex flex-wrap items-baseline gap-x-2 border-s-2 border-brand-red ps-3 text-sm text-ink-soft">
            <span>{article.imageAlt}</span>
            <span className="text-xs text-ink-faint">{article.imageCredit}</span>
          </figcaption>
        </figure>

        {/* Three-column editorial layout ---------------------- */}
        <div className="mt-12 grid grid-cols-1 gap-x-10 xl:grid-cols-[minmax(180px,230px)_minmax(0,720px)_minmax(200px,260px)] xl:justify-center lg:grid-cols-12">
          {/* Left rail — key takeaways (desktop only) --------- */}
          <aside
            className="hidden xl:block"
            aria-label="Key takeaways"
          >
            {keyFactsPanel ? (
              <div className="sticky top-28">{keyFactsPanel}</div>
            ) : null}
          </aside>

          <div className="lg:col-span-8 lg:col-start-1 xl:col-span-1 xl:col-start-auto">
            <div className="mx-auto max-w-read xl:max-w-none">
              {article.briefing ? (
                <SmartBriefing briefing={article.briefing} className="mb-10" />
              ) : null}

              {/* Key takeaways sit near the top of the flow below xl. */}
              {keyFactsPanel ? <div className="mb-10 xl:hidden">{keyFactsPanel}</div> : null}

              {/* Table of contents moves inline on mobile. */}
              {headings.length > 1 ? (
                <div className="mb-10 rounded-md border border-line bg-surface p-5 shadow-card lg:hidden">
                  <TableOfContents headings={headings} />
                </div>
              ) : null}

              <ArticleBody blocks={article.body} />

              {/* Tags ---------------------------------------- */}
              <div className="mt-10 border-t border-line pt-6">
                <h2 className="label mb-3 text-ink-soft">Filed under</h2>
                <ul className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        href={`/search?q=${encodeURIComponent(tag)}`}
                        className="inline-flex min-h-[44px] items-center rounded-sm border border-line px-3 text-sm text-ink-soft transition-colors hover:border-ink hover:text-brand-red"
                      >
                        {tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <ShareButtons title={article.title} path={path} />
                <BookmarkButton articleId={article.id} title={article.title} variant="labelled" />
              </div>

              <AuthorCard author={article.author} className="mt-10" />

              {/* Newsletter appears inline on mobile, in the rail on desktop. */}
              <NewsletterCard variant="rail" className="mt-10 lg:hidden" headingLevel="h2" />
            </div>
          </div>

          {/* Right rail ------------------------------------- */}
          <aside
            className="hidden lg:col-span-4 lg:block xl:col-span-1"
            aria-label="Article tools and further reading"
          >
            <div className="sticky top-28 space-y-8 border-s border-line ps-8 xl:ps-6">
              {headings.length > 1 ? <TableOfContents headings={headings} /> : null}

              <div>
                <h2 className="label mb-3 flex items-center text-ink">
                  <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-brand-red" />
                  Share
                </h2>
                <ShareButtons title={article.title} path={path} />
              </div>

              <div>
                <h2 className="label mb-4 flex items-center border-t border-line pt-5 text-ink">
                  <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-brand-red" />
                  Most read
                </h2>
                <ol className="space-y-4">
                  {mostRead.map((item, rank) => (
                    <li
                      key={item.id}
                      className="group relative flex gap-3 border-t border-line pt-4 first:border-t-0 first:pt-0"
                    >
                      <span
                        aria-hidden="true"
                        className="tabular shrink-0 text-sm font-semibold leading-5 text-brand-red"
                      >
                        {String(rank + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-serif text-[0.95rem] font-medium leading-snug text-ink">
                          <Link
                            href={`/article/${item.slug}`}
                            className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-brand-red"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        <p className="mt-1.5 text-xs text-ink-soft">
                          <RelativeTime iso={item.publishedAt} />
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <NewsletterCard variant="rail" headingLevel="h2" />
            </div>
          </aside>
        </div>
      </article>

      <div className="frame">
        <NextArticleNav previous={previous} next={next} className="mt-12" />
        <RelatedStories articles={related} className="mt-16" />
      </div>

      <div className="frame mt-16">
        <NewsletterCard />
      </div>
    </>
  );
}
