import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArticleCard } from '@/components/article/ArticleCard';
import { TrendingList } from '@/components/article/TrendingList';
import { CategoryStream } from '@/components/category/CategoryStream';
import { CategoryHeader } from '@/components/ui/CategoryHeader';
import { Reveal } from '@/components/ui/Reveal';
import { categories, getCategory } from '@/data/categories';
import { getArticlesByCategory, getMostRead } from '@/lib/articles';
import type { CategorySlug } from '@/lib/types';
import {
  breadcrumbJsonLd,
  buildMetadata,
  collectionJsonLd,
  jsonLdProps,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** One static page per desk — hidden desks included, so their routes resolve. */
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return buildMetadata({
      title: 'سرویس پیدا نشد',
      description: 'The section you are looking for is not available.',
      path: `/category/${slug}`,
      noIndex: true,
    });
  }

  /**
   * Two independent reasons to stay out of the index:
   *
   * 1. the desk is hidden — regardless of how many articles it holds;
   * 2. the desk has no articles yet — an empty listing is a thin page.
   *
   * The second clears itself: the count is read at build time, so the first
   * build after the desk's first article publishes drops the `noindex` with no
   * human action.
   */
  const isEmpty = getArticlesByCategory(category.slug).length === 0;

  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/category/${category.slug}`,
    noIndex: Boolean(category.hidden) || isEmpty,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const all = getArticlesByCategory(category.slug as CategorySlug);
  const [featured, ...rest] = all;
  const mostRead = getMostRead(5, category.slug as CategorySlug);

  const trail = [
    { name: 'خانه', path: '/' },
    { name: category.name, path: `/category/${category.slug}` },
  ];

  return (
    <>
      <script {...jsonLdProps(collectionJsonLd(category, all))} />
      <script {...jsonLdProps(breadcrumbJsonLd(trail))} />

      <CategoryHeader category={category} articleCount={all.length} />

      <div className="frame py-12 sm:py-16">
        {/*
          Standing note on the spotlight desk. Permanent, above the list, and
          not conditional on whether the desk has articles — the point is that
          a reader arriving at the desk knows the selection cannot be bought
          before they read anything on it. The per-article «معرفی» band says
          the same thing at the piece level.
        */}
        {category.slug === 'spotlight' ? (
          <p
            role="note"
            className="mb-10 rounded-sm border-s-4 border-ink-soft bg-surface-soft px-4 py-3 text-sm leading-relaxed text-ink-strong sm:mb-12"
          >
            معرفی‌های این بخش رایگان‌اند و خریدنی نیستند. انتخاب با تحریریه است.
          </p>
        ) : null}

        {featured ? (
          <section aria-labelledby="featured-heading" className="mb-16 sm:mb-20">
            <h2 id="featured-heading" className="sr-only">
              گزارش برگزیده
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-8">
                <ArticleCard
                  article={featured}
                  variant="featured"
                  headingLevel="h3"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </Reveal>

              {/* The rail renders nothing at all when the desk is too small to
                  rank, rather than a heading over an empty list. */}
              {mostRead.length > 1 ? (
                <aside className="lg:col-span-4" aria-label={`پربازدیدترین‌های ${category.name}`}>
                  <TrendingList
                    articles={mostRead}
                    title={`پربازدیدترین‌های ${category.shortName}`}
                    headingLevel="h2"
                  />
                </aside>
              ) : null}
            </div>
          </section>
        ) : (
          <p className="border border-line bg-surface-soft px-6 py-14 text-center font-serif text-2xl text-ink">
            هنوز گزارشی در این سرویس منتشر نشده است.
          </p>
        )}

        {rest.length > 0 ? (
          <CategoryStream articles={rest} />
        ) : null}
      </div>
    </>
  );
}
