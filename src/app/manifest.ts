import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

/**
 * Web App Manifest, emitted by Next as a static `/manifest.webmanifest`.
 *
 * Every path here is root-relative because production is served from the
 * custom-domain root — `public/CNAME` is `theukmag.com` and `basePath` is ''
 * in next.config.ts. If the site were ever moved to a
 * `github.io/<repo>/` sub-path these would all have to gain that prefix, and
 * so would the service-worker registration scope.
 */
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    // A stable identity, so a later change to start_url cannot be treated by
    // the browser as a different application.
    id: '/',
    name: site.name,
    short_name: site.name,
    description: site.shortDescription,
    lang: 'fa',
    dir: 'rtl',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    theme_color: '#8E1B9C',
    // Matches the icon tile and the site canvas, so the launch screen does not
    // flash a different colour before the first paint.
    background_color: '#FFFFFF',
    categories: ['news', 'magazines'],
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      /**
       * Separate files rather than `purpose: 'any maskable'` on one icon.
       * A shared icon has to satisfy both, which in practice means the
       * conservative maskable framing gets used everywhere and the mark looks
       * small in contexts that would not have cropped it at all.
       */
      {
        src: '/icons/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    /**
     * Real routes only. `/bookmarks/` is behind `site.features.bookmarks` and
     * is not linked anywhere in the UI while that flag is off, so it is only
     * offered here when the feature is actually on.
     */
    shortcuts: [
      {
        name: 'جستجو در UK Magazine',
        short_name: 'جستجو',
        url: '/search/',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
      },
      ...(site.features.bookmarks
        ? [
            {
              name: 'گزارش‌های ذخیره‌شده',
              short_name: 'ذخیره‌ها',
              url: '/bookmarks/',
              icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
            },
          ]
        : []),
    ],
  };
}
