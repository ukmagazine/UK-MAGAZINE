import { getAllArticles } from '@/lib/articles';

/**
 * The minimal shape the search overlay needs.
 *
 * Building this projection on the server keeps article bodies out of the
 * client bundle — the overlay ships a few kilobytes of index, not the corpus.
 */
export interface SearchPreviewItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  categoryName: string;
  categoryShortName: string;
  publishedAt: string;
}

export function buildSearchIndex(): SearchPreviewItem[] {
  return getAllArticles().map((article) => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    tags: article.tags,
    categoryName: article.categoryRef.name,
    categoryShortName: article.categoryRef.shortName,
    publishedAt: article.publishedAt,
  }));
}
