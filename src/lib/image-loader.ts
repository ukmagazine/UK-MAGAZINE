'use client';

import type { ImageLoaderProps } from 'next/image';

/**
 * Custom image loader for the hotlinked image contract.
 *
 * Unsplash is already an image CDN, so width/quality/format parameters are sent
 * directly to `images.unsplash.com`. Local files are served untouched. Other
 * absolute URLs are also left untouched rather than guessing query parameters
 * that a third-party origin may not support.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith('/')) return src;

  try {
    const url = new URL(src);
    if (url.hostname !== 'images.unsplash.com') return src;

    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality ?? 75));
    url.searchParams.set('auto', 'format');
    if (!url.searchParams.has('fit')) url.searchParams.set('fit', 'crop');
    return url.toString();
  } catch {
    return src;
  }
}
