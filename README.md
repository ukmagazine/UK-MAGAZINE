# UK MAGAZINE

A production-quality, responsive news publication template. A luxury editorial system: white
architectural surfaces, sharp red geometry, elegant serif headlines and generous Swiss-style
whitespace — the clarity of a modern briefing platform with the elegance of a luxury magazine.

**Design system at a glance**

| Token group | Values |
| ----------- | ------ |
| Brand red   | `#E10600` · deep `#A90804` · wash `#FFF1F0` |
| Ink         | `#111111` · strong `#303030` · muted `#6C6C6C` |
| Surfaces    | page `#F5F5F2` · surface `#FFFFFF` · soft `#FAFAF8` |
| Borders     | `#E6E6E1` · strong `#D5D5CF` |
| Radii       | `sm 5px` · `md 9px` · `lg 14px` |
| Shadows     | `shadow-page` (site canvas) · `shadow-card` (editorial cards) · `shadow-lift` (floating panels) |

The site renders inside an elevated white canvas (`max-width: 1480px`) floating on the warm-gray
page background from `lg` upward, and goes full-bleed on mobile.

Built with **Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS · Framer Motion · Lucide React**.
No backend, no database, no API keys — all content lives in typed TypeScript files.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Other scripts:

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run build`     | Production build (56 static pages)    |
| `npm start`         | Serve the production build            |
| `npm run lint`      | ESLint (flat config, Next rules)      |
| `npm run typecheck` | `tsc --noEmit`                        |

## What's inside

**Pages** — Homepage, `/category/[slug]` (10 desks), `/article/[slug]` (36 stories),
`/search`, `/about`, `/newsletter`, `/bookmarks`, custom 404, plus `sitemap.xml` and `robots.txt`.

**Features** — sticky compacting header with animated active-desk indicator; slide-in mobile menu
(focus-trapped, Escape to close); breaking-news marquee with pause control and a reduced-motion
fallback; full-screen search overlay (`/` or `Ctrl/Cmd+K`) with live preview, suggested topics and
recent searches; search results page with desk/date filters and four sort orders; localStorage
bookmarks with header badge and elegant empty state; newsletter forms with client-side validation
and a simulated success state; reading-progress bar, table of contents, share controls, briefing
panels, key facts, pull quotes, tags, related stories and prev/next navigation on every article.

**SEO** — per-page metadata, Open Graph + Twitter cards, canonical URLs, and JSON-LD for
NewsMediaOrganization, WebSite (with SearchAction), NewsArticle, BreadcrumbList and CollectionPage.

**Accessibility** — WCAG 2.1 AA-oriented: skip link, semantic landmarks, one `h1` per page,
44px touch targets, visible focus rings, focus-trapped dialogs, `aria-live` counts,
`prefers-reduced-motion` respected everywhere (marquee becomes a timed rotation, reveals render
statically), and descriptive alt text written against the actual images.

## Architecture

```
src/
├── app/                  # Routes (server components; each owns its metadata)
│   ├── layout.tsx        # Fonts, providers, header/footer, org + website JSON-LD
│   ├── page.tsx          # Homepage — hero, latest, desks, picks, in depth
│   ├── article/[slug]/   # Article page + generateStaticParams
│   ├── category/[slug]/  # Desk pages + generateStaticParams
│   ├── search/ about/ newsletter/ bookmarks/ not-found.tsx
│   └── sitemap.ts robots.ts
├── components/
│   ├── article/          # ArticleCard (11 variants), HeroStory, EditorsPicksRow, SmartBriefing,
│   │                     # ArticleBody, TrendingList, LatestNewsFeed, BookmarkButton,
│   │                     # ReadingProgress, ShareButtons, TableOfContents, AuthorCard,
│   │                     # RelatedStories, NextArticleNav, ArticleGrid, badges/meta
│   ├── layout/           # Header, MobileMenu, BreakingNewsBar, Footer
│   ├── search/           # SearchOverlay, SearchResults
│   ├── bookmarks/        # BookmarksList
│   ├── category/         # CategoryStream (topic filters + load more)
│   ├── newsletter/       # NewsletterCard, NewsletterForm
│   ├── providers/        # BookmarksProvider, SearchProvider (client state)
│   └── ui/               # Wordmark, SectionHeader, CategoryHeader, Reveal, …
├── data/                 # ALL content lives here
│   ├── site.ts           # Brand name, wordmark, tagline, URL, footer links
│   ├── categories.ts     # The ten desks
│   ├── authors.ts        # Fictional bylines (monogram avatars, no photos)
│   ├── newsletters.ts    # The five editions
│   └── articles/         # One file per desk; articles.ts merges + sorts them
├── hooks/usePresence.ts  # Deterministic mount/unmount for overlays
└── lib/                  # Pure logic, no JSX
    ├── types.ts          # Domain models (Article, Category, CardArticle, …)
    ├── articles.ts       # Queries: latest, trending, most-read, related, search
    ├── search-cards.ts   # Client-side search over the card projection
    ├── seo.ts            # Metadata + JSON-LD builders
    └── format.ts         # Deterministic date/number formatting (no hydration drift)
