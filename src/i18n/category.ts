import type { CardCategory } from '@/lib/types';
import type { Locale } from '@/i18n/dictionaries';

/** Desk name in the active interface language. */
export function categoryName(category: CardCategory, locale: Locale): string {
  return locale === 'fa' ? category.nameFa : category.name;
}

/** Short desk label — used in nav, chips and card kickers. */
export function categoryShortName(category: CardCategory, locale: Locale): string {
  return locale === 'fa' ? category.shortNameFa : category.shortName;
}
