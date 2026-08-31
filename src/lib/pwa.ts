/**
 * Shared client helpers for the installable-app layer.
 *
 * Every key written here is namespaced under `ukmag:pwa:`. Nothing in this
 * module reads or writes any other key — reader bookmarks live under
 * `ukmagazine:bookmarks` and recent searches under their own key, and an
 * install prompt or a service-worker update must never disturb them.
 */

const PREFIX = 'ukmag:pwa:';

export const PWA_KEYS = {
  /** Cumulative count of qualifying page views, used to gate the prompts. */
  views: `${PREFIX}views`,
  /** Epoch ms until which the install suggestion stays hidden. */
  installSnoozedUntil: `${PREFIX}install-snoozed-until`,
  /** Epoch ms until which the notification suggestion stays hidden. */
  notifySnoozedUntil: `${PREFIX}notify-snoozed-until`,
} as const;

/** A dismissal is a "not now", not a permanent refusal. */
export const INSTALL_SNOOZE_DAYS = 14;
export const NOTIFY_SNOOZE_DAYS = 30;

/**
 * Engagement gates. The install suggestion waits until someone has actually
 * read a few pages, and the notification suggestion waits longer still, so the
 * two never arrive together and neither greets a first-time visitor.
 */
export const INSTALL_MIN_VIEWS = 3;
export const NOTIFY_MIN_VIEWS = 6;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * localStorage throws in some privacy modes and when storage is full, and it
 * is entirely absent during server rendering. None of this is important enough
 * to fail a page over.
 */
function readStore(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStore(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignored: the prompt simply reverts to its default cadence.
  }
}

/** True when the site is running as an installed application. */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // Safari's own, non-standard flag — still the only signal on iOS.
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

/** iPhone or iPad, including iPadOS which reports itself as a Mac. */
export function isIos(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && typeof document !== 'undefined' && navigator.maxTouchPoints > 1)
  );
}

/**
 * iOS installs are only possible from Safari — other iOS browsers have no
 * "Add to Home Screen" that produces a real PWA, so showing them the
 * instructions would be telling them to do something they cannot do.
 */
export function isIosSafari(): boolean {
  if (!isIos()) return false;
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
}

/** Records one page view and returns the new total. */
export function recordView(): number {
  if (typeof window === 'undefined') return 0;
  const next = getViews() + 1;
  writeStore(PWA_KEYS.views, String(next));
  return next;
}

export function getViews(): number {
  const raw = readStore(PWA_KEYS.views);
  const parsed = raw ? Number.parseInt(raw, 10) : 0;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/** True while a suggestion is still inside its cooldown. */
export function isSnoozed(key: string): boolean {
  const raw = readStore(key);
  if (!raw) return false;
  const until = Number.parseInt(raw, 10);
  return Number.isFinite(until) && Date.now() < until;
}

export function snooze(key: string, days: number): void {
  writeStore(key, String(Date.now() + days * DAY_MS));
}

/**
 * The event Chromium fires when the app meets its install criteria. It is not
 * in TypeScript's DOM library, and calling `prompt()` is only legal from a
 * user gesture.
 */
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

declare global {
  interface Window {
    /** Parked by the inline capture in the document head. See layout.tsx. */
    __ukmagInstallEvent: BeforeInstallPromptEvent | null;
  }
}