```

Two decisions worth knowing about:

- **Server-first data flow.** Pages are server components querying `lib/articles.ts` directly.
  Client components never import the corpus — they receive a `CardArticle` projection (title,
  summary, image, byline) as props, so article bodies never enter the JavaScript bundle. Swapping
  the local data for a CMS later means reimplementing `lib/articles.ts` and nothing else.
- **Deterministic timestamps.** All formatters use a fixed locale and UTC so server and client
  markup always match (no hydration errors). Relative labels ("3h ago") upgrade after mount via
  `RelativeTime`.

## Languages

The interface ships in **English and Persian (فارسی)**. The switcher sits in the header (from `md`)
and in the footer; the choice persists to `localStorage` and sets `lang` / `dir` on `<html>`, so
Persian renders right-to-left with the Vazirmatn face.

- **UI copy** lives in `src/i18n/dictionaries.ts` — one entry per language, covering navigation,
  section labels, forms, search, bookmarks, the article furniture and empty states.
- **Desk names** are translated in `src/data/categories.ts` (`nameFa` / `shortNameFa`).
- **Mirroring** is automatic: components use logical properties (`ms-`/`me-`, `ps-`/`pe-`,
  `border-s`/`border-e`), and directional icons carry `rtl:-scale-x-100`. Persian also gets looser
  line-height, no negative tracking, and no Latin drop cap.

To add a third language: add an entry to `locales` and a dictionary alongside `en`/`fa`, then add
matching `name*`/`shortName*` fields to the categories.

**Article bodies remain in English.** Translating 36 stories is editorial work, not a code change —
add the translated copy to `src/data/articles/` when you have it.

## Customising

| Change                  | Where                                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| **Brand name/wordmark** | `src/data/site.ts` — `name`, `wordmark.lead` / `wordmark.trail`, tagline, URL, socials          |
| **Colours**             | `tailwind.config.ts` (`brand`, `ink`, `surface`, `line` tokens) + the matching CSS variables at the top of `src/app/globals.css`. Changing `brand.red` re-skins every accent |
| **Site canvas**         | The `lg:` classes on the shell `<div>` in `src/app/layout.tsx` (width, radius, `shadow-page`) |
| **Logo mark**           | `src/components/ui/Wordmark.tsx` — the red slash's size, gradient and `animate-sheen` sweep |
| **Fonts**               | `src/app/layout.tsx` — swap the two `next/font` imports (serif display + sans UI)               |
| **Categories**          | `src/data/categories.ts` — add/remove desks; nav, routes, sitemap and filters follow automatically. Toggle `inPrimaryNav` per desk |
| **Articles**            | Append to the desk file in `src/data/articles/` following any existing entry. Routes, search, "most read", related stories all derive from it |
| **Newsletters**         | `src/data/newsletters.ts`                                                                       |
| **Breaking headlines**  | `breakingItems` in `src/data/articles.ts`                                                       |
| **Demo timeline**       | `EPOCH` in `src/data/articles/_shared.ts` — move it forward to refresh all timestamps           |

### Images

Article art is served from `images.unsplash.com` and resized by **Unsplash's own CDN** via a custom
loader (`src/lib/image-loader.ts`), not by Next's built-in optimiser. This matters: the originals are
~1.3 MB, and the built-in optimiser had to download the full file once per size variant, which timed
out under concurrency and returned 500s for the hero. Routing widths to the CDN means a 68px
thumbnail costs 5.8 KB instead of a 1.3 MB origin fetch.

Every photo ID in the corpus is verified to resolve. Local files (anything starting with `/`) pass
through the loader untouched, so to go fully offline you can drop images into `public/` and change
the `img()` helper in `src/data/articles/_shared.ts`.

## Status

All eight pages, all interactions and all card variants are implemented and verified: production
build passes clean (`0` type errors, `0` lint errors, `0` production-dependency vulnerabilities),
no console or hydration errors, no horizontal overflow at 320 / 375 / 768 / 1024 / 1440 px.

Content is entirely fictional and the branding is original. The included stories are placeholder
editorial written for this template — replace them before any real launch.
