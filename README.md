# UK MAGAZINE

A production-oriented, responsive Persian news publication for Iranians in the UK. The interface
uses clean editorial surfaces, deep-purple brand accents and generous magazine-style whitespace,
while the content layer is supplied by the Make.com → WordPress → GitHub Pages pipeline.

**Design system at a glance**

| Token group | Values |
| ----------- | ------ |
| Brand accent | `#8E1B9C` · deep `#6B1475` · wash `#F7EFF9` |
| Ink         | `#111111` · strong `#303030` · muted `#6C6C6C` |
| Surfaces    | page `#F5F5F2` · surface `#FFFFFF` · soft `#FAFAF8` |
| Borders     | `#E6E6E1` · strong `#D5D5CF` |
| Radii       | `sm 5px` · `md 9px` · `lg 14px` |
| Shadows     | `shadow-page` (site canvas) · `shadow-card` (editorial cards) · `shadow-lift` (floating panels) |

The site renders inside an elevated white canvas (`max-width: 1720px`) floating on the warm-gray
page background from `lg` upward, and goes full-bleed on mobile.

Built with **Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS · Framer Motion · Lucide React**.
Fully static output. The site is **Persian-only (فارسی), right-to-left**, and its content comes from
a pipeline rather than from source files — see [Content pipeline](#content-pipeline).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Other scripts:

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run build`     | Production build (34 static pages)     |
| `npm start`         | Serve the production build             |
| `npm run sync:wp`   | Pull posts from WordPress into `content/articles/` |
| `npm run lint`      | ESLint (flat config, Next rules)       |
| `npm run typecheck` | `tsc --noEmit`                         |

## What's inside

**Pages** — Homepage, `/category/[slug]` (13 routable desks; 9 primary), `/article/[slug]/`,
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
├── data/                 # Editorial configuration (not stories)
│   ├── site.ts           # Brand name, wordmark, tagline, URL, footer links
│   ├── categories.ts     # 9 primary desks + 4 legacy routable desks
│   ├── authors.ts        # House byline for the publication
│   ├── newsletters.ts    # The five editions
│   └── articles.ts       # Thin re-export of the content loader
├── hooks/usePresence.ts  # Deterministic mount/unmount for overlays
└── lib/
    ├── content/          # THE CONTENT PIPELINE
    │   ├── schema.ts     # Zod contract every article must satisfy
    │   ├── markdown.ts   # Markdown → ArticleBlock[], reading-time estimate
    │   ├── load.ts       # Reads + validates content/articles/*.json at build
    │   └── wordpress.ts  # WP REST → the same ArticleSource shape
    ├── types.ts          # Domain models (Article, Category, CardArticle, …)
    ├── articles.ts       # Queries: latest, trending, most-read, related, search
    ├── search-cards.ts   # Client-side search over the card projection
    ├── persian.ts        # Text normalisation for Persian search
    ├── seo.ts            # Metadata + JSON-LD builders
    └── format.ts         # Jalali dates, Persian numerals (no hydration drift)

content/articles/         # The corpus — one JSON file per story
scripts/sync-wordpress.ts # Pulls WordPress posts into content/articles/
```

Two decisions worth knowing about:

- **Server-first data flow.** Pages are server components querying `lib/articles.ts` directly.
  Client components never import the corpus — they receive a `CardArticle` projection (title,
  summary, image, byline) as props, so article bodies never enter the JavaScript bundle. Swapping
  the local data for a CMS later means reimplementing `lib/articles.ts` and nothing else.
- **Deterministic timestamps.** All formatters use a fixed locale, the Jalali calendar and a fixed
  `Asia/Tehran` zone, so server and client markup always match (no hydration errors). Relative
  labels ("۳ ساعت پیش") upgrade after mount via `RelativeTime`.

## Content pipeline

Stories are **not** written in TypeScript. They live as JSON in `content/articles/`, produced by an
automation (Make.com → WordPress → this repository) and validated at build time.

```
harvest → AI rewrite → Airtable → Make.com → WordPress
                                                 │
                                  npm run sync:wp│
                                                 ▼
                                    content/articles/*.json
                                                 │
                                  Zod validation │  ← bad records warn + skip; zero valid fails
                                                 ▼
                                          npm run build
```

**Validation is the point.** `lib/content/schema.ts` is the contract: category must match one of the 13 supported slugs, `imageAlt` is mandatory, dates must parse, and
slugs must be Latin-hyphenated. Malformed files and duplicate slugs are warned about and skipped;
the build stops only when no valid article remains.

**Derived, never authored.** `readingTime` is computed from word count, `relatedIds` from shared
tags and desk, and `body` is parsed from Markdown. An automation cannot meaningfully hand-pick
cross-references, so it is not asked to.

**Adding a story by hand** — drop a JSON file into `content/articles/`:

```jsonc
{
  "id": "any-stable-key",          // Airtable record id or WordPress post id
  "slug": "latin-hyphenated",      // becomes /article/<slug>/
  "title": "…", "summary": "…",
  "category": "world",             // one of the supported desk slugs
  "authorId": "ukmagazine",         // house byline
  "publishedAt": "2026-07-29T09:00:00.000Z",
  "image": "https://…", "imageAlt": "…",
  "bodyMarkdown": "## عنوان\n\nمتن…\n\n> نقل قول\n> — منبع"
}
```

Markdown supports `## headings`, `> quotes` (with a trailing `— attribution` line), `-`/`1.` lists
and `![alt](src "caption")`. Anything else degrades to a paragraph rather than throwing.

**WordPress** — set `WORDPRESS_URL` (see `.env.example`) and run `npm run sync:wp`. Only *published*
posts are pulled, so a draft in WordPress is a draft on the site: that is the human review gate for
AI-written copy. The sync materialises WordPress posts as files before `next build`, so the static loader stays
deterministic. In CI the sync is intentionally mandatory: if WordPress is unreachable, the workflow
fails rather than silently deploying stale content.

> WordPress must run the MU plugin in `wordpress/uk-magazine-bridge.php`. The API contract uses
> `uk_subtitle`, `uk_image_credit`, `uk_kind` and `uk_image_url`; images are hotlinked from the
> source CDN and WordPress categories must match the shared slug contract exactly.

## Language

The publication ships in **Persian (فارسی) only**, right-to-left.

- `lang="fa"` and `dir="rtl"` are rendered **by the server**, so the correct language reaches
  crawlers and screen readers in the first byte and there is no direction flip after hydration.
- **UI copy** lives in `src/i18n/dictionaries.ts`. The English dictionary is still compiled in and
  `LocaleProvider` is still the seam — restoring a second language means lifting `locale` back into
  state and reinstating a switcher, not rewriting components.
- **Dates** are Jalali (`۵ مرداد ۱۴۰۵`) in a fixed `Asia/Tehran` zone; all counts render in Persian
  digits (`۱۲٬۴۰۰`).
- **Search normalises Persian text** (`src/lib/persian.ts`) before matching: Arabic vs Persian yeh
  and kaf, ZWNJ, Arabic-Indic digits and harakat are all folded, so «بانك» finds «بانک».
- **Mirroring** is automatic: components use logical properties (`ms-`/`me-`, `ps-`/`pe-`,
  `border-s`/`border-e`), and directional icons carry `rtl:-scale-x-100`.

**Typography note.** The design's serif/sans contrast is a Latin device — `Newsreader` has no
Persian glyphs, so headlines render in Vazirmatn like the body text. To restore that contrast,
self-host a Persian display face and point `--font-display` at it (check its commercial licence;
most Persian display fonts are not free).

## Customising

| Change                  | Where                                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| **Brand name/wordmark** | `src/data/site.ts` — `name`, `wordmark.lead` / `wordmark.trail`, tagline, URL, socials          |
| **Colours**             | `tailwind.config.ts` (`brand`, `ink`, `surface`, `line` tokens) + the matching CSS variables at the top of `src/app/globals.css`. Changing `brand.red` re-skins every accent |
| **Site canvas**         | The `lg:` classes on the shell `<div>` in `src/app/layout.tsx` (width, radius, `shadow-page`) |
| **Logo mark**           | `src/components/ui/Wordmark.tsx` — the accent slash's size, gradient and `animate-sheen` sweep |
| **Fonts**               | `src/app/layout.tsx` — swap the two `next/font` imports (serif display + sans UI)               |
| **Categories**          | `src/data/categories.ts` — add/remove desks; nav, routes, sitemap and filters follow automatically. Toggle `inPrimaryNav` per desk |
| **Articles**            | Add a JSON file to `content/articles/` (see [Content pipeline](#content-pipeline)), or run `npm run sync:wp`. Routes, search, "most read" and related stories all derive from it |
| **Newsletters**         | `src/data/newsletters.ts`                                                                       |
| **Breaking headlines**  | Derived automatically — anything with `"kind": "breaking"` leads the strip, newest stories fill it |
| **Content source**      | `WORDPRESS_URL` in `.env` — unset, the build uses whatever is already in `content/articles/`    |

### Images

Article art is served from `images.unsplash.com` and resized by **Unsplash's own CDN** via a custom
loader (`src/lib/image-loader.ts`), not by Next's built-in optimiser. This matters: the originals are
~1.3 MB, and the built-in optimiser had to download the full file once per size variant, which timed
out under concurrency and returned 500s for the hero. Routing widths to the CDN means a 68px
thumbnail costs 5.8 KB instead of a 1.3 MB origin fetch.

Every photo ID in the corpus is verified to resolve. Local files (anything starting with `/`) pass
through the loader untouched, so to go fully offline you can drop images into `public/` and point
the `image` field at them. For WordPress content the production contract keeps the original CDN URL in `uk_image_url`;
Unsplash images remain hotlinked and are resized through Unsplash query parameters.

## Status

Production configuration now targets `https://theukmag.com`, keeps the custom-domain `CNAME`,
syncs WordPress before each GitHub Pages build, and contains no committed demo article JSON.
`content/articles/` is populated by `npm run sync:wp` during CI/local publishing.

Before a live deployment, create the GitHub Actions secret `WORDPRESS_URL=https://cms.theukmag.com`,
run the authenticated WordPress acceptance test, then run the manual workflow and inspect the live
sitemap. See `docs/DEPLOYMENT-CHECKLIST-FA.md`.
