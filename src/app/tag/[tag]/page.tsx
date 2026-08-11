import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import { CategoryStream } from '@/components/category/CategoryStream';
import NotFound from '@/app/not-found';
import { getAllTags, getArticlesByTag } from '@/lib/articles';
import { formatCount } from '@/lib/format';
import { breadcrumbJsonLd, buildMetadata, jsonLdProps } from '@/lib/seo';

interface PageProps {
  params: Promise<{ tag: string }>;
}

/**
 * A tag the corpus cannot produce, used only to keep the route buildable.
 *
 * `output: 'export'` refuses a dynamic route whose `generateStaticParams()`
 * returns an empty list — it reports the function as missing and fails the
 * build. The corpus legitimately has no tags at the moment (the single
 * published post carries none), so without this the whole deploy breaks.
 *
 * The placeholder renders the 404 page, is `noindex`, is absent from the
 * sitemap and is linked from nowhere. It disappears on the first build after
 * any article publishes with a tag.
 */
const NO_TAGS_PLACEHOLDER = 'no-tags-yet';

/**
 * Tags are WordPress `post_tag` terms, read by the existing adapter. Nothing is
 * seeded: a tag page comes into existence when the first article carries it.
 *
 * Only tags that actually have articles are emitted, and `dynamicParams` is
 * off, so an unused tag is a 404 rather than an empty page. That matters —
 * the publisher works from a list of nineteen planned tags, and most of them
 * will have no articles for a while.
 */
export function generateStaticParams() {
  const tags = getAllTags();
  return tags.length > 0
    ? tags.map((tag) => ({ tag }))
    : [{ tag: NO_TAGS_PLACEHOLDER }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const label = decodeURIComponent(tag);
  const articles = getArticlesByTag(label);

  return buildMetadata({
    title: articles.length > 0 ? `برچسب: ${label}` : 'صفحه پیدا نشد',
    description:
      articles.length > 0
        ? `همهٔ گزارش‌های یو‌کی مگزین با برچسب «${label}».`
        : 'صفحه‌ای که دنبالش هستید در دسترس نیست.',
    path: `/tag/${encodeURIComponent(label)}/`,
    noIndex: articles.length === 0,
  });
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const label = decodeURIComponent(tag);
  const articles = getArticlesByTag(label);

  /**
   * Renders the 404 page rather than calling `notFound()`: under
   * `output: 'export'` that helper emits a blank shell for the route instead
   * of the not-found UI. This reaches a reader only via the placeholder above,
   * or by typing a tag that has no articles.
   */
  if (articles.length === 0) return <NotFound />;

  const trail = [
    { name: 'خانه', path: '/' },
    { name: label, path: `/tag/${encodeURIComponent(label)}/` },
  ];

  return (
    <>
      <script {...jsonLdProps(breadcrumbJsonLd(trail))} />

      <header className="relative overflow-hidden border-b border-line">
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-20 w-20 bg-brand-red sm:h-28 sm:w-28"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        <div className="frame relative py-8 sm:py-10">
          <nav aria-label="مسیر راهبری" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-soft">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-brand-red"
                >
                  خانه
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3 text-line-strong rtl:-scale-x-100" />
              </li>
              <li>
                <span className="font-medium text-ink">{label}</span>
              </li>
            </ol>
          </nav>

          <p className="label mb-2.5 flex items-center text-brand-red">
            <span aria-hidden="true" className="me-2 h-[3px] w-6 bg-brand-red" />
            برچسب
          </p>

          <h1 className="max-w-3xl font-serif text-display tracking-[-0.025em] text-ink">
            {label}
          </h1>

          <p className="tabular mt-5 text-xs uppercase tracking-[0.14em] text-ink-faint">
            {formatCount(articles.length)} گزارش
          </p>
        </div>
      </header>

      <div className="frame py-12 sm:py-16">
        {/* The cards inside the stream are h3. Without this the outline jumps
            straight from the tag name to h3, which is a skipped level. The
            category page has the equivalent heading over its own stream. */}
        <h2 className="sr-only">گزارش‌های این برچسب</h2>
        <CategoryStream articles={articles} />
      </div>
    </>
  );
}
