/**
 * Shared helpers for the article corpus.
 *
 * The corpus is split across desk files (`ai.ts`, `world.ts`, …) so no single
 * module becomes unmanageable. `src/data/articles.ts` re-exports the merged,
 * date-sorted list.
 */

/**
 * Build an article image URL. Every id used below is verified to resolve.
 *
 * No width is set here: `src/lib/image-loader.ts` appends the exact width and
 * quality for each responsive variant, so Unsplash's CDN does the resizing.
 */
export const img = (id: string): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop`;

/**
 * The demo timeline is anchored here so timestamps stay internally consistent.
 * Move this forward (and the offsets stay relative) to refresh the front page.
 */
export const EPOCH = '2026-07-27T12:00:00.000Z';

/** Minutes before EPOCH → ISO timestamp. Keeps the data readable. */
export function ago(minutes: number): string {
  return new Date(Date.parse(EPOCH) - minutes * 60_000).toISOString();
}

export const MIN = 1;
export const HOUR = 60;
export const DAY = 60 * 24;
