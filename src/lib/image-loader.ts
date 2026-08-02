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
/**
 * WordPress-hosted media.
 *
 * WordPress is not an image CDN — it ignores `?w=` entirely and would serve the
 * full-size original for every variant, which is exactly the 1.3 MB-per-thumbnail
 * problem the custom loader exists to avoid. What it *does* do is pre-generate
 * fixed sizes on upload, named `file-WIDTHxHEIGHT.ext`.
 *
 * The adapter records which of those exist in a `#wp=` fragment (a fragment
 * because it never reaches the server, so the URL still resolves if this is
 * ignored). Here we pick the smallest generated size that covers the request.
 */
function wordPressVariant(src: string, width: number): string | null {
  const hash = src.indexOf('#wp=');
  if (hash === -1) return null;

  const base = src.slice(0, hash);
  const sizes = src
    .slice(hash + 4)
    .split(',')
    .map((label) => ({ label, width: Number.parseInt(label, 10) }))
    .filter((size) => Number.isFinite(size.width))
    .sort((a, b) => a.width - b.width);

  const match = sizes.find((size) => size.width >= width);
  // Wider than anything WordPress generated → the original is the only option.
  if (!match) return base;

  return base.replace(/(\.[a-z0-9]+)(?=$|\?)/i, `-${match.label}$1`);
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith('/')) return src;

  const fromWordPress = wordPressVariant(src, width);
  if (fromWordPress) return fromWordPress;

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
