import type { CardArticle, CategorySlug, DateRange, SortOrder } from '@/lib/types';

/**
 * Search and filtering that runs in the browser.
 *
 * This module deliberately imports no data. The client receives a card-shaped
 * projection as a prop, so article bodies never enter the JavaScript bundle —
 * see `searchArticles` in `lib/articles.ts` for the server-side equivalent.
 */

const RANGE_MS: Record<Exclude<DateRange, 'any'>, number> = {
  '24h': 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
};

export function scoreCard(article: CardArticle, terms: string[]): number {
  if (terms.length === 0) return 1;

  const title = article.title.toLowerCase();
  const summary = article.summary.toLowerCase();
  const tags = article.tags.join(' ').toLowerCase();
  const category = article.categoryRef.name.toLowerCase();

  let score = 0;
  for (const term of terms) {
    if (title.includes(term)) score += 10;
    if (tags.includes(term)) score += 5;
    if (summary.includes(term)) score += 3;
    if (category.includes(term)) score += 2;
  }
  return score;
}

export interface CardSearchOptions {
  query: string;
  categorySlugs?: CategorySlug[];
  range?: DateRange;
  sort?: SortOrder;
  /** Injected in tests; defaults to the current time. */
  now?: number;
}

export function searchCards(
  articles: CardArticle[],
  { query, categorySlugs = [], range = 'any', sort = 'relevance', now = Date.now() }: CardSearchOptions,
): CardArticle[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const cutoff = range === 'any' ? 0 : now - RANGE_MS[range];

  const scored = articles
    .filter((article) => {
      if (categorySlugs.length > 0 && !categorySlugs.includes(article.category)) return false;
      if (cutoff > 0 && Date.parse(article.publishedAt) < cutoff) return false;
      return true;
    })
    .map((article) => ({ article, score: scoreCard(article, terms) }))
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

  return scored.map((entry) => entry.article);
}
