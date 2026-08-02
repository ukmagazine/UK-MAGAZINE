import { normalizePersian } from '@/lib/persian';

/**
 * Persian → Latin slugs.
 *
 * WordPress derives a post's slug from its title, and a Persian title yields a
 * percent-encoded slug:
 *
 *   صف اتصال به شبکه  →  %d8%b5%d9%81-%d8%a7%d8%aa%d8%b5%d8%a7%d9%84-…
 *
 * That is the default behaviour, not an edge case, and such a URL is unreadable
 * the moment anyone copies it. Rather than reject every post whose slug the
 * editor did not set by hand, we transliterate.
 *
 * The mapping is the common Persian romanisation — not reversible, and not
 * trying to be. A slug only has to be stable, readable and unique.
 */

const LETTERS: Record<string, string> = {
  ا: 'a', آ: 'a', أ: 'a', إ: 'a', ء: '',
  ب: 'b', پ: 'p', ت: 't', ث: 's',
  ج: 'j', چ: 'ch', ح: 'h', خ: 'kh',
  د: 'd', ذ: 'z', ر: 'r', ز: 'z', ژ: 'zh',
  س: 's', ش: 'sh', ص: 's', ض: 'z',
  ط: 't', ظ: 'z',
  // Ayn and hamza carry no Latin sound worth spelling in a URL.
  ع: '', غ: 'gh',
  ف: 'f', ق: 'gh', ک: 'k', گ: 'g',
  ل: 'l', م: 'm', ن: 'n',
  و: 'v', ه: 'h', ی: 'y',
  // Persian and Arabic-Indic digits.
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
  '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
};

/** Already a clean Latin slug? Then leave it exactly as the editor set it. */
const LATIN_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** WordPress percent-encodes non-Latin slugs; get back to the characters. */
export function decodeSlug(input: string): string {
  try {
    return input.includes('%') ? decodeURIComponent(input) : input;
  } catch {
    return input;
  }
}

/**
 * True when the slug is already usable as-is — i.e. an editor set it by hand.
 * Those are left alone; anything else is transliterated and disambiguated.
 */
export function isLatinSlug(input: string): boolean {
  return LATIN_SLUG.test(input);
}

/**
 * Build a URL-safe slug from arbitrary text.
 *
 * `fallback` is used when transliteration leaves nothing usable — a title made
 * only of punctuation or an unsupported script.
 */
export function toLatinSlug(input: string, fallback: string): string {
  const text = decodeSlug(input);
  if (LATIN_SLUG.test(text)) return text;

  const normalised = normalizePersian(text);

  let out = '';
  for (const char of normalised) {
    if (/[a-z0-9]/.test(char)) {
      out += char;
    } else if (char in LETTERS) {
      out += LETTERS[char];
    } else {
      // Spaces, punctuation and anything unmapped become a separator.
      out += '-';
    }
  }

  out = out
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    // Keep URLs and filenames a sensible length, breaking on a word boundary.
    .slice(0, 70)
    .replace(/-[^-]*$/, (tail) => (out.length > 70 ? '' : tail))
    .replace(/^-+|-+$/g, '');

  return out.length > 0 ? out : fallback;
}
