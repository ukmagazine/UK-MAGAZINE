/*
 * UK MAGAZINE service worker.
 *
 * Hand-written on purpose. The caching this site needs is a few rules, and the
 * available wrappers cost more than they save here: `next-pwa` is unmaintained
 * and predates the App Router, and Serwist would add a build-time plugin and a
 * Workbox runtime to express what is written plainly below. Nothing here needs
 * a build step, so the file ships as-is with `output: 'export'`.
 *
 * SCOPE: registered at '/' from /sw.js. Production is served at the
 * custom-domain root (public/CNAME + basePath: ''), so root-relative paths are
 * correct. Push notifications deliberately live in a SECOND worker at
 * /onesignal/ scope — see public/onesignal/OneSignalSDKWorker.js — so that a
 * provider SDK can never take over navigation and caching for the whole site.
 *
 * FRESHNESS: this is a news site, so nothing carrying editorial content is
 * served from cache while the network is available. Navigations are
 * network-first; the cache exists to keep the site usable offline, not to make
 * it faster at the cost of showing yesterday's news.
 */

/**
 * Bump only when the caching LOGIC below changes; it renames every cache and
 * the old ones are dropped on activate.
 *
 * It is deliberately not tied to the build id. Article HTML is network-first
 * and Next's asset URLs are content-hashed, so a new deployment reaches
 * readers on their next online navigation whether or not this worker changed.
 */
const VERSION = 'v1';

const STATIC_CACHE = 'ukmag-static-' + VERSION;
const PAGES_CACHE = 'ukmag-pages-' + VERSION;
const IMAGES_CACHE = 'ukmag-images-' + VERSION;
const OWNED = [STATIC_CACHE, PAGES_CACHE, IMAGES_CACHE];

/** Everything this worker creates is prefixed, so cleanup can never reach another app's cache. */
const CACHE_PREFIX = 'ukmag-';

const OFFLINE_URL = '/offline/';

/** Bounded so a long reading session cannot grow storage without limit. */
const PAGE_LIMIT = 40;
const IMAGE_LIMIT = 60;

/**
 * The minimum needed to render the offline page. Kept tiny: a large precache
 * makes installation slow and fail on flaky connections, and everything else
 * arrives naturally as the reader browses.
 */
const PRECACHE = [OFFLINE_URL, '/icons/icon-192.png'];

// ---------------------------------------------------------------- install --

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      /**
       * Into the static cache, not the pages cache. The pages cache is trimmed
       * to PAGE_LIMIT and evicts oldest-first, so the offline fallback — being
       * the very first entry written — would be the first thing dropped after
       * forty page views, which is exactly when a reader is most likely to
       * need it.
       */
      const cache = await caches.open(STATIC_CACHE);
      // Individually, so one failure cannot fail the whole installation.
      await Promise.all(
        PRECACHE.map(async (url) => {
          try {
            await cache.add(new Request(url, { cache: 'reload' }));
          } catch {
            // Non-fatal: the offline page is a fallback, not a dependency.
          }
        }),
      );

      /**
       * The offline page's own JavaScript and CSS, read out of its markup.
       *
       * Caching only the HTML is not enough. Next hydrates every page, and
       * when the chunks it asks for are missing the hydration throws and React
       * replaces the whole document with "Application error: a client-side
       * exception has occurred" — so the fallback for being offline was itself
       * broken offline. Scraping the URLs out of the served HTML keeps this in
       * step with whatever the build actually produced, with no build step and
       * no hard-coded hashes to go stale.
       */
      try {
        const html = await (await cache.match(OFFLINE_URL)).text();
        const assets = [...new Set(html.match(/\/_next\/static\/[A-Za-z0-9._/-]+/g) || [])];
        await Promise.all(
          assets.map(async (asset) => {
            try {
              if (!(await cache.match(asset))) {
                await cache.add(new Request(asset, { cache: 'reload' }));
              }
            } catch {
              // One missing chunk must not fail the install.
            }
          }),
        );
      } catch {
        // The offline page was not cached; nothing to scrape.
      }
      // Deliberately no skipWaiting() here. The page decides when a new worker
      // takes over, so a reader is never swapped onto a new build mid-article.
    })(),
  );
});

// --------------------------------------------------------------- activate --

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Only ever delete our own caches, matched by prefix. Reader data in
      // localStorage and IndexedDB — bookmarks, recent searches, the prompt
      // cooldowns — is never touched by this worker.
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name.startsWith(CACHE_PREFIX) && OWNED.indexOf(name) === -1)
          .map((name) => caches.delete(name)),
      );

      // Lets the browser start a navigation's network request while the worker
      // is still booting.
      if (self.registration.navigationPreload) {
        try {
          await self.registration.navigationPreload.enable();
        } catch {
          // Not supported; the fetch handler works without it.
        }
      }

      await self.clients.claim();
    })(),
  );
});

