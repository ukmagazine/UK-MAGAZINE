import type { CardCategory } from '@/lib/types';

/**
 * Desk labels.
 *
 * The publication ships in Persian only, so the desk names in `data/categories`
 * are already the reader-facing strings and these are pass-throughs. They are
 * kept — rather than inlined at the dozen call sites — because they are the
 * seam a second language would come back through: only these two functions
 * would need to take a locale and branch again.
 */

/** Desk name, as shown to the reader. */
export function categoryName(category: CardCategory): string {
  return category.name;
}

/** Short desk label — used in nav, chips and card kickers. */
export function categoryShortName(category: CardCategory): string {
  return category.shortName;
}
