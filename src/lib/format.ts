/**
 * Date and number formatting — Persian.
 *
 * Every formatter here is deterministic: a fixed locale, a fixed calendar and a
 * fixed time zone, so the server and the client always produce identical
 * strings and React never reports a hydration mismatch. Tehran is used rather
 * than UTC because that is the reader's clock — it is still a constant, so
 * determinism is unaffected.
 *
 * Relative labels ("۳ ساعت پیش") depend on the current time, so they are
 * produced only inside `RelativeTime`, which upgrades after mount.
 */

/** Persian locale, Jalali calendar, Persian (extended Arabic-Indic) digits. */
const LOCALE = 'fa-IR-u-ca-persian-nu-arabext';
const TIME_ZONE = 'Asia/Tehran';

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

/**
 * The same instant on the Gregorian calendar, still in Persian script.
 *
 * Shown alongside the Jalali date: readers here work in both — Jalali for daily
 * life, Gregorian for anything international, which is most of what a foreign
 * desk publishes.
 */
const longDateGregorian = new Intl.DateTimeFormat('fa-IR-u-ca-gregory-nu-arabext', {
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

/** Grouped, for reader counts: "۱۲٬۴۰۰". */
const groupedNumber = new Intl.NumberFormat('fa-IR-u-nu-arabext');

/** Ungrouped, for small inline counts: "۵". */
const plainNumber = new Intl.NumberFormat('fa-IR-u-nu-arabext', { useGrouping: false });

/** "۵ مرداد" — compact stamp for cards and list rows. */
export function formatShortDate(iso: string): string {
  return shortDate.format(new Date(iso));
}

/** "۵ مرداد ۱۴۰۵ · ۲۷ ژوئیهٔ ۲۰۲۶" — bylines and article headers, both calendars. */
export function formatLongDate(iso: string): string {
  const date = new Date(iso);
  return `${longDate.format(date)} · ${longDateGregorian.format(date)}`;
}

/** Jalali only — for places too tight to carry both. */
export function formatJalaliDate(iso: string): string {
  return longDate.format(new Date(iso));
}

/** Gregorian only, Persian script. */
export function formatGregorianDate(iso: string): string {
  return longDateGregorian.format(new Date(iso));
}

/** "۵ مرداد · ۰۹:۱۴" — the breaking strip and the latest feed. */
export function formatStamp(iso: string): string {
  const date = new Date(iso);
  return `${shortDate.format(date)} · ${timeOnly.format(date)}`;
}

/** "۱۴:۲۰" */
export function formatTime(iso: string): string {
  return timeOnly.format(new Date(iso));
}

/**
 * "۳ ساعت پیش" / "۲ روز پیش". Only ever called from a client component after
 * mount, because its output depends on the current time.
 */
export function formatRelative(iso: string, now: number = Date.now()): string {
  const diff = now - Date.parse(iso);
  const minutes = Math.round(diff / 60_000);

  if (minutes < 1) return 'همین حالا';
  if (minutes < 60) return `${plainNumber.format(minutes)} دقیقه پیش`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${plainNumber.format(hours)} ساعت پیش`;

  const days = Math.round(hours / 24);
  if (days < 7) return `${plainNumber.format(days)} روز پیش`;

  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${plainNumber.format(weeks)} هفته پیش`;

  return formatShortDate(iso);
}

/** "۱۲٬۴۰۰" — reader counts and subscriber totals. */
export function formatCount(value: number): string {
  return groupedNumber.format(value);
}

/** "۵ دقیقه مطالعه" */
export function formatReadingTime(minutes: number): string {
  return `${plainNumber.format(minutes)} دقیقه مطالعه`;
}

/** "۰۱", "۰۲" … for the numbered ranking lists. */
export function formatRank(index: number): string {
  return plainNumber.format(index + 1).padStart(2, '۰');
}
