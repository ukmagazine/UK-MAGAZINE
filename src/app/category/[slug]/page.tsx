import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArticleCard } from '@/components/article/ArticleCard';
import { TrendingList } from '@/components/article/TrendingList';
import { CategoryStream } from '@/components/category/CategoryStream';
import { NewsletterCard } from '@/components/newsletter/NewsletterCard';
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

/** One static page per desk. */
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return buildMetadata({
      title: 'Section not found',
      description: 'The section you are looking for is not available.',
      path: `/category/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/category/${category.slug}`,
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
    { name: 'Home', path: '/' },
    { name: category.name, path: `/category/${category.slug}` },
  ];

  return (
    <>
      <script {...jsonLdProps(collectionJsonLd(category, all))} />
      <script {...jsonLdProps(breadcrumbJsonLd(trail))} />

      <CategoryHeader category={category} articleCount={all.length} />

      <div className="frame py-12 sm:py-16">
        {featured ? (
          <section aria-labelledby="featured-heading" className="mb-16 sm:mb-20">
            <h2 id="featured-heading" className="sr-only">
              Featured story
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

              <aside className="lg:col-span-4" aria-label={`Most read in ${category.name}`}>
                <TrendingList
                  articles={mostRead}
                  title={`Most read in ${category.shortName}`}
                  headingLevel="h2"
                />
              </aside>
            </div>
          </section>
        ) : (
          <p className="border border-line bg-surface-soft px-6 py-14 text-center font-serif text-2xl text-ink">
            No stories have been filed to this desk yet.
          </p>
        )}

        {rest.length > 0 ? (
          <CategoryStream articles={rest} topics={category.topics} />
        ) : null}

        <div className="mt-16 sm:mt-20">
          <NewsletterCard
            variant="band"
            title={`Follow ${category.name} with the Daily Brief`}
            description="Ten stories that moved overnight, each in under sixty words, with a line on why they matter."
          />
        </div>
      </div>
    </>
  );
}
