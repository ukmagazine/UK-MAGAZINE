import { articles } from '@/data/articles';
import { getAuthor } from '@/data/authors';
import { categories, getCategory, isHiddenCategory } from '@/data/categories';
import { normalizePersian, normalizeTerms } from '@/lib/persian';
import type {
  Article,
  CardArticle,
  CategorySlug,
  DateRange,
  ResolvedArticle,
  SortOrder,
} from '@/lib/types';

/**
 * Query helpers over the local corpus.
 *
 * These are pure functions over an in-memory array — swapping in a real API
 * later means reimplementing this module and nothing else.
 */

/**
 * The corpus minus every article on a hidden desk.
 *
 * 🔴 Every discovery helper below reads THIS, not `articles`. Hiding a desk
 * from the navigation does nothing on its own: `getLeadStory` and friends draw
 * from the whole corpus, so a `sports` story would still have been eligible for
 * the homepage hero. `sports` in particular is hidden by editorial decision
 * while the automation upstream can still publish one, so emptiness is not
 * guaranteed and this filter is the thing that actually holds.
 *
 * The two deliberate exceptions are `getArticlesByCategory` and
 * `getArticleBySlug`: a hidden desk's own page and its article routes still
 * resolve, which is the entire point of keeping them defined. Nothing routes a
 * reader there who did not ask for it.
 */
const visibleArticles: Article[] = articles.filter(
  (article) => !isHiddenCategory(article.category),
);

/**
 * Attach the byline and category records an article refers to.
 *
 * The byline is always the publication's own — see `data/authors.ts` — so only
 * the category can fail to resolve, and that is a content error worth stopping
 * the build for.
 */
export function resolve(article: Article): ResolvedArticle {
  const author = getAuthor();
  const categoryRef = getCategory(article.category);

  if (!categoryRef) throw new Error(`Unknown category "${article.category}" on article "${article.id}"`);

  return { ...article, author, categoryRef };
}

export function resolveAll(list: Article[]): ResolvedArticle[] {
  return list.map(resolve);
}

/**
 * Strip an article down to the fields a card renders.
 *
 * Use this whenever articles are handed to a client component, so bodies,
 * briefings and key facts stay out of the serialised payload.
 */
export function toCardArticle(article: ResolvedArticle): CardArticle {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    category: article.category,
    publishedAt: article.publishedAt,
    readingTime: article.readingTime,
    image: article.image,
    imageAlt: article.imageAlt,
    kind: article.kind,
    sponsored: article.sponsored,
    tags: article.tags,
    reads: article.reads,
    author: {
      id: article.author.id,
      name: article.author.name,
      initials: article.author.initials,
      role: article.author.role,
    },
    categoryRef: {
      slug: article.categoryRef.slug,
      name: article.categoryRef.name,
      shortName: article.categoryRef.shortName,
    },
  };
}

export function toCardArticles(list: ResolvedArticle[]): CardArticle[] {
  return list.map(toCardArticle);
}

/** Every article a reader may be shown, newest first. Excludes hidden desks. */
export function getAllArticles(): ResolvedArticle[] {
  return resolveAll(visibleArticles);
}

/**
 * Article lookup by slug.
 *
 * Reads the full corpus on purpose: a hidden desk's articles keep working URLs,
 * because the desks are switched off for discovery, not deleted.
 */
export function getArticleBySlug(slug: string): ResolvedArticle | undefined {
  const match = articles.find((article) => article.slug === slug);
  return match ? resolve(match) : undefined;
}

export function getArticleById(id: string): ResolvedArticle | undefined {
  const match = articles.find((article) => article.id === id);
  return match ? resolve(match) : undefined;
}

/** A desk's own listing — the one place a hidden desk still lists its work. */
export function getArticlesByCategory(slug: CategorySlug, limit?: number): ResolvedArticle[] {
  const list = articles.filter((article) => article.category === slug);
  return resolveAll(typeof limit === 'number' ? list.slice(0, limit) : list);
}

/** The lead story for the homepage hero. */
export function getLeadStory(): ResolvedArticle | undefined {
  const lead = visibleArticles.find((article) => article.featured) ?? visibleArticles[0];
  return lead ? resolve(lead) : undefined;
}

