'use client';

import { ArrowUpCircle } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

/** Do not re-check for an update more often than this when the tab is focused. */
const UPDATE_CHECK_INTERVAL_MS = 30 * 60 * 1000;

/**
 * Registers the caching worker and offers an update when a new one is waiting.
 *
 * Registration is production-only. A service worker that caches a development
 * build is actively harmful — it serves yesterday's bundle over a running dev
 * server — so in development this instead removes any worker a previous
 * production visit left behind on the same origin (localhost is shared).
 */
export function ServiceWorkerRegistration() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const reloading = useRef(false);
  const lastCheck = useRef(0);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

    if (process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => registrations.forEach((r) => r.unregister()))
        .catch(() => {
          // Nothing registered, or the browser refused. Either is fine.
        });
      return;
    }

    let registration: ServiceWorkerRegistration | undefined;

    /** A worker is only an *update* if one is already controlling the page. */
    const trackInstalling = (worker: ServiceWorker | null) => {
      if (!worker) return;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          setWaiting(worker);
        }
      });
    };

    const onControllerChange = () => {
      // Guarded: without this, a worker calling skipWaiting() on its own could
      // reload the page repeatedly.
      if (reloading.current) return;
      reloading.current = true;
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        registration = reg;
        // A worker may already be waiting from a previous visit.
        if (reg.waiting && navigator.serviceWorker.controller) setWaiting(reg.waiting);
        trackInstalling(reg.installing);
        reg.addEventListener('updatefound', () => trackInstalling(reg.installing));
        lastCheck.current = Date.now();
      })
      .catch(() => {
        // Registration fails on an insecure origin, in some private modes, and
        // where the user has blocked storage. The site works without it.
      });

    // Coming back to the tab is the natural moment to look for a new build.
    const onVisible = () => {
      if (document.visibilityState !== 'visible' || !registration) return;
      if (Date.now() - lastCheck.current < UPDATE_CHECK_INTERVAL_MS) return;
      lastCheck.current = Date.now();
      registration.update().catch(() => {
        // Offline, most likely. It will be retried next time.
      });
    };

    document.addEventListener('visibilitychange', onVisible);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const applyUpdate = useCallback(() => {
    if (!waiting) return;
    // The worker responds by calling skipWaiting(), which fires
    // controllerchange above and reloads the page onto the new build.
    waiting.postMessage({ type: 'SKIP_WAITING' });
    setWaiting(null);
  }, [waiting]);

  if (!waiting) return null;

  return (
    <div
      role="status"
      className="pwa-prompt pointer-events-auto rounded-md border border-line bg-surface p-4 shadow-lift"
    >
      <div className="flex items-center gap-3">
        <ArrowUpCircle aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-red" />
        <p className="flex-1 text-sm text-ink">نسخه جدید در دسترس است</p>
        <button
          type="button"
          onClick={applyUpdate}
          className="inline-flex min-h-[40px] shrink-0 items-center rounded-sm bg-brand-red px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        >
          به‌روزرسانی
        </button>
      </div>
    </div>
  );
}
