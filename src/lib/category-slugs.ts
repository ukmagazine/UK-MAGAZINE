/**
 * Category slug contract shared by WordPress, schema validation and routing.
 *
 * The nine primary slugs are the values Make.com maps to WordPress category
 * ids. Changing any of them is a breaking pipeline change. The four legacy
 * desks remain routable for old URLs but are intentionally excluded from the
 * primary navigation.
 */
export const PRIMARY_CATEGORY_SLUGS = [
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

export const LEGACY_CATEGORY_SLUGS = ['ai', 'education', 'science', 'environment'] as const;

export const CATEGORY_SLUGS = [
  ...PRIMARY_CATEGORY_SLUGS,
  ...LEGACY_CATEGORY_SLUGS,
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const CATEGORY_SLUG_SET: ReadonlySet<string> = new Set(CATEGORY_SLUGS);
