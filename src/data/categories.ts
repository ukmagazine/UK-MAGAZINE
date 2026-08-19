import { HIDDEN_CATEGORY_SLUG_SET } from '@/lib/category-slugs';
import type { Category, CategorySlug } from '@/lib/types';

/**
 * The fifteen desks the publication defines.
 *
 * Ten appear in the primary navigation. `spotlight` is visible — indexed, in
 * the footer, linked from /services/ and /contact/ — but stays out of the top
 * navigation until it holds five or more articles, because a desk with two
 * entries standing beside desks that publish daily reads as broken.
 *
 * Four are hidden: `sports` by editorial decision, `ai`, `education` and
 * `science` because nothing produces content for them. Hidden desks stay
 * defined and routable, never appear in navigation or footer, are always
 * `noindex`, and are filtered out of every homepage feed (see lib/articles.ts).
 *
 * Slugs stay Latin because they are URL segments; every reader-facing string is
 * Persian.
 */
export const categories: Category[] = [
  {
    slug: 'society',
    name: 'جامعه',
    shortName: 'جامعه',
    description: 'زندگی روزمره، مهاجرت، مسکن، کار و نهادهایی که به آنها شکل می‌دهند.',
    standfirst:
      'جامعه را از سمت آدم‌ها گزارش می‌کنیم: چه چیزی گران‌تر شده، چه چیزی سخت‌تر شده، و کدام تصمیم اداری پشت آن است.',
    tint: '#6D4C7D',
    topics: ['مهاجرت', 'مسکن', 'کار', 'خدمات عمومی', 'خانواده', 'شهر'],
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
    slug: 'world',
    name: 'جهان',
    shortName: 'جهان',
    description: 'دیپلماسی، تجارت، مرزها و رویدادهایی که از یک کشور فراتر می‌روند.',
    standfirst:
      'رویدادهای بین‌المللی را با تمرکز بر اثری که بر زندگی ایرانیان بریتانیا می‌گذارند دنبال می‌کنیم و هرجا به گزارش رسانه‌ای دیگر تکیه کنیم، منبع را شفاف ذکر می‌کنیم.',
    tint: '#1F6F6B',
    topics: ['دیپلماسی', 'تجارت', 'مهاجرت', 'امنیت', 'زنجیرهٔ تأمین', 'مرز'],
    inPrimaryNav: true,
  },
  {
    slug: 'event',
    name: 'رویداد',
    shortName: 'رویداد',
    description: 'نمایشگاه، کنسرت، جشنواره و آنچه در تقویم شهر می‌گذرد.',
    standfirst:
      'آنچه این هفته در شهر برگزار می‌شود، با تاریخ و نشانی — نه فهرست تبلیغاتی، بلکه تقویمی که بشود به آن تکیه کرد.',
    tint: '#B8860B',
    topics: ['نمایشگاه', 'جشنواره', 'کنسرت', 'تقویم', 'لندن', 'بلیت'],
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
    inPrimaryNav: true,
  },
  {
    slug: 'guide',
    name: 'راهنما',
    shortName: 'راهنما',
    description: 'راهنمای عملی زندگی در بریتانیا: مهاجرت، کار، تحصیل و مسکن.',
    standfirst:
      'آنچه باید بدانید تا کاری را پیش ببرید — قدم‌به‌قدم، با پیوند به منابع رسمی.',
    // Work order proposed #4A6FA5; that sits 8° from technology's #2E5AAC and
    // the two washes were indistinguishable. Moved to a green with clear
    // separation from every other desk.
    tint: '#4F8A2E',
    topics: ['مهاجرت', 'تحصیل', 'کار', 'مسکن', 'مالیات', 'ویزا'],
    inPrimaryNav: true,
  },
  {
    slug: 'travel',
    name: 'گردشگری',
    shortName: 'گردشگری',
    description: 'سواحل، جنگل‌ها، شهرها و جاهایی از بریتانیا که ارزش دیدن دارند.',
    standfirst:
      'بریتانیا را جای دیگری هم می‌بینیم: مسیرهای یک‌روزه، شهرهای کوچک، و جاهایی که با یک بلیت قطار می‌شود رفت.',
    // Work order proposed #1F7A6B, which is 5° from world's #1F6F6B — the same
    // teal to the eye. Moved to a distinct green.
    tint: '#3F8F3F',
    topics: ['ساحل', 'طبیعت', 'شهر', 'سفر یک‌روزه', 'موزه', 'رایگان'],
    inPrimaryNav: true,
  },
  {
    /**
     * Visible but deliberately out of the top navigation.
     *
     * PROMOTION THRESHOLD: add `spotlight` to NAV_ORDER once this desk holds
     * five or more published articles. Until then it is reachable from the
     * footer, /services/ and /contact/, and it is indexed — it is simply not
     * given a slot beside desks that publish daily.
     */
    slug: 'spotlight',
    name: 'معرفی کسب‌وکار',
    shortName: 'کسب‌وکار',
    description: 'معرفی رایگان کسب‌وکارهای کوچک جامعهٔ فارسی‌زبان بریتانیا.',
    standfirst:
      'هر از گاهی یک کسب‌وکار کوچک را معرفی می‌کنیم. این معرفی خریدنی نیست و انتخاب آن با تحریریه است.',
    // Work order proposed #B8860B, which is byte-identical to `event`.
    tint: '#B5273F',
    topics: ['کسب‌وکار', 'هنر', 'آموزش', 'خدمات', 'لندن', 'منچستر'],
    inPrimaryNav: true,
  },

  // ---------------------------------------------------------------- //
  // Hidden desks — defined and routable, never surfaced.
  // ---------------------------------------------------------------- //
  {
    slug: 'sports',
    name: 'ورزش',
    shortName: 'ورزش',
    description: 'لیگ‌ها، باشگاه‌ها، اقتصاد ورزش و رویدادهای بین‌المللی.',
    standfirst:
      'ورزش را هم به‌عنوان مسابقه می‌بینیم و هم به‌عنوان صنعت — نتیجه، و آنچه نتیجه را ممکن کرده است.',
    tint: '#C2410C',
    topics: ['فوتبال', 'لیگ', 'باشگاه', 'رویداد بین‌المللی', 'اقتصاد ورزش', 'ورزشکار'],
    inPrimaryNav: false,
    /**
     * Hidden by editorial decision, not for lack of content. The automation
     * upstream can still classify a story as Sports and publish it, so the
     * site has to stay correct even when one arrives — hence a flag rather
     * than an assumption that the desk is empty.
     */
    hidden: true,
  },
  {
    slug: 'ai',
    name: 'هوش مصنوعی',
    shortName: 'هوش مصنوعی',
    description: 'عرضهٔ مدل‌ها، پژوهش، مقررات و اقتصادِ هوش ماشینی.',
    standfirst:
      'هوش مصنوعی را هم به‌عنوان یک صنعت می‌بینیم و هم یک نهاد — اینکه این سامانه‌ها واقعاً چه می‌توانند بکنند، چه کسی آنها را در اختیار دارد، و با ورودشان به محیط‌های کار معمولی چه چیزی تغییر می‌کند.',
    // Was #6D4C7D — byte-identical to `society`.
    tint: '#6E7A1F',
    topics: ['پژوهش', 'سیاست‌گذاری', 'تراشه', 'ایمنی', 'کار', 'متن‌باز'],
    inPrimaryNav: false,
    hidden: true,
  },
  {
    slug: 'education',
    name: 'آموزش',
    shortName: 'آموزش',
    description: 'مدرسه، دانشگاه، فناوری آموزشی و سیاستی که به آنها شکل می‌دهد.',
    standfirst:
      'آموزش را از کلاس درس تا فرمول بودجه دنبال می‌کنیم: چه چیزی سنجیده می‌شود، چه چیزی سنجیده نمی‌شود، و تصمیم‌های امروز چند سال بعد به چه نتیجه‌ای می‌رسند.',
    // Was #B4552A, 1° of hue from `sports` — the same burnt orange.
    tint: '#9B3B8C',
    topics: ['مدرسه', 'دانشگاه', 'بودجه', 'ارزیابی', 'معلم', 'دسترسی'],
    inPrimaryNav: false,
    hidden: true,
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
    inPrimaryNav: false,
    hidden: true,
  },
];

