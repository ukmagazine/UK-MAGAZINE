import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import { CategoryStream } from '@/components/category/CategoryStream';
import { getAllTags, getArticlesByTag } from '@/lib/articles';
import { formatCount } from '@/lib/format';
import { breadcrumbJsonLd, buildMetadata, jsonLdProps } from '@/lib/seo';

interface PageProps {
  params: Promise<{ tag: string }>;
}

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
  return getAllTags().map((tag) => ({ tag }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const label = decodeURIComponent(tag);
  const articles = getArticlesByTag(label);

  return buildMetadata({
    title: `برچسب: ${label}`,
    description: `همهٔ گزارش‌های یو‌کی مگزین با برچسب «${label}».`,
    path: `/tag/${encodeURIComponent(label)}/`,
    noIndex: articles.length === 0,
  });
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const label = decodeURIComponent(tag);
  const articles = getArticlesByTag(label);

  if (articles.length === 0) notFound();

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