/** Supporting stories shown beside the hero lead. */
export function getHeroSupport(count = 3, excludeId?: string): ResolvedArticle[] {
  return resolveAll(
    visibleArticles
      .filter((article) => article.featured && article.id !== excludeId)
      .slice(0, count),
  );
}

export function getLatest(limit = 8, excludeIds: string[] = []): ResolvedArticle[] {
  return resolveAll(
    visibleArticles.filter((article) => !excludeIds.includes(article.id)).slice(0, limit),
  );
}

/**
 * Editorial flags are a human's job, and the WordPress pipeline does not set
 * them: a feed of automated posts has `featured`, `trending`, `editorsPick` and
 * `inDepth` all false. Left unhandled that empties three homepage sections and
 * leaves their headings stranded over nothing.
 *
 * So each of these falls back to a signal we genuinely have, rather than to an
 * empty list. A human promoting stories in WordPress always wins; the fallback
 * only fills the gap until someone does.
 */

/** Flagged as trending, else simply the newest — what is moving right now. */
export function getTrending(limit = 5): ResolvedArticle[] {
  const flagged = visibleArticles.filter((article) => article.trending);
  const pool = flagged.length > 0 ? flagged : visibleArticles;
  return resolveAll(pool.slice(0, limit));
}

/**
 * Ranked by readership. With no analytics every `reads` is 0, so the secondary
 * sort by date is what actually orders the list — recency is a defensible
 * stand-in, and the numbers are never shown to the reader.
 *
 * Passing a `categorySlug` scopes it to that desk, including a hidden one: the
 * caller is a category page that has already decided the reader asked for it.
 */
