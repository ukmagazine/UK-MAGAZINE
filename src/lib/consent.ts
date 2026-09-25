/**
 * The reader's analytics consent, and nothing else.
 *
 * Stored in localStorage next to the other reader conveniences, under its own
 * key, as `{ choice, at }` where `at` is the ISO date of the decision. A
 * choice older than CONSENT_MAX_DAYS is treated as never made, so the banner
 * asks again after twelve months.
 *
 * Absence of a valid record always means "no consent". Storage that throws
 * (some private modes, full quota, server rendering) therefore fails closed:
 * the reader sees the banner and nothing is loaded.
 */

export type ConsentChoice = 'granted' | 'denied';

interface ConsentRecord {
  choice: ConsentChoice;
  /** ISO 8601 date the choice was made. */
  at: string;
}

export const CONSENT_KEY = 'ukmag:consent:analytics';

/** Ask again after twelve months. */
export const CONSENT_MAX_DAYS = 365;

const DAY_MS = 24 * 60 * 60 * 1000;

/** Fired on `window` whenever the stored choice changes in this tab. */
export const CONSENT_CHANGE_EVENT = 'ukmag:consent-change';

/** Fired on `window` by «تنظیمات کوکی» to reopen the banner. */
export const CONSENT_OPEN_EVENT = 'ukmag:consent-open';

function readRecord(): ConsentRecord | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed.choice !== 'granted' && parsed.choice !== 'denied') return null;
    const at = typeof parsed.at === 'string' ? Date.parse(parsed.at) : Number.NaN;
    if (!Number.isFinite(at)) return null;
    const age = Date.now() - at;
    // A date in the future is as unreadable as no date at all.
    if (age < 0 || age > CONSENT_MAX_DAYS * DAY_MS) return null;
    return { choice: parsed.choice, at: parsed.at as string };
  } catch {
    return null;
  }
}

/** The current, unexpired choice, or null when the reader has not decided. */
export function getConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  return readRecord()?.choice ?? null;
}

/**
 * Records the choice and tells the page. The event is dispatched even if
 * storage refused the write, so a click always takes effect for this visit.
 */
export function setConsent(choice: ConsentChoice): void {
  const record: ConsentRecord = { choice, at: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    // Not remembered, so the banner returns next visit. Still honoured now.
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }));
}

/** Reopens the banner so the reader can change their mind. */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