// ----------------------------------------------------------------- helpers --

/** Trim a cache to its most recent `limit` entries, oldest first. */
async function trim(cacheName, limit) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= limit) return;
  // Cache Storage preserves insertion order, so the head is the oldest.
  await Promise.all(keys.slice(0, keys.length - limit).map((key) => cache.delete(key)));
}

/** A response worth storing: a real, complete, same-origin 200. */
function isCacheable(response) {
  if (!response || response.status !== 200) return false;
  // 'basic' means same-origin and fully readable. Opaque cross-origin
  // responses are excluded on purpose: they cannot be inspected, and each is
  // charged against the storage quota at a large padded size.
  if (response.type !== 'basic') return false;
  const control = response.headers.get('Cache-Control') || '';
  return control.indexOf('no-store') === -1;
}

// ------------------------------------------------------------------ fetch --

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Never interfere with anything that changes state, or with range requests.
  if (request.method !== 'GET') return;
  if (request.headers.has('Range')) return;

  const url = new URL(request.url);

  // Leave other origins entirely alone. Article photography is hotlinked from
  // Unsplash's CDN; letting it through untouched keeps the browser's own HTTP
  // cache in charge and keeps opaque responses out of our storage quota.
  if (url.origin !== self.location.origin) return;

  // 1. NAVIGATION — network first, cache as fallback, offline page last.
  //    A reader who is online always gets the current article.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloaded = await event.preloadResponse;
          const response = preloaded || (await fetch(request));
          if (isCacheable(response)) {
            const cache = await caches.open(PAGES_CACHE);
            await cache.put(request, response.clone());
            await trim(PAGES_CACHE, PAGE_LIMIT);
          }
          return response;
        } catch {
          const cached = await caches.match(request, { ignoreSearch: true });
          if (cached) return cached;

          /**
           * Redirect rather than serve the offline page's HTML in place.
           *
           * Returning that HTML for, say, /article/x/ leaves the browser on
           * /article/x/ holding markup Next built for /offline. The router
           * rehydrates, finds the route it was given does not match the
           * document it has, and throws — the reader gets "Application error:
           * a client-side exception has occurred" instead of the offline page.
           * Redirecting puts the URL and the document back in agreement.
           *
           * The intended path is carried across so the offline page's retry
           * button can return the reader to what they actually wanted. It is
           * validated there before being used.
           */
          // Response.redirect() requires an absolute URL in service workers.
          // Build it explicitly so offline fallback never throws a TypeError.
          if (url.pathname === OFFLINE_URL) {
            return new Response('Offline', {
              status: 503,
              headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            });
          }

          const target = new URL(OFFLINE_URL, self.location.origin);
          target.searchParams.set('from', url.pathname + url.search);
          return Response.redirect(target.href, 302);
        }
      })(),
    );
    return;
  }

  // 2. BUILD ASSETS — cache first. Next fingerprints these filenames, so a
  //    given URL's bytes never change and a new deployment simply asks for
  //    different URLs.
  if (url.pathname.indexOf('/_next/static/') === 0) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (isCacheable(response)) {
          const cache = await caches.open(STATIC_CACHE);
          await cache.put(request, response.clone());
        }
        return response;
      })(),
    );
    return;
  }

  // 3. IMAGES AND ICONS — stale while revalidate: shows instantly, refreshes
  //    in the background.
  if (request.destination === 'image') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(IMAGES_CACHE);
        const cached = await cache.match(request);

        const network = fetch(request)
          .then(async (response) => {
            if (isCacheable(response)) {
              await cache.put(request, response.clone());
              await trim(IMAGES_CACHE, IMAGE_LIMIT);
            }
            return response;
          })
          .catch(() => undefined);

        return cached || (await network) || Response.error();
      })(),
    );
    return;
  }

  // 4. Everything else (manifest, robots, sitemap, JSON) — network first with
  //    a cache fallback, so the site still opens offline.
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(request);
        if (isCacheable(response)) {
          const cache = await caches.open(STATIC_CACHE);
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        const cached = await caches.match(request);
        if (cached) return cached;
        throw new Error('offline and uncached');
      }
    })(),
  );
});

// --------------------------------------------------------------- messages --

self.addEventListener('message', (event) => {
  // The only instruction this worker accepts, sent by the update prompt after
  // the reader explicitly chooses to update.
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
