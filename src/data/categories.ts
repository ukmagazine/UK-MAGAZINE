import type { Category, CategorySlug } from '@/lib/types';

/**
 * The ten desks the publication reports on.
 *
 * To add a desk: append an entry here, set `inPrimaryNav` to control whether it
 * appears in the header, and tag articles with the new slug. Routes, sitemap
 * entries and filters are all generated from this list.
 *
 * Slugs stay Latin because they are URL segments; every reader-facing string is
 * Persian.
 */
export const categories: Category[] = [
  {
    slug: 'ai',
    name: 'هوش مصنوعی',
    shortName: 'هوش مصنوعی',
    description: 'عرضهٔ مدل‌ها، پژوهش، مقررات و اقتصادِ هوش ماشینی.',
    standfirst:
      'هوش مصنوعی را هم به‌عنوان یک صنعت می‌بینیم و هم یک نهاد — اینکه این سامانه‌ها واقعاً چه می‌توانند بکنند، چه کسی آنها را در اختیار دارد، و با ورودشان به محیط‌های کار معمولی چه چیزی تغییر می‌کند.',
    tint: '#D3122A',
    topics: ['پژوهش', 'سیاست‌گذاری', 'تراشه', 'ایمنی', 'کار', 'متن‌باز'],
    inPrimaryNav: false,
  },
  {
    slug: 'education',
    name: 'آموزش',
    shortName: 'آموزش',
    description: 'مدرسه، دانشگاه، فناوری آموزشی و سیاستی که به آنها شکل می‌دهد.',
    standfirst:
      'آموزش را از کلاس درس تا فرمول بودجه دنبال می‌کنیم: چه چیزی سنجیده می‌شود، چه چیزی سنجیده نمی‌شود، و تصمیم‌های امروز چند سال بعد به چه نتیجه‌ای می‌رسند.',
    tint: '#B4552A',
    topics: ['مدرسه', 'دانشگاه', 'بودجه', 'ارزیابی', 'معلم', 'دسترسی'],
    inPrimaryNav: false,
  },
  {
    slug: 'technology',
    name: 'فناوری',
    shortName: 'فناوری',
    description: 'زیرساخت، نیمه‌هادی، نرم‌افزار و شرکت‌هایی که آنها را می‌سازند.',
    standfirst:
      'فناوری را از منظر زیرساخت پوشش می‌دهیم، نه محصول: چه چیزی ساخته می‌شود، با چه هزینه‌ای، و چه کسی وقتی از کار می‌افتد پاسخ‌گوست.',
    tint: '#2E5AAC',
    topics: ['نیمه‌هادی', 'ابر', 'امنیت', 'زیرساخت', 'مقررات', 'داده'],
    inPrimaryNav: true,
  },
  {
    slug: 'politics',
    name: 'سیاست',
    shortName: 'سیاست',
    description: 'قانون‌گذاری، کمیسیون‌ها، انتخابات و سازوکار تصمیم‌گیری عمومی.',
    standfirst:
      'روند قانون‌گذاری را از پیش‌نویس تا رأی نهایی گزارش می‌کنیم و توضیح می‌دهیم چه چیزی در متن تغییر کرده است — نه اینکه چه کسی در بازی برنده شده.',
    tint: '#4A4A52',
    topics: ['قانون‌گذاری', 'انتخابات', 'بودجه', 'شفافیت', 'کمیسیون', 'سیاست عمومی'],
    inPrimaryNav: true,
  },
  {
    slug: 'world',
    name: 'جهان',
    shortName: 'جهان',
    description: 'دیپلماسی، تجارت، مرزها و رویدادهایی که از یک کشور فراتر می‌روند.',
    standfirst:
      'خبرنگاران ما از محل رویداد گزارش می‌دهند. آنجا که به کار رسانه‌ای دیگر تکیه می‌کنیم، نامش را می‌بریم و به آن پیوند می‌دهیم.',
    tint: '#1F6F6B',
    topics: ['دیپلماسی', 'تجارت', 'مهاجرت', 'امنیت', 'زنجیرهٔ تأمین', 'مرز'],
    inPrimaryNav: true,
  },
  {
    slug: 'business',
    name: 'اقتصاد',
    shortName: 'اقتصاد',
    description: 'بانک مرکزی، بازار کار، سیاست صنعتی و ترازنامهٔ شرکت‌ها.',
    standfirst:
      'اقتصاد را با اعداد گزارش می‌کنیم، نه با پیش‌بینی. ترازنامه را به بیانیهٔ مطبوعاتی ترجیح می‌دهیم.',
    tint: '#1D6B3F',
    topics: ['بانک مرکزی', 'بازار کار', 'تورم', 'صنعت', 'سرمایه‌گذاری', 'تجارت'],
    inPrimaryNav: true,
  },
  {
    slug: 'science',
    name: 'علم',
    shortName: 'علم',
    description: 'پژوهش پایه، فضا، زیرساخت علمی و روش‌شناسی.',
    standfirst:
      'مقالهٔ اصلی را می‌خوانیم، نه خلاصهٔ خبری آن را. آنجا که یافته‌ای هنوز بازآزمایی نشده، همین را می‌نویسیم.',
    tint: '#5A3E9B',
    topics: ['فضا', 'پژوهش', 'روش‌شناسی', 'آزمایشگاه', 'بازآزمایی', 'داده'],
    inPrimaryNav: true,
  },
  {
    slug: 'culture',
    name: 'فرهنگ',
    shortName: 'فرهنگ',
    description: 'نهادهای فرهنگی، اقتصاد هنر، معماری و میراث.',
    standfirst:
      'فرهنگ را هم به‌عنوان اثر می‌بینیم و هم به‌عنوان نهاد: چه کسی هزینه‌اش را می‌دهد، چه کسی به آن دسترسی دارد، و چه چیزی باقی می‌ماند.',
    tint: '#A32D6B',
    topics: ['موزه', 'معماری', 'میراث', 'هنر', 'مخاطب', 'بودجهٔ فرهنگی'],
    inPrimaryNav: true,
  },
  {
    slug: 'health',
    name: 'سلامت',
    shortName: 'سلامت',
    description: 'نظام درمان، سلامت عمومی، دارو و نیروی انسانی.',
    standfirst:
      'نظام سلامت را زیرساخت می‌دانیم: صف‌ها، بودجه‌ها و آدم‌هایی که آن را می‌گردانند.',
    tint: '#0F6E8C',
    topics: ['بیمارستان', 'سلامت عمومی', 'دارو', 'نیروی انسانی', 'بیمه', 'داده'],
    inPrimaryNav: false,
  },
  {
    slug: 'environment',
    name: 'محیط زیست',
    shortName: 'محیط زیست',
    description: 'انرژی، شبکهٔ برق، اقلیم و اقتصادِ سازگاری.',
    standfirst:
      'گذار انرژی را با داده‌های اپراتورهای شبکه دنبال می‌کنیم، نه با هدف‌گذاری‌های اعلام‌شده.',
    tint: '#3F7A34',
    topics: ['انرژی', 'شبکهٔ برق', 'اقلیم', 'تجدیدپذیر', 'سازگاری', 'آلودگی'],
    inPrimaryNav: false,
  },
];

const categoryIndex: Record<string, Category> = Object.fromEntries(
  categories.map((category) => [category.slug, category]),
);

export function getCategory(slug: CategorySlug | string): Category | undefined {
  return categoryIndex[slug];
}

/**
 * Order the desks appear in the sticky header. Edit this list to change the
 * navigation — anything omitted stays reachable via "More", the footer and
 * search. Slugs not marked `inPrimaryNav` are ignored.
 */
const NAV_ORDER: CategorySlug[] = [
  'world',
  'politics',
  'business',
  'technology',
  'science',
  'culture',
];

/** Categories rendered in the sticky header, in NAV_ORDER. */
export const primaryNavCategories: Category[] = NAV_ORDER.map((slug) =>
  categories.find((category) => category.slug === slug),
).filter((category): category is Category => Boolean(category?.inPrimaryNav));

export const categorySlugs: CategorySlug[] = categories.map((c) => c.slug);
