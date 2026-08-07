import type { Metadata } from 'next';
import { Globe2, PenLine, Scale, ShieldCheck } from 'lucide-react';
import { NewsletterCard } from '@/components/newsletter/NewsletterCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { categories } from '@/data/categories';
import { site } from '@/data/site';
import { articles } from '@/data/articles';
import { breadcrumbJsonLd, buildMetadata, jsonLdProps } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'دربارهٔ ما',
  description: site.description,
  path: '/about',
});

const PRINCIPLES = [
  {
    Icon: Scale,
    title: 'گزارشِ روند، نه فقط نتیجه',
    body: 'می‌نویسیم چه تصمیمی گرفته شد، چه کسی گرفت، چه هزینه‌ای دارد و بعد چه می‌شود. آنجا که نمی‌دانیم، همین را می‌گوییم و جای خالی را با صفت پر نمی‌کنیم.',
  },
  {
    Icon: ShieldCheck,
    title: 'اصلاح در برابر چشم همه',
    body: 'اصلاحیه‌ها با تاریخ و توضیح به خودِ گزارش افزوده می‌شوند. مطلب منتشرشده را بی‌سروصدا ویرایش نمی‌کنیم تا خطا ناپدید شود.',
  },
  {
    Icon: PenLine,
    title: 'جدایی گزارش از دیدگاه',
    body: 'ستون‌های تحلیلی با برچسب «دیدگاه» و امضای نویسنده منتشر می‌شوند. گزارش خبری چنین نیست و نظر خبرنگار را با خود حمل نمی‌کند.',
  },
  {
    Icon: Globe2,
    title: 'شفافیت در شیوهٔ تولید',
    body: 'گزارش‌ها در یک خط تولید تحریریه‌ای با کمک اتوماسیون تهیه و پیش از انتشار بازبینی می‌شوند. امضای هر مطلب نام نشریه است تا شیوهٔ تولید برای خواننده شفاف بماند.',
  },
];

const STATS = [
  { value: String(categories.length), label: 'سرویس خبری' },
  { value: String(articles.length), label: 'گزارش منتشرشده' },
  ...(site.founded ? [{ value: String(site.founded), label: 'سال تأسیس' }] : []),
  { value: '۲۴/۷', label: 'پوشش پیوسته' },
];

const SECTIONS = [
  {
    id: 'standards',
    title: 'اصول و اخلاق حرفه‌ای',
    body: 'خبرنگاران از نهادهایی که پوشش می‌دهند پول، هدیه یا سفر نمی‌پذیرند. ناشناس‌ماندن منبع تنها وقتی پذیرفته می‌شود که اطلاعات تعیین‌کننده باشد و به‌شکل رسمی در دسترس نباشد، و دلیلش در خودِ گزارش توضیح داده می‌شود. هویت هر منبع ناشناس دست‌کم برای یک دبیر روشن است.',
  },
  {
    id: 'corrections',
    title: 'اصلاحیه‌ها',
    body: 'وقتی اشتباه کنیم، اصلاح را در بالای گزارش می‌آوریم، توضیح می‌دهیم چه چیزی نادرست بوده و تاریخ می‌زنیم. اصلاحیه‌های مهم در همین صفحه هم فهرست می‌شوند. اگر فکر می‌کنید خطایی کرده‌ایم، به تحریریه بنویسید؛ یک آدم آن را می‌خواند.',
  },
  {
    id: 'careers',
    title: 'فرصت‌های شغلی',
    body: 'خبرنگاری را استخدام می‌کنیم که بتواند سند بودجه بخواند و آن را برای کسی که نمی‌تواند توضیح دهد. آگهی‌ها به‌محض ایجاد همین‌جا منتشر می‌شوند، همراه با بازهٔ حقوق. از هر جایی که استخدام قانونی ممکن باشد درخواست می‌پذیریم.',
  },
  {
    id: 'terms',
    title: 'شرایط استفاده',
    body: 'جزئیات شرایط استفاده، مجوز بازنشر و حدود مسئولیت سایت پس از تأیید متن حقوقی در همین بخش منتشر می‌شود. تا آن زمان این متن به‌عنوان شرایط نهایی تلقی نمی‌شود.',
  },
  {
    id: 'privacy',
    title: 'سیاست حریم خصوصی',
    body: 'تنها حداقل لازم برای اجرای سایت را جمع می‌کنیم: نشانی ایمیل در صورت عضویت در خبرنامه، و آمار کلی بازدید بدون هیچ شناسهٔ شخصی. نشان‌شده‌ها در مرورگر خودتان ذخیره می‌شوند و هرگز برای ما فرستاده نمی‌شوند. دادهٔ مخاطب را نمی‌فروشیم.',
  },
  {
    id: 'cookies',
    title: 'تنظیمات کوکی',
    body: 'نسخهٔ فعلی سایت باید تنها از ذخیره‌سازی و کوکی‌های لازم برای قابلیت‌های خود استفاده کند. هر ابزار تحلیلی یا شخصی‌سازی آینده باید همراه با تنظیمات شفاف رضایت کاربر اضافه شود.',
  },
  {
    id: 'accessibility',
    title: 'دسترس‌پذیری',
    body: 'این نشریه استاندارد WCAG 2.1 سطح AA را هدف گرفته است. هر کنترلی با صفحه‌کلید در دسترس است و نشانگر فوکوس دیده می‌شود، تصاویر متن جایگزین توصیفی دارند، انیمیشن‌ها تنظیم کاهش حرکت شما را رعایت می‌کنند، و رنگ هرگز تنها راه انتقال اطلاعات نیست. اگر چیزی برای شما قابل استفاده نبود، به ما بگویید تا درستش کنیم.',
  },
];

