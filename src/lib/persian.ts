/**
 * Persian text normalisation for search and matching.
 *
 * Persian is typed inconsistently, and a naïve `includes()` misses matches a
 * reader would consider obvious. The same word can be written several ways:
 *
 *   - ی (U+06CC, Persian yeh) vs ي (U+064A, Arabic yeh) vs ى (U+0649)
 *   - ک (U+06A9, Persian kaf) vs ك (U+0643, Arabic kaf)
 *   - آ / أ / إ vs ا, and ة vs ه
 *   - «می‌رود» with a zero-width non-joiner vs «میرود» without one
 *   - ۱۲۳ (Persian) vs ١٢٣ (Arabic-Indic) vs 123 (Latin)
 *   - optional harakat (َ ُ ِ ّ ْ) that almost nobody types
 *
 * Keyboards, phones and AI-generated copy each pick differently, so the corpus
 * and the query routinely disagree. Both sides are folded through this function
 * before comparison, which makes the mismatch invisible to the reader.
 */

const ARABIC_INDIC_ZERO = 0x0660;
const PERSIAN_ZERO = 0x06f0;

export function normalizePersian(input: string): string {
  return (
    input
      // Letter variants → their Persian form.
      .replace(/[يىېے]/g, 'ی') // ي ى ې ے → ی
      .replace(/[كڪګ]/g, 'ک') // ك ڪ ګ → ک
      .replace(/[أإآٱ]/g, 'ا') // أ إ آ ٱ → ا
      .replace(/ة/g, 'ه') // ة → ه
      .replace(/ؤ/g, 'و') // ؤ → و
      .replace(/ئ/g, 'ی') // ئ → ی, so «مسئول» also matches «مسیول»
      // Diacritics: harakat, tanwin, shadda, sukun, superscript alef, tatweel.
      .replace(/[ً-ْٰـ]/g, '')
      // Zero-width joiners and the BOM. Removing the ZWNJ makes «می‌رود» and
      // «میرود» identical, which is the mismatch readers actually hit.
      .replace(/[​-‍﻿]/g, '')
      // Digits → Latin, so ۱۴۰۵ and 1405 match.
      .replace(/[٠-٩]/g, (d) =>
        String.fromCharCode(d.charCodeAt(0) - ARABIC_INDIC_ZERO + 48),
      )
      .replace(/[۰-۹]/g, (d) =>
        String.fromCharCode(d.charCodeAt(0) - PERSIAN_ZERO + 48),
      )
      // Latin case folding, for the English terms that appear in Persian copy.
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/** Split a query into normalised, non-empty search terms. */
export function normalizeTerms(query: string): string[] {
  return normalizePersian(query).split(' ').filter(Boolean);
}
