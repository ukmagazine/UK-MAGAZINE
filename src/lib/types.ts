/**
 * Core domain models for the UK MAGAZINE publication.
 *
 * Everything the interface renders is derived from these types, so adding a
 * field here surfaces compile errors at every place that needs updating.
 */

import type { CategorySlug } from '@/lib/category-slugs';
export type { CategorySlug } from '@/lib/category-slugs';

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Short label used where horizontal space is tight (nav, chips). */
  shortName: string;
  /** One-sentence description shown on the category landing page. */
  description: string;
  /** Longer positioning statement for the category hero. */
  standfirst: string;
  /**
   * Subtle per-category identity. Used only as a low-opacity wash behind the
   * category header and as the glyph tint — the brand purple remains the
   * publication colour.
   */
  tint: string;
  /** Topic filters offered on the category page. */
  topics: string[];
  /** Whether the category appears in the primary header navigation. */
  inPrimaryNav: boolean;
  /**
   * A hidden desk stays defined and routable but is kept out of the navigation
   * and the footer, and its category page is always `noindex` — even when it has
   * articles. Used for desks that are deliberately not being published yet.
   */
  hidden?: boolean;
}

export interface Author {
  id: string;
  name: string;
  /** Two-letter monogram rendered in the avatar tile. */
  initials: string;
  role: string;
  bio: string;
  location: string;
  /** Categories this journalist normally covers. */
  beats: CategorySlug[];
}

/** Article body is a typed block list rather than a raw HTML string. */
export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; id: string; text: string }
  | { type: 'quote'; text: string; attribution: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'image'; src: string; alt: string; caption: string }
  | { type: 'links'; title: string; items: ReadonlyArray<{ label: string; href: string }> };

/**
 * The structured summary that opens most UK MAGAZINE reports — our own
 * presentation system for concise, scannable journalism.
 */
export interface Briefing {
  whatHappened: string;
  whyItMatters: string;
  biggerPicture?: string;
  whatToWatch?: string;
  keyTakeaway: string;
}

/** Editorial treatment, which drives the card variant and badge. */
export type ArticleKind = 'report' | 'analysis' | 'opinion' | 'video' | 'breaking';

/**
 * Commercial-content disclosure.
 *
 * `paid` and `advertorial` both involve money: both carry a visible label and
 * both put `rel="sponsored"` on every outbound link in the body. `supported`
 * is a free spotlight feature chosen by the desk — it is labelled, but no
 * payment changed hands, so its links stay ordinary. Empty means editorial,
 * which is everything the automation produces; Make.com never sets this.
 */
export type SponsoredKind = 'paid' | 'advertorial' | 'supported' | '';

export interface Article {
  id: string;
  slug: string;
  title: string;
  /** Deck / subheadline shown under the headline on the article page. */
  subtitle: string;
  summary: string;
  category: CategorySlug;
  authorId: string;
  /** ISO 8601 timestamp. */
  publishedAt: string;
  updatedAt?: string;
  /** Minutes. */
  readingTime: number;
  image: string;
  imageAlt: string;
  imageCredit: string;
  featured: boolean;
  trending: boolean;
  editorsPick: boolean;
  inDepth: boolean;
  kind: ArticleKind;
  /** Set by a human in wp-admin only. See `SponsoredKind`. */
  sponsored: SponsoredKind;
  /** Relative popularity, used to rank the "Most read" list. */
  reads: number;
  briefing?: Briefing;
  keyFacts?: string[];
  body: ArticleBlock[];
  tags: string[];
  relatedIds: string[];
}

/** An article joined with its resolved author and category records. */
export interface ResolvedArticle extends Article {
  author: Author;
  categoryRef: Category;
}

/** The category fields a card needs — not the standfirst or topic list. */
export type CardCategory = Pick<Category, 'slug' | 'name' | 'shortName'>;

/** The author fields a card needs — not the full biography. */
export type CardAuthor = Pick<Author, 'id' | 'name' | 'initials' | 'role'>;

/**
 * The subset of an article a card actually renders.
 *
 * `ResolvedArticle` satisfies this structurally, so every server-rendered
 * listing keeps working. Client components that receive articles as props use
 * this narrower type instead, which keeps article bodies — and the repeated
 * author biographies and category standfirsts — out of the payload.
 */
export type CardArticle = Pick<
  Article,
  | 'id'
  | 'slug'
  | 'title'
  | 'summary'
  | 'category'
  | 'publishedAt'
  | 'readingTime'
  | 'image'
  | 'imageAlt'
  | 'kind'
  | 'sponsored'
  | 'tags'
  | 'reads'
> & {
  author: CardAuthor;
  categoryRef: CardCategory;
};

export interface Newsletter {
  id: string;
  name: string;
  cadence: string;
  description: string;
  sample: string;
  subscribers: string;
  /** Lucide icon name resolved by the newsletter page. */
  icon: 'brief' | 'ai' | 'education' | 'politics' | 'weekend';
}

export interface BreakingItem {
  id: string;
  text: string;
  href: string;
  timestamp: string;
}

export type SortOrder = 'newest' | 'oldest' | 'relevance' | 'most-read';

export type DateRange = 'any' | '24h' | 'week' | 'month' | 'year';
