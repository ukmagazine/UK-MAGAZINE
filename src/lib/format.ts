/**
 * Date and number formatting.
 *
 * Every formatter here is deterministic — fixed locale, fixed time zone — so
 * the server and the client always produce identical strings and React never
 * reports a hydration mismatch. Relative labels ("3h ago") are produced only
 * inside `RelativeTime`, which upgrades after mount.
 */

const LOCALE = 'en-GB';
const TIME_ZONE = 'UTC';

const shortDate = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'short',
  timeZone: TIME_ZONE,
});

const longDate = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: TIME_ZONE,
});

const timeOnly = new Intl.DateTimeFormat(LOCALE, {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: TIME_ZONE,
});

/** "27 Jul" — compact stamp for cards and list rows. */
export function formatShortDate(iso: string): string {
  return shortDate.format(new Date(iso));
}

/** "27 July 2026" — bylines and article headers. */
export function formatLongDate(iso: string): string {
  return longDate.format(new Date(iso));
}

/** "27 Jul · 09:14" — the breaking strip and the latest feed. */
export function formatStamp(iso: string): string {
  const date = new Date(iso);
  return `${shortDate.format(date)} · ${timeOnly.format(date)}`;
}

/** "14:20" */
export function formatTime(iso: string): string {
  return timeOnly.format(new Date(iso));
}

/**
 * "3h ago" / "2d ago". Only ever called from a client component after mount,
 * because its output depends on the current time.
 */
export function formatRelative(iso: string, now: number = Date.now()): string {
  const diff = now - Date.parse(iso);
  const minutes = Math.round(diff / 60_000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks}w ago`;

  return formatShortDate(iso);
}

/** "12,400" — reader counts and subscriber totals. */
export function formatCount(value: number): string {
  return new Intl.NumberFormat(LOCALE).format(value);
}

/** "5 min read" */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

/** "01", "02" … for the numbered ranking lists. */
export function formatRank(index: number): string {
  return String(index + 1).padStart(2, '0');
}
