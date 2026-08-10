import type { MetadataRoute } from 'next';
import { footerCategories } from '@/data/categories';
import { getAllArticles, getAllTags } from '@/lib/articles';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

/**
 * Generated from the same data the routes are, so it can never drift.
 *
 * Only pages a reader is meant to find: `footerCategories` is the eleven
 * visible desks, `getAllArticles` and `getAllTags` exclude hidden desks, and
 * /search/, /bookmarks/ and /newsletter/ are left out — the first two are
 * disallowed in robots.txt and the third has no working form at the moment.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'hourly', priority: 1 },
    { url: absoluteUrl('/about/'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/contact/'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/services/'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/terms/'), changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/privacy/'), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = footerCategories.map((category) => ({
    url: absoluteUrl(`/category/${category.slug}/`),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: absoluteUrl(`/tag/${encodeURIComponent(tag)}/`),
    changeFrequency: 'weekly',
    priority: 0.4,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: absoluteUrl(`/article/${article.slug}/`),
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: 'weekly',
    priority: article.featured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...tagRoutes, ...articleRoutes];
}