const categoryIndex: Record<string, Category> = Object.fromEntries(
  categories.map((category) => [category.slug, category]),
);

export function getCategory(slug: CategorySlug | string): Category | undefined {
  return categoryIndex[slug];
}

/**
 * Whether a desk is hidden.
 *
 * Takes a raw slug so callers holding only `article.category` do not have to
 * resolve the record first. An unknown slug is treated as hidden: if a desk
 * cannot be resolved, showing its articles to a reader is the worse failure.
 */
export function isHiddenCategory(slug: CategorySlug | string): boolean {
  const category = categoryIndex[slug];
  return category ? Boolean(category.hidden) : true;
}

/** Desks a reader can reach from the navigation or the footer. */
export const visibleCategories: Category[] = categories.filter((category) => !category.hidden);

/**
 * Primary navigation order.
 *
 * Re-ordering this list is safe and is done directly on GitHub by the
 * publisher as traffic data arrives. Renaming a slug is NOT safe — the slugs
 * are an API contract with the publishing automation.
 */
const NAV_ORDER: CategorySlug[] = [
  'society',
  'business',
  'politics',
  'event',
  'guide',
  'travel',
  'technology',
  'culture',
  'health',
  'spotlight',
  'world',
];

/**
 * `inPrimaryNav` is applied after mapping NAV_ORDER, so both have to agree. A
 * slug listed above with `inPrimaryNav: false` is silently dropped — that is
 * the safety net, not an oversight.
 */
export const primaryNavCategories: Category[] = NAV_ORDER.map((slug) =>
  categories.find((category) => category.slug === slug),
).filter((category): category is Category => Boolean(category?.inPrimaryNav && !category.hidden));

/**
 * Every desk a reader may be sent to: the ten in the navigation plus
 * `spotlight`. Used by the footer and the sitemap.
 */
export const footerCategories: Category[] = [
  ...primaryNavCategories,
  ...visibleCategories.filter((category) => !primaryNavCategories.includes(category)),
];

export const categorySlugs: CategorySlug[] = categories.map((category) => category.slug);

// The `hidden` flags above and HIDDEN_CATEGORY_SLUGS in lib/category-slugs.ts
// describe the same set; the loader reads the slug list because it runs before
// these records exist. Fail the build loudly rather than let them drift.
if (process.env.NODE_ENV !== 'production') {
  const flagged = new Set(categories.filter((c) => c.hidden).map((c) => c.slug));
  const listed = HIDDEN_CATEGORY_SLUG_SET;
  const mismatch =
    flagged.size !== listed.size || [...flagged].some((slug) => !listed.has(slug));
  if (mismatch) {
    throw new Error(
      'دسته‌های پنهان با HIDDEN_CATEGORY_SLUGS همخوانی ندارند: ' +
        `flagged=[${[...flagged].join(', ')}] listed=[${[...listed].join(', ')}]`,
    );
  }
}
