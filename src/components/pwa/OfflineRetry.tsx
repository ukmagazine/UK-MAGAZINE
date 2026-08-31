'use client';

import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Only a path on this site, and nothing that could leave it.
 *
 * The value arrives in a query string, which anyone can craft — a link to
 * `/offline/?from=https://example.com` or `?from=//example.com` would turn the
 * retry button into an open redirect off the publication. It has to start with
 * a single slash, and `//` is rejected because the browser reads it as
 * protocol-relative and would navigate to another host.
 */
function safeReturnPath(raw: string | null): string | null {
  if (!raw) return null;
  if (!raw.startsWith('/') || raw.startsWith('//')) return null;
  // A backslash is normalised to a forward slash by some parsers, so `/\evil`
  // can escape the origin too.
  if (raw.includes('\\')) return null;
  return raw;
}

/**
 * Retry control for the offline page.
 *
 * Also watches for the connection returning, because the common case is that
 * a reader is looking at this page at the moment their signal comes back and
 * should not have to work out that they need to tap anything.
 */
export function OfflineRetry() {
  /**
   * Starts false and is only set by a real `online` event. Seeding it from
   * `navigator.onLine` was wrong: that flag reports whether the device has a
   * network interface, not whether the site is reachable, so it reads `true`
   * on a working Wi-Fi connection with the server unreachable — and the page
   * cheerfully announced the connection was back while showing the offline
   * message.
   */
  const [online, setOnline] = useState(false);
  const [returnPath, setReturnPath] = useState<string | null>(null);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    // The service worker adds this when it redirects a failed navigation here.
    setReturnPath(safeReturnPath(new URLSearchParams(window.location.search).get('from')));

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const retry = () => {
    if (returnPath) window.location.href = returnPath;
    else window.location.reload();
  };

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={retry}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm bg-brand-red px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
      >
        <RefreshCw aria-hidden="true" className="h-4 w-4" />
        تلاش مجدد
      </button>

      {/* Announced rather than shown only as a colour change, so it reaches a
          screen reader the moment the connection returns. */}
      <p aria-live="polite" className="mt-4 min-h-[1.25rem] text-sm text-ink-soft">
        {online ? 'اتصال برقرار شد — دوباره تلاش کنید.' : ''}
      </p>
    </div>
  );
}
