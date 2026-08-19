import { HIDDEN_CATEGORY_SLUG_SET } from '@/lib/category-slugs';
import type { Category, CategorySlug } from '@/lib/types';

/**
 * The fifteen desks the publication defines.
 *
 * Eleven appear in the primary navigation. The row is width-measured, not
 * count-limited: whatever does not fit moves into the «بیشتر» overflow menu,
 * so the last entries in NAV_ORDER are the first to be pushed there.
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
    description: 'اخبار جامعه بریتانیا به فارسی: اجاره، حقوق، مدرسه، ویزا و هزینه‌های زندگی روزمره برای ایرانیان ساکن انگلستان.',
    standfirst:
      'در این صفحه به موضوعاتی می‌پردازیم که بر زندگی روزمرهٔ شما در بریتانیا اثر می‌گذارد: اجاره، حقوق، مدرسه، ویزا و هزینه‌های زندگی. هر تغییری را همراه با پیامد عملی آن گزارش می‌کنیم.',
    tint: '#6D4C7D',
    topics: ['مهاجرت', 'مسکن', 'کار', 'خدمات عمومی', 'خانواده', 'شهر'],
    inPrimaryNav: true,
  },
  {
    slug: 'business',
    name: 'اقتصاد',
    shortName: 'اقتصاد',
    description: 'اخبار اقتصادی بریتانیا به فارسی: تورم، نرخ بهره، بازار کار و قیمت‌ها، بر پایهٔ آمار رسمی.',
    standfirst:
      'قیمت‌ها، حقوق‌ها، بازار کار، تورم، نرخ بهره و دیگر عوامل اقتصادی بریتانیا را دنبال می‌کنیم. گزارش‌های این بخش بر آمار رسمی استوار است و از پیش‌بینی پرهیز می‌کند.',
    tint: '#1D6B3F',
    topics: ['بانک مرکزی', 'بازار کار', 'تورم', 'صنعت', 'سرمایه‌گذاری', 'تجارت'],
    inPrimaryNav: true,
  },
  {
    slug: 'politics',
    name: 'سیاست',
    shortName: 'سیاست',
    description: 'اخبار سیاسی بریتانیا به فارسی: قانون‌گذاری، تصمیم‌های دولت و پارلمان و اثر آنها بر زندگی ساکنان انگلستان.',
    standfirst:
      'قانون‌ها و تصمیم‌هایی را دنبال می‌کنیم که در پارلمان و دولت بریتانیا گرفته می‌شود و در نهایت به زندگی مردم می‌رسد. تمرکز ما بر متن قانون است، نه بر رقابت میان احزاب.',
    tint: '#4A4A52',
    topics: ['قانون‌گذاری', 'انتخابات', 'بودجه', 'شفافیت', 'کمیسیون', 'سیاست عمومی'],
    inPrimaryNav: true,
  },
  {
    slug: 'technology',
    name: 'فناوری',
    shortName: 'فناوری',
    description: 'اخبار فناوری به زبان فارسی: اینترنت، تلفن همراه، امنیت اطلاعات شخصی، خدمات آنلاین و مقررات فناوری.',
    standfirst:
      'فناوری را از زاویه‌ای پوشش می‌دهیم که به زندگی شما مربوط است: اینترنت و تلفن همراه، امنیت اطلاعات شخصی، خدمات آنلاین و مقرراتی که این حوزه را تنظیم می‌کند.',
    tint: '#2E5AAC',
    topics: ['نیمه‌هادی', 'ابر', 'امنیت', 'زیرساخت', 'مقررات', 'داده'],
    inPrimaryNav: true,
  },
  {
    slug: 'world',
    name: 'جهان',
    shortName: 'جهان',
    description: 'اخبار مهم جهان به زبان فارسی، از یو‌کی مگزین.',
    standfirst:
      'رویدادهای مهم جهان را گزارش می‌کنیم، با نگاه به آنچه برای خوانندهٔ فارسی‌زبان اهمیت دارد.',
    tint: '#1F6F6B',
    topics: ['دیپلماسی', 'تجارت', 'مهاجرت', 'امنیت', 'زنجیرهٔ تأمین', 'مرز'],
    inPrimaryNav: true,
  },
  {
    slug: 'event',
    name: 'رویداد',
    shortName: 'رویداد',
    description: 'رویدادهای لندن و بریتانیا به فارسی: کنسرت، نمایشگاه، جشنواره و تئاتر، با تاریخ، نشانی و قیمت بلیت.',
    standfirst:
      'برنامه‌های فرهنگی و هنری شهر را در این صفحه گرد آورده‌ایم: کنسرت، نمایشگاه، جشنواره و نمایش. هر مورد با تاریخ، نشانی و قیمت بلیت معرفی می‌شود.',
    tint: '#B8860B',
    topics: ['نمایشگاه', 'جشنواره', 'کنسرت', 'تقویم', 'لندن', 'بلیت'],
    inPrimaryNav: true,
  },
  {
    slug: 'culture',
    name: 'فرهنگ',
    shortName: 'فرهنگ',
    description: 'اخبار فرهنگ و هنر به زبان فارسی: موزه، تئاتر، کتاب، موسیقی و نمایشگاه‌های دیدنی.',
    standfirst:
      'موزه، تئاتر، کتاب، موسیقی و هنر را در این صفحه دنبال می‌کنیم. معرفی می‌کنیم چه چیزی دیدنی است و چرا ارزش وقت گذاشتن دارد.',
    tint: '#A32D6B',
    topics: ['موزه', 'معماری', 'میراث', 'هنر', 'مخاطب', 'بودجهٔ فرهنگی'],
    inPrimaryNav: true,
  },
  {
    slug: 'health',
    name: 'سلامت',
    shortName: 'سلامت',
    description: 'اخبار و راهنمای سلامت به زبان فارسی',
    standfirst:
      'آنچه دربارهٔ سلامت خود و خانواده‌تان لازم است بدانید: نحوهٔ کار NHS، گرفتن نوبت پزشک، دارو و خدمات درمانی.',
    tint: '#0F6E8C',
    topics: ['بیمارستان', 'سلامت عمومی', 'دارو', 'نیروی انسانی', 'بیمه', 'داده'],
    inPrimaryNav: true,
  },
  {
    slug: 'guide',
    name: 'راهنما',
    shortName: 'راهنما',
    description: 'راهنمای زندگی در بریتانیا به فارسی: ویزا، مالیات، اجاره‌نامه، مدرسه و خدمات دولتی، قدم‌به‌قدم.',
    standfirst:
      'راهنمای کارهای اداری و روزمره در بریتانیا را قدم‌به‌قدم توضیح می‌دهیم: ویزا، مالیات، اجاره‌نامه، ثبت‌نام مدرسه و خدمات دولتی. هر راهنما به منابع رسمی پیوند دارد.',
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
    description: 'راهنمای سفر و گردشگری به زبان فارسی: سواحل، شهرهای کوچک، جنگل‌ها و موزه‌های دیدنی.',
    standfirst:
      'جاهایی را معرفی می‌کنیم که ارزش یک سفر کوتاه دارند: سواحل، شهرهای کوچک، جنگل‌ها و موزه‌ها.',
    // Work order proposed #1F7A6B, which is 5° from world's #1F6F6B — the same
    // teal to the eye. Moved to a distinct green.
    tint: '#3F8F3F',
    topics: ['ساحل', 'طبیعت', 'شهر', 'سفر یک‌روزه', 'موزه', 'رایگان'],
    inPrimaryNav: true,
  },
  {
     /**
     * Promoted into the primary navigation on 19 August 2026, ahead of the
     * five-article threshold this comment previously set. Owner decision,
     * taken knowingly: the desk is commercially important to the publication
     * and is wanted in the navigation before it has the volume to justify a
     * slot on editorial grounds alone.
     *
     * It sits tenth in NAV_ORDER, so on a narrow viewport it is the second
     * item to move into the «بیشتر» overflow, after `world`.
     */
    slug: 'spotlight',
    name: 'معرفی کسب‌وکار',
    shortName: 'کسب‌وکار',
    description: 'معرفی رایگان کسب‌وکارهای کوچک فارسی‌زبان، با انتخاب تحریریهٔ یو‌کی مگزین.',
    standfirst:
      'در این صفحه به معرفی کسب‌وکارهای کوچک فارسی‌زبان می‌پردازیم. این معرفی به‌صورت رایگان و با انتخاب تحریریه انجام می‌شود. اگر کسب‌وکاری دارید و مایل به معرفی آن هستید، از صفحهٔ «ارتباط با ما» با تحریریه در تماس باشید.',
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
 * Every desk a reader may be sent to: the eleven in NAV_ORDER. The second
 * spread is now empty in practice — it stays because it is what keeps this
 * list correct if a visible desk is ever added to `categories` without being
 * added to NAV_ORDER. Used by the footer and the sitemap.
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
