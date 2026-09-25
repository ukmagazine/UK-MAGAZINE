# UK MAGAZINE — Progressive Web App

The site is an installable application on top of the same static export. Nothing
about the content pipeline changed: Make.com → WordPress → `sync:wp` →
`content/articles/*.json` → `next build` → GitHub Pages, exactly as before.

## Deployment facts this depends on

`public/CNAME` is `theukmag.com` and `next.config.ts` sets `basePath: ''`, so the
site is served from a **custom-domain root**. Every PWA path is therefore
root-relative.

> If the site is ever moved to `uniquensr.github.io/UK-MAGAZINE/`, all of these
> must gain that prefix: `start_url`, `scope`, the icon `src` values in
> `src/app/manifest.ts`, the registration path and scope in
> `ServiceWorkerRegistration.tsx`, `OFFLINE_URL` and the `/_next/static/` test in
> `public/sw.js`, and `serviceWorkerPath` / `serviceWorkerParam.scope` in
> `src/lib/push.ts`. A service worker cannot control a scope above its own
> directory, so a sub-path deployment also caps the worker's scope.

## Two service workers, deliberately

Only one worker can control a given scope. Rather than let a provider SDK take
over navigation and caching for the whole site, the two concerns are separated:

| Worker | Scope | Owns |
|---|---|---|
| `public/sw.js` | `/` | caching, offline fallback, update signalling |
| `public/onesignal/OneSignalSDKWorker.js` | `/onesignal/` | push receipt, notification display and clicks |

A push subscription belongs to the registration that created it, so push is
delivered to the narrow-scope worker regardless, and notification clicks open
any URL on the site through `clients.openWindow()`. The caching worker
implements no `push` or `notificationclick` handler, so a notification can never
be shown twice.

## Cache strategy

News, so freshness wins over speed wherever content is involved.

| Request | Strategy | Cache | Bound |
|---|---|---|---|
| Navigation (HTML) | **network first**, cache fallback, then `/offline/` | `ukmag-pages-v1` | 40 entries |
| `/_next/static/*` | **cache first** (content-hashed, immutable) | `ukmag-static-v1` | — |
| Images (same-origin) | **stale while revalidate** | `ukmag-images-v1` | 60 entries |
| Everything else same-origin | network first, cache fallback | `ukmag-static-v1` | — |
| **Cross-origin** | **not intercepted at all** | — | — |

Cross-origin includes Google Analytics (`www.googletagmanager.com`,
`*.google-analytics.com`), which loads only after the reader accepts it in the
consent banner. The worker never sees those requests, so it can never cache
gtag.js or hold a hit after consent is withdrawn.

Article photography is hotlinked from Unsplash. Those requests are left to the
browser's own HTTP cache: opaque cross-origin responses cannot be inspected and
are charged against the storage quota at a large padded size, so caching sixty
of them is a good way to be evicted entirely.

`VERSION` in `sw.js` renames every cache; old ones are deleted on activate,
matched by the `ukmag-` prefix so cleanup can never reach another origin's
storage. **Reader data is never touched** — bookmarks (`ukmagazine:bookmarks`),
recent searches, the analytics consent choice (`ukmag:consent:analytics`) and
the prompt cooldowns live in `localStorage`, which this
worker does not and cannot clear.

Bump `VERSION` only when the caching logic changes. It is not tied to the build
id on purpose: article HTML is network-first and Next's asset URLs are
content-hashed, so a new deployment reaches readers on their next online
navigation regardless.

## Offline

`/offline/` is a normal exported route, precached on install **into the static
cache** — the pages cache is trimmed oldest-first, so the fallback would
otherwise be the first thing evicted.

The install step also scrapes the `/_next/static/` URLs out of the offline
page's own HTML and caches them. Without that, Next hydrates the page, finds its
chunks missing, throws, and React replaces the document with "Application error"
— the fallback for being offline was itself broken offline.

