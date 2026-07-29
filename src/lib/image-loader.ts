'use client';

import type { ImageLoaderProps } from 'next/image';

/**
 * Custom image loader.
 *
 * Article art is hosted on Unsplash, which is already an image CDN: it resizes,
 * crops and negotiates AVIF/WebP from URL parameters. Routing widths straight
 * to it means the app never downloads a full 1.3 MB original just to produce a
 * thumbnail — which is what made Next's built-in optimiser time out and return
 * 500s for the hero under concurrent requests.
 *
 * Local files (anything starting with `/`) are passed through untouched, so
 * dropping images into `public/` still works.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith('/')) return src;

  try {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality ?? 75));
    url.searchParams.set('auto', 'format');
    if (!url.searchParams.has('fit')) url.searchParams.set('fit', 'crop');
    return url.toString();
  } catch {
    // Not an absolute URL we can rewrite — hand it back unchanged.
    return src;
  }
}
