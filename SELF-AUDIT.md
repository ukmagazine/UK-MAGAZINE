# UKMAG front-end work order v6 — self-audit

Repository: `uniquensr/UK-MAGAZINE` · seven commits on `main`, **not pushed**.

Verification gates: `npm run typecheck` clean · `npm run lint` clean ·
`npm run build` succeeds · `out/` served and checked in a browser.

| Task | Group | Status | Note |
|---|---|---|---|
| 1 | A | done | `environment` removed everywhere. |
| 2 | A | done | travel, guide, spotlight added; copy verbatim except two `tint` values (see 3). |
| 3 | A | done | `ai` was byte-identical to `society`. Also fixed: proposed `travel` sat 5° from `world`, proposed `spotlight` was byte-identical to `event`, proposed `guide` sat 8° from `technology`, and existing `education` sat 1° from `sports`. All 15 now ≥17° apart in hue, no duplicates. |
| 4 | A | done | `hidden?: boolean` on `Category`, set on sports/ai/education/science with `inPrimaryNav: false`. Not set on spotlight. A dev-only assertion fails the build if the flags and `HIDDEN_CATEGORY_SLUGS` drift apart. |
| 5 | A | done | NAV_ORDER is the ten specified, in order, with the comment. |
| 6 | A | done | See "helpers filtered" below. |
| 7 | A | done | `robots: { index: false, follow: true }` when hidden **or** empty. Self-clearing — verified by building a one-article corpus. |
| 8 | A | done | `/tag/<name>/` did **not** exist; built. Only tags with articles are emitted, `dynamicParams = false`, so an unused tag 404s. Article tag chips now link here instead of `/search?q=`. |
| 9 | A | done | Measured, not eyeballed — see below. |
| 10 | B | done | Five Next routes, copy verbatim, each with title/description/canonical/sitemap entry. |
| 11 | B | done | All eight removed. **They were not broken** — see disagreements. |
| 12 | B | done | Four columns; eleven desks incl. spotlight; no hidden desk; Krystal credit and copyright kept; no `/corrections/`. |
| 13 | C | done | Plugin 2.1.0. |
| 14 | C | done | adapter + schema + types + card projection. Unrecognised values coerced to `''` with a `console.warn`. |
| 15 | C | done | Band above the headline in all three states; pill on cards. |
| 16 | C | done | `sponsored noopener` for paid/advertorial only; `noopener` elsewhere; no `nofollow` anywhere. |
| 17 | C | done | Permanent, above the list, not conditional on the desk having articles. |
| 18 | D | done | Applied. The "current" values in the work order were already wrong — see disagreements. |
| 19 | D | done | 879,466 B → 32 KB of derived assets. See `brand/README.md`. |
| 20 | D | done | `#8E1B9C`. |
| 21 | E | done | `site.social` object; `activeSocial` derives the live list. |
| 22 | E | done | Fourth footer column, Persian aria-labels; heading hidden when no channel is live. |
| 23 | E | done | `FollowRow` under the article body. |
| 24 | F | done | Built from `site.url` + path; verified in the export. |
| 25 | F | done | LinkedIn removed, WhatsApp added, email and copy-link kept. |
| 26 | F | done | Tags and «پربازدیدترین» guarded; whole-site sweep finds zero headings with nothing under them. |
| 27 | F | done | Derived from the visible desks. |
| 28 | F | done | Verified by rendered glyph position with a control. |
| 29 | F | done | One flag in `lib/features.ts`; route parked in a private folder. |
| 30 | G | done | Copy verbatim; posture audited (see below). |
| 31 | H | **partial** | The pipeline half ran and passed against a stubbed REST response. Publishing the two posts in wp-admin needs the publisher's credentials — I have none, and publishing to a live CMS is not something I will do unasked. |
| 32 | H | done | `git ls-files content/articles/` → `content/articles/.gitkeep` only. `content/articles/*.json` is gitignored, so it was already clean. |
| 33 | H | done | Block pasted in the report. |
| 34 | H | done | 45 URLs, no hidden desk, all `https://theukmag.com`. |

## Helpers filtered for hidden desks (Task 6)

`visibleArticles` in `src/lib/articles.ts` backs: `getAllArticles`, `getLatest`,
`getTrending`, `getMostRead` (unscoped), `getEditorsPicks`, `getInDepth`,
`getLeadStory`, `getHeroSupport`, `getByKind`, `getByCategories`, `getRelated`,
`getAdjacent`, `getArticlesByTag`, `getAllTags`/`getPopularTags`,
`getCategoryCounts`, `searchArticles`. `buildSearchIndex` reads
`getAllArticles`, so site search and the overlay are covered. The breaking-news
bar is filtered in `lib/content/load.ts`. The homepage `sports` section is gone.

Deliberate exceptions: `getArticlesByCategory`, `getArticleBySlug` and
`getMostRead(limit, slug)` read the full corpus, so a hidden desk's own page
and its article URLs still resolve.

Confirmed against the build: a `sports` article reaches no homepage feed, no
navigation, no footer, no sitemap entry, and its desk and article pages are
`noindex, follow`.