export default function AboutPage() {
  const trail = [
    { name: 'خانه', path: '/' },
    { name: 'دربارهٔ ما', path: '/about' },
  ];

  return (
    <>
      <script {...jsonLdProps(breadcrumbJsonLd(trail))} />

      {/* Masthead ------------------------------------------- */}
      <header className="relative overflow-hidden border-b border-line">
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-24 w-24 bg-brand-red sm:h-36 sm:w-36"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        <div className="frame relative py-14 sm:py-20">
          <p className="label mb-4 flex items-center text-brand-red">
            <span aria-hidden="true" className="me-2 h-[3px] w-6 bg-brand-red" />
            دربارهٔ ما
          </p>

          <h1 className="max-w-3xl font-serif text-display tracking-[-0.025em] text-ink">
            گزارش روشن، بدون هیاهو.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {site.description}
          </p>

          {site.established ? (
            <p className="mt-5 text-xs uppercase tracking-[0.14em] text-ink-faint">
              {site.established}
            </p>
          ) : null}
        </div>
      </header>

      <div className="frame py-14 sm:py-20">
        {/* Statistics --------------------------------------- */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-line pb-12 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  aria-hidden="true"
                  className="mb-3 block h-[3px] w-8 bg-brand-red"
                />
                <span className="tabular block font-serif text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-ink-soft">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Principles --------------------------------------- */}
        <section id="newsroom" className="mt-16 scroll-mt-32" aria-labelledby="principles-heading">
          <SectionHeader
            title="چگونه کار می‌کنیم"
            kicker="اصول"
            description="چهار تعهد که به هر گزارشی که منتشر می‌کنیم شکل می‌دهد."
            size="display"
            as="h2"
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {PRINCIPLES.map(({ Icon, title, body }, index) => (
              <Reveal key={title} delay={index * 0.06}>
                <article className="flex gap-4 border-t border-line pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-surface-soft">
                    <Icon aria-hidden="true" className="h-5 w-5 text-brand-red" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-ink">{title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Policy sections ---------------------------------- */}
        <section className="mt-16 sm:mt-20" aria-labelledby="policies-heading">
          <SectionHeader
            title="سیاست‌ها و تماس"
            kicker="جزئیات"
            size="display"
            as="h2"
          />

          <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 border-t border-line pt-5">
                <h3 className="font-serif text-xl text-ink">{section.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{section.body}</p>
              </section>
            ))}
          </div>
        </section>
      </div>

      <div className="frame">
        <NewsletterCard />
      </div>
    </>
  );
}
