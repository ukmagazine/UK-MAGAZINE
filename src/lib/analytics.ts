/**
 * Google Analytics 4, loaded only with consent.
 *
 * 🔴 Nothing in this module runs until the reader has clicked «قبول». Until
 * then there is no `<script>` for gtag.js in the page, no `dataLayer`, no
 * request to any Google domain and no cookie. The loader in
 * components/analytics/Analytics.tsx is the only caller.
 *
 * PAGE VIEWS: counted by GA4 itself. `config` sends one page_view for the page
 * the reader is on when they accept (or when a returning reader who already
 * accepted arrives), and enhanced measurement's "page changes based on browser
 * history" sends one for every client-side navigation after that. This module
 * therefore never sends a page_view of its own — doing so on route changes as
 * well would count every navigation twice.
 *
 * ADVERTISING: none. Google signals and ad personalisation are off in the GA4
 * admin and again here, and the ad-related consent types are denied, so the
 * tag has no advertising use whatever the property settings later become.
 */

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    /** GA's documented per-property kill switch; checked before every hit. */
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const SCRIPT_ID = 'ukmag-gtag';

let configured = false;

/**
 * Starts measuring from this moment. Safe to call repeatedly: the script is
 * injected once, and a later call after a withdrawal simply switches the tag
 * back on and records the current page.
 */
export function startAnalytics(measurementId: string): void {
  if (!measurementId || typeof window === 'undefined') return;

  window[`ga-disable-${measurementId}`] = false;

  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    // gtag.js reads the Arguments object itself, so this must not be an arrow
    // function or spread into an array.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  const gtag = window.gtag;

  if (!configured) {
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    gtag('set', 'ads_data_redaction', true);
    gtag('js', new Date());
  }

  // Each `config` sends exactly one page_view for the current page — the
  // "start measuring from that moment" page. Re-sent after a re-accept.
  gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  configured = true;

  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }
}

/**
 * Stops measuring immediately and removes GA's cookies.
 *
 * The loaded script cannot be unloaded, but `ga-disable-<ID>` makes it drop
 * every hit, including the history-change page views from enhanced
 * measurement, from this instant. The cookies are then deleted so nothing
 * identifying stays on the device.
 */
export function stopAnalytics(measurementId: string): void {
  if (typeof window === 'undefined') return;
  if (measurementId) window[`ga-disable-${measurementId}`] = true;
  deleteGaCookies();
}

/**
 * Every domain a GA cookie for this page could have been written on: the host
 * itself and each parent with at least two labels, with and without the
 * leading dot. For theukmag.com that is `theukmag.com` and `.theukmag.com`;
 * GA's automatic cookie domain is the latter.
 */
function candidateDomains(hostname: string): string[] {
  const labels = hostname.split('.');
  const domains: string[] = [];
  for (let i = 0; i <= labels.length - 2; i++) {
    const domain = labels.slice(i).join('.');
    domains.push(domain, `.${domain}`);
  }
  return domains;
}

/** Deletes `_ga` and every `_ga_*` cookie visible to this page. */
export function deleteGaCookies(): void {
  if (typeof document === 'undefined') return;

  let names: string[];
  try {
    names = document.cookie
      .split(';')
      .map((part) => part.split('=')[0].trim())
      .filter((name) => name === '_ga' || name.startsWith('_ga_'));
  } catch {
    return;
  }

  const expired = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/';
  const domains = candidateDomains(window.location.hostname);

  for (const name of names) {
    try {
      // Host-only first (localhost, or a cookie written without a domain),
      // then every domain it might have been scoped to.
      document.cookie = `${name}=; ${expired}`;
      for (const domain of domains) {
        document.cookie = `${name}=; ${expired}; domain=${domain}`;
      }
    } catch {
      // Cookies blocked outright; there is nothing to delete.
    }
  }
}
