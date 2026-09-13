/**
 * Editor-set pins: which articles are held at the top of the homepage and of a
 * desk page.
 *
 * Shared by the WordPress adapter (which validates what an editor typed) and
 * the corpus loader (which decides, per build, whether a pin is still live).
 * Kept free of imports so both can use it without pulling in the corpus.
 *
 * 🔴 Pins are ordering only. They never change a URL, never re-sort the corpus
 * as a whole, and are read only by the homepage and desk-page queries in
 * `lib/articles.ts` — so the breaking bar, related stories, previous/next and
 * the sitemap keep exactly their chronological behaviour.
 *
 * Pins are evaluated when the site is built, not when it is read. A pin set in
 * wp-admin appears at the next build (hourly), and an expired one disappears
 * at the next build after its date — not at midnight. Both are accepted.
 */

export const PIN_TARGETS = ['category', 'home', 'both'] as const;
export type PinTarget = (typeof PIN_TARGETS)[number];

export const PIN_RANKS = [1, 2, 3] as const;
export type PinRank = (typeof PIN_RANKS)[number];

/**
 * The most pinned articles one surface will hold. Anything past this is shown
 * in its normal chronological place and named in a build-log warning — never
 * dropped, and never a build failure.
 */
export const PIN_CAP = 2;

/** Expiry dates are the editor's dates, and the editor is in London. */
export const PIN_TIME_ZONE = 'Europe/London';

export function isPinTarget(value: string): value is PinTarget {
  return (PIN_TARGETS as readonly string[]).includes(value);
}

export function parsePinRank(value: string): PinRank | undefined {
  return value === '1' || value === '2' || value === '3' ? (Number(value) as PinRank) : undefined;
}

/**
 * `YYYY-MM-DD` that names a real day. `2026-02-30` matches the pattern and is
 * not a date, and it must not be read as "no expiry".
 */
export function isCalendarDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/**
 * Today's date in London as `YYYY-MM-DD`.
 *
 * The builder runs in UTC. From late March to late October London is an hour
 * ahead, so between 23:00 and 00:00 UTC the two disagree about the date — and
 * the date the editor meant is London's.
 */
export function londonToday(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: PIN_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);

  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((entry) => entry.type === type)?.value ?? '';

  return `${part('year')}-${part('month')}-${part('day')}`;
}

/**
 * A pin is live through the whole of its `pinUntil` day, London time, and
 * lapses at the first build after it. ISO dates compare correctly as strings.
 */
export function isPinLive(pinUntil: string | undefined, today: string): boolean {
  return !pinUntil || pinUntil >= today;
}
