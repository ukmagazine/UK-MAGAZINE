# UK MAGAZINE — Analytics and consent

Google Analytics 4 (`site.analytics.gaMeasurementId` in `src/data/site.ts`),
loaded **only after the reader clicks «قبول»**. UK PECR reg. 6 and UK GDPR:
until then, and after «نه، ممنون», the site makes no request to any Google
domain and sets no cookie.

## How it fits together

| File | Job |
|---|---|
| `src/lib/consent.ts` | The stored choice: `localStorage['ukmag:consent:analytics'] = {choice, at}`. Older than 365 days, unreadable, or storage blocked → treated as undecided (fails closed). |
| `src/lib/analytics.ts` | `startAnalytics` injects gtag.js and calls `config`; `stopAnalytics` sets `ga-disable-<ID>` and deletes `_ga` / `_ga_*` on the host and every parent domain (`theukmag.com`, `.theukmag.com`). |
| `src/components/analytics/Analytics.tsx` | Applies the stored choice on load and follows changes live (same tab and other tabs). No reload either way. |
| `src/components/consent/` | The banner, the shared "is it open" hook, and the «تنظیمات کوکی» button (footer and privacy page). |
| `src/components/pwa/PwaLayer.tsx` | Shows the banner first and alone; the update notice and install/notification suggestions stay mounted but hidden until a choice is made. |

`config` is sent with `allow_google_signals: false` and
`allow_ad_personalization_signals: false`; `ad_storage`, `ad_user_data` and
`ad_personalization` consent are denied and `ads_data_redaction` is on.

### Page views

Nothing in the site sends `page_view`. `config` sends one for the page the
reader is on (on accepting, or on arrival for a returning reader who already
accepted), and GA4 enhanced measurement ("page changes based on browser
history") sends one per client-side navigation. Adding a route-change
`page_view` here would count every navigation twice.

### Service worker

`public/sw.js` returns early for every cross-origin request, so gtag.js and
the collect hits are never intercepted or cached. See docs/PWA.md.

## Changing things

- **New measurement ID:** edit `site.analytics.gaMeasurementId`. No secret, no workflow change.
- **Turn analytics off:** set it to `''`. The banner, footer link and loader all disappear.
- **Adding any other cookie, embed or third-party script:** it must go behind the
  same consent, and /privacy/ must change in the same commit.

## Verification (September 2026, before first merge)

Run with Playwright/Chromium against the static `out/` build. Google's domains
were unreachable from the build environment, so gtag.js was replaced by a stub
that behaves like GA4 on the points under test: it sets `_ga`/`_ga_*` on the
parent domain, sends a `page_view` per `config` and per browser-history URL
change, and honours `ga-disable-<ID>`. Every request to a Google host was
logged. 53 checks, all passing, including:

1. No choice: zero Google requests, no `_ga` cookie, no `gtag`/`dataLayer`.
2. After «نه، ممنون» (and after reloads and navigations): still none.
3. After «قبول»: gtag.js requested once, no reload, exactly one `page_view`;
   each client-side navigation and Back adds exactly one; a reload for a
   returning reader sends exactly one.
4. Withdrawn from «تنظیمات کوکی»: `_ga`/`_ga_*` gone on `theukmag.com` and
   `.theukmag.com`, and no further Google request in the same visit or after reload.
5. With the install prompt due, only the banner shows; the install prompt
   appears after the choice and hides again if the banner is reopened.
6. 390px: full-width bottom bar; 1280px: 352px card in the bottom-right
   (RTL start) corner. Buttons identical in size and style, 44px tall; the page
   end scrolls clear of the banner.

The stub stands in for Google's real script, so the one thing only the live site
can confirm is GA4's own history-change handling. Check it in the GA4
Realtime report after the merge.