export function getMostRead(limit = 5, categorySlug?: CategorySlug): ResolvedArticle[] {
  const pool = categorySlug
    ? articles.filter((article) => article.category === categorySlug)
    : visibleArticles;
  return resolveAll(
    [...pool]
      .sort((a, b) => b.reads - a.reads || Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
      .slice(0, limit),
  );
}

/**
 * Flagged picks, else the newest story from each desk — which gives the row the
 * spread across subjects that makes a picks rail worth reading.
 */
export function getEditorsPicks(limit = 4): ResolvedArticle[] {
  const flagged = visibleArticles.filter((article) => article.editorsPick);
  if (flagged.length > 0) return resolveAll(flagged.slice(0, limit));

  const seenDesks = new Set<CategorySlug>();
  const spread = visibleArticles.filter((article) => {
    if (seenDesks.has(article.category)) return false;
    seenDesks.add(article.category);
    return true;
  });
  return resolveAll(spread.slice(0, limit));
}

/**
 * Flagged long reads, else the longest — reading time is derived from the body,
 * so "in depth" is one of the few editorial judgements we can actually measure.
 */
export function getInDepth(limit = 3): ResolvedArticle[] {
  const flagged = visibleArticles.filter((article) => article.inDepth);
  if (flagged.length > 0) return resolveAll(flagged.slice(0, limit));

  return resolveAll(
    [...visibleArticles]
      .sort((a, b) => b.readingTime - a.readingTime)
      .slice(0, limit),
  );
}

export function getByKind(kind: Article['kind'], limit = 4): ResolvedArticle[] {
  return resolveAll(visibleArticles.filter((article) => article.kind === kind).slice(0, limit));
}

/** Stories from several desks at once, for combined homepage sections. */
export function getByCategories(slugs: CategorySlug[], limit = 6): ResolvedArticle[] {
  return resolveAll(
    visibleArticles.filter((article) => slugs.includes(article.category)).slice(0, limit),
  );
}

/**
 * Related stories: explicit relations first, then same-desk fallbacks so the
 * slot is always filled.
 *
 * Hidden desks are excluded from both halves — "related" is a recommendation,
 * and recommending a switched-off desk is exactly the leak Task 6 closes. On a
 * hidden desk's own article page that means the rail comes back empty, and
 * `RelatedStories` renders nothing rather than a stranded heading.
 */
export function getRelated(article: Article, limit = 3): ResolvedArticle[] {
  const explicit = article.relatedIds
    .map((id) => visibleArticles.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is Article => Boolean(candidate));

  const seen = new Set([article.id, ...explicit.map((item) => item.id)]);
  const fallback = visibleArticles.filter(
    (candidate) => candidate.category === article.category && !seen.has(candidate.id),
  );

  return resolveAll([...explicit, ...fallback].slice(0, limit));
}

/**
 * Previous / next in publication order, for article footer navigation.
 *
 * Walks the visible corpus, so the "older story" link never steps sideways onto
 * a hidden desk. An article on a hidden desk is not in that list and simply
 * gets no neighbours.
 */
export function getAdjacent(article: Article): {
  previous?: ResolvedArticle;
  next?: ResolvedArticle;
} {
  const index = visibleArticles.findIndex((candidate) => candidate.id === article.id);
  if (index === -1) return {};

  const newer = index > 0 ? visibleArticles[index - 1] : undefined;
  const older = index < visibleArticles.length - 1 ? visibleArticles[index + 1] : undefined;

  return {
    previous: newer ? resolve(newer) : undefined,
    next: older ? resolve(older) : undefined,
  };
}

export function getArticlesByTag(tag: string, limit?: number): ResolvedArticle[] {
  const wanted = normalizePersian(tag);
  const list = visibleArticles.filter((article) =>
    article.tags.some((candidate) => normalizePersian(candidate) === wanted),
  );
  return resolveAll(typeof limit === 'number' ? list.slice(0, limit) : list);
}

/** Every distinct tag on a visible desk, most used first. */
export function getAllTags(): string[] {
  const counts = new Map<string, number>();
  for (const article of visibleArticles) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

/** Every distinct tag, most used first. Powers search suggestions. */
export function getPopularTags(limit = 12): string[] {
  return getAllTags().slice(0, limit);
}

/** Count per desk, used for the category chips on the search page. */
export function getCategoryCounts(): Array<{ slug: CategorySlug; name: string; count: number }> {
  return categories
    .filter((category) => !category.hidden)
    .map((category) => ({
      slug: category.slug,
      name: category.name,
      count: visibleArticles.filter((article) => article.category === category.slug).length,
    }));
}

// ------------------------------------------------------------------ //
// Search
// ------------------------------------------------------------------ //

export interface SearchOptions {
  query: string;
  categorySlugs?: CategorySlug[];
  range?: DateRange;
  sort?: SortOrder;
}

const RANGE_MS: Record<Exclude<DateRange, 'any'>, number> = {
  '24h': 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
};

function scoreArticle(article: Article, terms: string[]): number {
  if (terms.length === 0) return 1;

  const title = normalizePersian(article.title);
  const summary = normalizePersian(article.summary);
  const subtitle = normalizePersian(article.subtitle);
  const tags = normalizePersian(article.tags.join(' '));

  let score = 0;
  for (const term of terms) {
    if (title.includes(term)) score += 10;
    if (subtitle.includes(term)) score += 4;
    if (summary.includes(term)) score += 3;
    if (tags.includes(term)) score += 5;
    if (article.category.includes(term)) score += 2;
  }
  return score;
}

/**
 * Search the corpus. Scoring is intentionally simple and readable — it ranks
 * title and tag matches above body matches, which is what readers expect.
 *
 * Searches the visible corpus only: site search is discovery.
 */
export function searchArticles({
  query,
  categorySlugs = [],
  range = 'any',
  sort = 'relevance',
}: SearchOptions): ResolvedArticle[] {
  const terms = normalizeTerms(query);

  const cutoff = range === 'any' ? 0 : Date.now() - RANGE_MS[range];

  const scored = visibleArticles
    .filter((article) => {
      if (categorySlugs.length > 0 && !categorySlugs.includes(article.category)) return false;
      if (cutoff > 0 && Date.parse(article.publishedAt) < cutoff) return false;
      return true;
    })
    .map((article) => ({ article, score: scoreArticle(article, terms) }))
    .filter((entry) => entry.score > 0);

  scored.sort((a, b) => {
    switch (sort) {
      case 'newest':
        return Date.parse(b.article.publishedAt) - Date.parse(a.article.publishedAt);
      case 'oldest':
        return Date.parse(a.article.publishedAt) - Date.parse(b.article.publishedAt);
      case 'most-read':
        return b.article.reads - a.article.reads;
      case 'relevance':
      default:
        return (
          b.score - a.score ||
          Date.parse(b.article.publishedAt) - Date.parse(a.article.publishedAt)
        );
    }
  });

  return resolveAll(scored.map((entry) => entry.article));
}
