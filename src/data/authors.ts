import { CATEGORY_SLUGS } from '@/lib/category-slugs';
import type { Author } from '@/lib/types';
import { site } from '@/data/site';

/**
 * The house byline.
 *
 * Stories are produced by the publication's own automated newsroom, so they
 * carry the publication's name rather than an individual's. Inventing a named
 * reporter for machine-written copy would attribute the work to a person who
 * did not do it — the masthead is the honest byline, and it is what the
 * structured data reports too (an Organization, not a Person).
 *
 * The `Author` shape is kept because every listing, card and article page
 * already reads a byline through it; there is simply one entry now.
 */
export const authors: Author[] = [
  {
    id: 'ukmagazine',
    name: site.name,
    initials: site.wordmark.lead,
    role: 'تحریریه',
    bio: site.shortDescription,
    location: 'لندن',
    beats: [...CATEGORY_SLUGS],
  },
];

/** The single house byline. */
export const houseByline: Author = authors[0];

/**
 * The byline for any article.
 *
 * It takes no id on purpose: WordPress supplies whatever user slug the
 * automation happens to post under, and none of those should ever surface as a
 * reporter's name.
 */
export function getAuthor(): Author {
  return houseByline;
}
