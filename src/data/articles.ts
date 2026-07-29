import type { Article, BreakingItem } from '@/lib/types';
import { aiArticles } from './articles/ai';
import { businessArticles } from './articles/business';
import { cultureArticles } from './articles/culture';
import { educationArticles } from './articles/education';
import { environmentArticles } from './articles/environment';
import { healthArticles } from './articles/health';
import { politicsArticles } from './articles/politics';
import { scienceArticles } from './articles/science';
import { technologyArticles } from './articles/technology';
import { worldArticles } from './articles/world';

/**
 * The full corpus, newest first.
 *
 * To add a story: append it to the relevant desk file in `src/data/articles/`.
 * Nothing else needs to change — routes, sitemap, search and every listing are
 * derived from this array.
 */
export const articles: Article[] = [
  ...aiArticles,
  ...educationArticles,
  ...technologyArticles,
  ...politicsArticles,
  ...worldArticles,
  ...businessArticles,
  ...scienceArticles,
  ...cultureArticles,
  ...healthArticles,
  ...environmentArticles,
].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

/** Headlines rotating in the breaking-news strip beneath the header. */
export const breakingItems: BreakingItem[] = [
  {
    id: 'br-1',
    text: 'Procurement bill clears committee with its transparency clause unchanged',
    href: '/article/committee-amendment-procurement-bill',
    timestamp: articles.find((a) => a.id === 'pol-01')?.publishedAt ?? '',
  },
  {
    id: 'br-2',
    text: 'Central bank holds rates for a third meeting, citing data quality',
    href: '/article/central-bank-hold-labour-market',
    timestamp: articles.find((a) => a.id === 'biz-01')?.publishedAt ?? '',
  },
  {
    id: 'br-3',
    text: 'Grid operators report interconnection backlogs falling after queue reform',
    href: '/article/interconnection-queue-reform-results',
    timestamp: articles.find((a) => a.id === 'env-01')?.publishedAt ?? '',
  },
  {
    id: 'br-4',
    text: 'Rerouted shipping now a planning assumption, not an emergency',
    href: '/article/shipping-corridor-rerouting-costs',
    timestamp: articles.find((a) => a.id === 'world-01')?.publishedAt ?? '',
  },
  {
    id: 'br-5',
    text: 'Satellite operators agree a shared orbital debris catalogue',
    href: '/article/orbital-debris-tracking-consortium',
    timestamp: articles.find((a) => a.id === 'sci-01')?.publishedAt ?? '',
  },
];
