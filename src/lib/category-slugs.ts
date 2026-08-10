/**
 * Category slug contract shared by WordPress, schema validation and routing.
 *
 * The nine automated slugs are the values Make.com maps to WordPress category
 * ids. Changing any of them is a breaking pipeline change — `sports` included:
 * it is hidden from readers by an editorial decision, not removed, and the
 * automation upstream can still categorise a story as Sports.
 *
 * `guide`, `travel` and `spotlight` are written by hand in wp-admin, so they
 * are not part of the Make.com lookup, but they still have to be valid values
 * for the schema and the router.
 */
export const AUTOMATED_CATEGORY_SLUGS = [
  'world',
  'politics',
  'business',
  'technology',
  'culture',
  'health',
  'society',
  'sports',
  'event',
] as const;

/** Desks a human writes directly in WordPress. */
export const MANUAL_CATEGORY_SLUGS = ['guide', 'travel', 'spotlight'] as const;

/**
 * Desks that stay defined and routable but are kept out of the navigation and
 * the footer, and are always `noindex`. They are not deleted because switching
 * them on later costs less than re-adding them. See `hidden` in `Category`.
 */
export const HIDDEN_CATEGORY_SLUGS = ['sports', 'ai', 'education', 'science'] as const;

/** Desks with no content pipeline at all. Hidden, but still routable. */
export const DORMANT_CATEGORY_SLUGS = ['ai', 'education', 'science'] as const;

export const CATEGORY_SLUGS = [
  ...AUTOMATED_CATEGORY_SLUGS,
  ...MANUAL_CATEGORY_SLUGS,
  ...DORMANT_CATEGORY_SLUGS,
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const CATEGORY_SLUG_SET: ReadonlySet<string> = new Set(CATEGORY_SLUGS);

/**
 * Cheap membership test that does not import `data/categories`.
 *
 * The corpus loader needs to drop hidden desks out of the breaking-news bar,
 * and it runs before the category records are built — so it reads the slug
 * list rather than the `hidden` flag. The two are kept in step by
 * `data/categories.ts`, which sets `hidden: true` from exactly this list.
 */
export const HIDDEN_CATEGORY_SLUG_SET: ReadonlySet<string> = new Set(HIDDEN_CATEGORY_SLUGS);
