import { articles } from '@/data/articles';
import { getAuthor } from '@/data/authors';
import { categories, getCategory } from '@/data/categories';
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

/** Attach the author and category records an article refers to by id. */
export function resolve(article: Article): ResolvedArticle {
  const author = getAuthor(article.authorId);
  const categoryRef = getCategory(article.category);

  if (!author) throw new Error(`Unknown author "${article.authorId}" on article "${article.id}"`);
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
      nameFa: article.categoryRef.nameFa,
      shortNameFa: article.categoryRef.shortNameFa,
    },
  };
}

export function toCardArticles(list: ResolvedArticle[]): CardArticle[] {
  return list.map(toCardArticle);
}

/** Every article, newest first. */
export function getAllArticles(): ResolvedArticle[] {
  return resolveAll(articles);
}

export function getArticleBySlug(slug: string): ResolvedArticle | undefined {
  const match = articles.find((article) => article.slug === slug);
  return match ? resolve(match) : undefined;
}

export function getArticleById(id: string): ResolvedArticle | undefined {
  const match = articles.find((article) => article.id === id);
  return match ? resolve(match) : undefined;
}

export function getArticlesByCategory(slug: CategorySlug, limit?: number): ResolvedArticle[] {
  const list = articles.filter((article) => article.category === slug);
  return resolveAll(typeof limit === 'number' ? list.slice(0, limit) : list);
}

/** The lead story for the homepage hero. */
export function getLeadStory(): ResolvedArticle {
  const lead = articles.find((article) => article.featured) ?? articles[0];
  return resolve(lead);
}

/** Supporting stories shown beside the hero lead. */
export function getHeroSupport(count = 3): ResolvedArticle[] {
  const lead = getLeadStory();
  return resolveAll(
    articles.filter((article) => article.featured && article.id !== lead.id).slice(0, count),
  );
}

export function getLatest(limit = 8, excludeIds: string[] = []): ResolvedArticle[] {
  return resolveAll(
    articles.filter((article) => !excludeIds.includes(article.id)).slice(0, limit),
  );
}

export function getTrending(limit = 5): ResolvedArticle[] {
  return resolveAll(articles.filter((article) => article.trending).slice(0, limit));
}

/** Ranked by readership — powers the numbered "Most read" list. */
export function getMostRead(limit = 5, categorySlug?: CategorySlug): ResolvedArticle[] {
  const pool = categorySlug
    ? articles.filter((article) => article.category === categorySlug)
    : articles;
  return resolveAll([...pool].sort((a, b) => b.reads - a.reads).slice(0, limit));
}

export function getEditorsPicks(limit = 4): ResolvedArticle[] {
  return resolveAll(articles.filter((article) => article.editorsPick).slice(0, limit));
}

export function getInDepth(limit = 3): ResolvedArticle[] {
  return resolveAll(articles.filter((article) => article.inDepth).slice(0, limit));
}

export function getByKind(kind: Article['kind'], limit = 4): ResolvedArticle[] {
  return resolveAll(articles.filter((article) => article.kind === kind).slice(0, limit));
}

/** Stories from several desks at once, for combined homepage sections. */
export function getByCategories(slugs: CategorySlug[], limit = 6): ResolvedArticle[] {
  return resolveAll(articles.filter((article) => slugs.includes(article.category)).slice(0, limit));
}

/**
 * Related stories: explicit relations first, then same-desk fallbacks so the
 * slot is always filled.
 */
export function getRelated(article: Article, limit = 3): ResolvedArticle[] {
  const explicit = article.relatedIds
    .map((id) => articles.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is Article => Boolean(candidate));

  const seen = new Set([article.id, ...explicit.map((item) => item.id)]);
  const fallback = articles.filter(
    (candidate) => candidate.category === article.category && !seen.has(candidate.id),
  );

  return resolveAll([...explicit, ...fallback].slice(0, limit));
}

/** Previous / next in publication order, for article footer navigation. */
export function getAdjacent(article: Article): {
  previous?: ResolvedArticle;
  next?: ResolvedArticle;
} {
  const index = articles.findIndex((candidate) => candidate.id === article.id);
  if (index === -1) return {};

  const newer = index > 0 ? articles[index - 1] : undefined;
  const older = index < articles.length - 1 ? articles[index + 1] : undefined;

  return {
    previous: newer ? resolve(newer) : undefined,
    next: older ? resolve(older) : undefined,
  };
}

export function getArticlesByTag(tag: string, limit?: number): ResolvedArticle[] {
  const lower = tag.toLowerCase();
  const list = articles.filter((article) =>
    article.tags.some((candidate) => candidate.toLowerCase() === lower),
  );
  return resolveAll(typeof limit === 'number' ? list.slice(0, limit) : list);
}

/** Every distinct tag, most used first. Powers search suggestions. */
export function getPopularTags(limit = 12): string[] {
  const counts = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
}

/** Count per desk, used for the category chips on the search page. */
export function getCategoryCounts(): Array<{ slug: CategorySlug; name: string; count: number }> {
  return categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    count: articles.filter((article) => article.category === category.slug).length,
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

  const title = article.title.toLowerCase();
  const summary = article.summary.toLowerCase();
  const subtitle = article.subtitle.toLowerCase();
  const tags = article.tags.join(' ').toLowerCase();

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
 */
export function searchArticles({
  query,
  categorySlugs = [],
  range = 'any',
  sort = 'relevance',
}: SearchOptions): ResolvedArticle[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);

  const cutoff = range === 'any' ? 0 : Date.now() - RANGE_MS[range];

  const scored = articles
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
