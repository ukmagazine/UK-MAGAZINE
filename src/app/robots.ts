import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Search results and a reader's private saved list add no index value.
        disallow: ['/search', '/bookmarks'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  };
}
