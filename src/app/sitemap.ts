import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { categories } from '@/data/categories';
import { absoluteUrl } from '@/lib/seo';
export const dynamic = 'force-static';
/** Generated from the same data the routes are, so it can never drift. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'hourly', priority: 1 },
    { url: absoluteUrl('/about'), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/newsletter'), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/category/${category.slug}`),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/article/${article.slug}`),
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: 'weekly',
    priority: article.featured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
