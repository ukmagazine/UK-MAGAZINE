/**
 * Publication-wide configuration.
 *
 * Canonical URLs, Open Graph, sitemap and shared footer metadata read from this
 * single object. Values that have not been supplied by the publisher stay
 * empty/null and the UI omits them instead of inventing placeholder data.
 */
export const site = {
  name: 'UK MAGAZINE',
  wordmark: { lead: 'UK', trail: 'MAGAZINE' },
  tagline: 'جهان، در کانون توجه.',
  description:
    'یو‌کی مگزین یک نشریهٔ فارسی‌زبان برای ایرانیان بریتانیاست که جهان، سیاست، اقتصاد، فناوری، فرهنگ، سلامت، جامعه، ورزش و رویدادها را پوشش می‌دهد.',
  shortDescription:
    'خبرها و گزارش‌های فارسی برای ایرانیان بریتانیا، با تمرکز بر موضوعاتی که بر زندگی روزمره اثر می‌گذارند.',
  url: 'https://theukmag.com',
  locale: 'fa_IR',
  founded: null as number | null,
  established: '',
  email: '',
  social: [] as Array<{
    label: string;
    handle: string;
    href: string;
    icon: 'x' | 'linkedin' | 'youtube' | 'rss';
  }>,
  /**
   * Provisional contractual hosting credit. Keep the three fields here so the
   * final wording/URL/rel requested by Krystal can be changed in one place.
   */
  hostingCredit: {
    label: 'میزبانی توسط Krystal',
    href: 'https://krystal.io',
    rel: 'noopener',
  },
  footer: {
    company: [
      { label: 'دربارهٔ ما', href: '/about' },
      { label: 'تحریریه', href: '/about#newsroom' },
      { label: 'اصول و اخلاق حرفه‌ای', href: '/about#standards' },
      { label: 'فرصت‌های شغلی', href: '/about#careers' },
    ],
    legal: [
      { label: 'شرایط استفاده', href: '/about#terms' },
      { label: 'سیاست حریم خصوصی', href: '/about#privacy' },
      { label: 'تنظیمات کوکی', href: '/about#cookies' },
      { label: 'اصلاحیه‌ها', href: '/about#corrections' },
      { label: 'دسترس‌پذیری', href: '/about#accessibility' },
    ],
  },
} as const;

export type Site = typeof site;
