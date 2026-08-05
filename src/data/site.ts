/**
 * Publication-wide configuration.
 *
 * Change the brand name, tagline, canonical URL and footer link groups here —
 * the header wordmark, metadata, structured data and sitemap all read from it.
 *
 * The publication is Persian-only; the wordmark stays in Latin because it is
 * the registered brand mark, which is normal practice for Persian mastheads.
 */
export const site = {
  name: 'UK MAGAZINE',
  /** Rendered as two weighted halves: bold lead, lighter trail. */
  wordmark: { lead: 'UK', trail: 'MAGAZINE' },
  tagline: 'جهان، در کانون توجه.',
  description:
    'یو‌کی مگزین یک نشریهٔ مستقل بین‌المللی است که هوش مصنوعی، آموزش، فناوری، سیاست، رویدادهای جهان، اقتصاد، علم، فرهنگ، سلامت و محیط زیست را پوشش می‌دهد — با گزارشی روشن و بی‌حاشیه.',
  shortDescription: 'گزارش‌های روشن و بی‌شتاب از نیروهایی که جهان را دگرگون می‌کنند.',
  /** Interim GitHub Pages origin; replace when the custom domain launches. */
  url: 'https://uniquensr.github.io/UK-MAGAZINE',
  locale: 'fa_IR',
  founded: null,
  established: '',
  email: '',
  social: [] as Array<{
    label: string;
    handle: string;
    href: string;
    icon: 'x' | 'linkedin' | 'youtube' | 'rss';
  }>,
  footer: {
    company: [
      { label: 'دربارهٔ ما', href: '/about' },
      { label: 'تحریریه', href: '/about#newsroom' },
      { label: 'اصول و اخلاق حرفه‌ای', href: '/about#standards' },
      { label: 'فرصت‌های شغلی', href: '/about#careers' },
      { label: 'تماس با ما', href: '/about#contact' },
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