A failed navigation **redirects** to `/offline/?from=<path>` rather than serving
that HTML in place. Serving it under the original URL leaves the router holding
markup built for a different route, which throws the same way. The `from` value
lets the retry button return the reader to what they wanted, and is validated
before use: it must start with a single `/`, and `//` and `\` are rejected so it
cannot become an open redirect off the publication.

## Prompts

At most one is ever on screen, and neither greets a first-time visitor.

| | Install | Notifications |
|---|---|---|
| Shown after | 3 page views | 6 page views |
| Also requires | not installed, `beforeinstallprompt` held (or iOS Safari) | push configured, permission `default` |
| Dismissal cooldown | 14 days | 30 days |

`beforeinstallprompt` is captured by an inline script in `layout.tsx`, not in a
component. Chromium fires it as soon as it decides the app is installable, which
is routinely earlier than hydration — a listener attached inside a component
misses it on most visits and the suggestion can then never be offered.

`prompt()` is only ever called from the reader's own click. On iOS there is no
such API, so Safari users get the real Share → Add to Home Screen steps instead
of a button that could not work, and only in Safari, which is the only iOS
browser that can install a PWA.

## Push

`Notification.requestPermission()` is never called on arrival. The reader sees
the publication's own explanation first, and only a click reaches the browser
dialog — a prompt nobody asked for is usually denied for good, and a denial
cannot be undone from script. The provider SDK is loaded at that moment and not
before, so a reader who never opts in never downloads it.

With `NEXT_PUBLIC_ONESIGNAL_APP_ID` unset the notification UI never appears at
all, and the install copy drops its mention of notifications rather than
promising something that cannot work.

### Setting up OneSignal

1. Create an app at <https://onesignal.com> → **Web Push**.
2. Site URL: `https://theukmag.com`. Site name: `UK MAGAZINE`.
3. Choose **"My site is not fully HTTPS"? No** — it is.
4. Under **Advanced / Service Workers**, set:
   - Path to service worker files: `/onesignal/`
   - Main service worker filename: `OneSignalSDKWorker.js`
   - Registration scope: `/onesignal/`
   These must match `serviceWorkerPath` and `serviceWorkerParam.scope` in
   `src/lib/push.ts`, or the SDK will register at `/` and fight the caching
   worker.
5. **Turn every automatic prompt off** (Slidedown, Native, Bell). This site asks
   in its own words first and calls `requestPermission()` itself; a provider
   prompt on top of that is the exact behaviour the flow is designed to avoid.
6. Copy the **App ID** (public) from Settings → Keys & IDs.
7. Add it to the deployment as `NEXT_PUBLIC_ONESIGNAL_APP_ID` — see below.
8. Leave the **REST API Key** in the dashboard. It can notify every subscriber
   and must never enter this repository.

### Wiring the App ID into the build

The value is inlined at build time, so it has to be present in GitHub Actions.
In `.github/workflows/deploy.yml`, on the **Build website** step:

```yaml
      - name: Build website
        run: npm run build
        env:
          NEXT_PUBLIC_ONESIGNAL_APP_ID: ${{ vars.NEXT_PUBLIC_ONESIGNAL_APP_ID }}
```

Set it under **Settings → Secrets and variables → Actions → Variables** (a
*variable*, not a secret — it is public by design and secrets are masked in
logs, which makes them awkward to debug).

### iOS

Web push on iPhone and iPad requires iOS/iPadOS **16.4 or later** *and* the site
added to the Home Screen. It does not work in a Safari tab. The notification
prompt detects this and shows the install steps instead of asking for a
permission that cannot be granted.

### Sending a breaking-news notification

OneSignal dashboard → **Messages → New Push**. Set the title, the message, and
the **Launch URL** to the article's real URL on `https://theukmag.com`. No code
change and no deployment is needed.

Only send for genuinely important stories. Nothing in this repository pushes
automatically, and adding that later means a server or serverless function
holding the REST API Key — never WordPress or the front end.

## Files

```
public/sw.js                                  caching + offline worker
public/onesignal/OneSignalSDKWorker.js        push worker (narrow scope)
public/icons/                                 manifest icons
src/app/manifest.ts                           web app manifest
src/app/offline/page.tsx                      offline route
src/app/icon.png, src/app/apple-icon.png      favicon and iOS icon
src/components/pwa/                           registration, prompts, layer
src/lib/pwa.ts                                standalone/iOS detection, gating
src/lib/push.ts                               provider integration
scripts/generate-icons.mjs                    icon generation from brand artwork
```
