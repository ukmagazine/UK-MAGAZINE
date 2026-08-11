import type { Metadata } from 'next';

/**
 * OUT OF SERVICE — the folder is `_newsletter`, not `newsletter`.
 *
 * A leading underscore makes this a Next private folder: the file is still
 * compiled and type-checked, but no route is emitted, so /newsletter/ falls
 * through to the 404 page rather than serving a page of signup copy whose five
 * forms all render nothing (see NEWSLETTER_ENABLED in lib/features.ts).
 *
 * Hidden, not deleted. The newsletter is expected back in one to two months:
 * rename this folder to `newsletter`, flip NEWSLETTER_ENABLED, and restore the
 * /newsletter/ entry in sitemap.ts.
 *
 * `notFound()` was tried first and is wrong here — under `output: 'export'` it
 * emits a blank shell for the route rather than the 404 page.
 */
import {
  BookOpen,
  Check,
  Cpu,
  GraduationCap,
  Landmark,
  Newspaper,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { newsletters } from '@/data/newsletters';
import { site } from '@/data/site';
import type { Newsletter } from '@/lib/types';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'خبرنامه‌ها',
  description:
    'پنج خبرنامهٔ یو‌کی مگزین: خلاصهٔ روزانه، هفته‌نامهٔ هوش مصنوعی، به‌روزرسانی آموزش، سیاست جهانی و مرور آخر هفته. کوتاه، ویراسته و رایگان.',
  path: '/newsletter/',
  noIndex: true,
});

const ICONS: Record<Newsletter['icon'], typeof Newspaper> = {
  brief: Newspaper,
  ai: Cpu,
  education: GraduationCap,
  politics: Landmark,
  weekend: BookOpen,
};

const TRUST = [
  { Icon: Users, label: '۵۲۴٬۰۰۰ خواننده', detail: 'در مجموع پنج خبرنامه' },
  { Icon: ShieldCheck, label: 'بدون فروش داده', detail: 'هرگز، به هیچ‌کس' },
  { Icon: Check, label: 'لغو عضویت با یک کلیک', detail: 'در هر شماره' },
];

export default function NewsletterPage() {
  return (
    <>
      {/* Value proposition ----------------------------------- */}
      <header className="relative overflow-hidden border-b border-line">
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-24 w-24 bg-brand-red sm:h-32 sm:w-32"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        <div className="frame relative py-14 sm:py-20">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="label mb-4 flex items-center text-brand-red">
                <span aria-hidden="true" className="me-2 h-[3px] w-6 bg-brand-red" />
                خبرنامه‌ها
              </p>

              <h1 className="max-w-2xl font-serif text-display tracking-[-0.025em] text-ink">
                خبر، تا آنجا که چیزی تغییر کرده است.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                هر خبرنامه را همان سرویسی می‌نویسد که آن حوزه را پوشش می‌دهد، از هر چیزی که تازه
                نیست پیراسته می‌شود، و در زمانی می‌رسد که بتوانید رویش حساب کنید. بدون پرکننده،
                بدون ترفند تعامل، و بدون هزینه.
              </p>

              <ul className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {TRUST.map(({ Icon, label, detail }) => (
                  <li key={label} className="border-t border-line pt-4">
                    <Icon aria-hidden="true" className="mb-2.5 h-5 w-5 text-brand-red" />
                    <p className="font-serif text-base text-ink">{label}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{detail}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary signup ---------------------------------- */}
            <div className="lg:col-span-5">
              <div className="relative border border-line bg-surface-soft p-6 sm:p-8">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[3px] bg-brand-red"
                />

                <p className="label mb-2 text-brand-red">از اینجا شروع کنید</p>
                <h2 className="font-serif text-2xl leading-snug text-ink">
                  عضویت در خلاصهٔ روزانه
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  ده خبری که شب گذشته تغییر کرده‌اند، هرکدام در کمتر از شصت کلمه. روزهای کاری،
                  ساعت ۶:۳۰ بامداد.
                </p>

                <NewsletterForm className="mt-6" newsletterName="خلاصهٔ روزانه" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="frame py-14 sm:py-20">
        {/* Newsletter types --------------------------------- */}
        <section aria-labelledby="editions-heading">
          <SectionHeader
            title="پنج خبرنامه"
            kicker="سرویس خود را انتخاب کنید"
            description="هرکدام را خبرنگاران همان حوزه می‌نویسند. به هر تعداد که خواستید بپیوندید."
            size="display"
            className="border-t-0 pt-0"
            as="h2"
          />

          <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {newsletters.map((newsletter, index) => {
              const Icon = ICONS[newsletter.icon];
              return (
                <Reveal as="li" key={newsletter.id} delay={index * 0.06}>
                  <article className="flex h-full flex-col border-t-2 border-ink pt-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-surface-soft">
                        <Icon aria-hidden="true" className="h-5 w-5 text-brand-red" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-xl text-ink sm:text-2xl">
                          {newsletter.name}
                        </h3>
                        <p className="label mt-1 text-ink-soft">{newsletter.cadence}</p>
                      </div>

                      <p className="tabular shrink-0 text-end text-xs text-ink-faint">
                        {newsletter.subscribers}
                        <br />
                        خواننده
                      </p>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {newsletter.description}
                    </p>

                    {/* Example content ------------------------ */}
                    <div className="mt-5 border-s-2 border-brand-red bg-surface-soft py-3 ps-4 pe-4">
                      <p className="label mb-1.5 text-brand-red">از شماره‌های اخیر</p>
                      <p className="font-serif text-base leading-snug text-ink">
                        {newsletter.sample}
                      </p>
                    </div>

                    <div className="mt-auto pt-6">
                      <NewsletterForm
                        newsletterName={newsletter.name}
                        buttonLabel="عضویت"
                        showPrivacyNote={false}
                      />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </section>

        {/* Privacy ------------------------------------------ */}
        <section
          className="mt-16 border border-line bg-surface-soft p-6 sm:mt-20 sm:p-10"
          aria-labelledby="privacy-heading"
        >
          <h2 id="privacy-heading" className="label mb-4 flex items-center text-brand-red">
            <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-brand-red" />
            نشانی شما چگونه نگهداری می‌شود
          </h2>

          <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
            <p className="text-sm leading-relaxed text-ink-soft">
              نشانی ایمیل شما را تنها برای فرستادن خبرنامه‌هایی که خواسته‌اید نگه می‌داریم و برای
              هیچ کار دیگری. هرگز فروخته، اجاره یا با آگهی‌دهندگان به اشتراک گذاشته نمی‌شود.
            </p>
            <p className="text-sm leading-relaxed text-ink-soft">
              هر شماره یک پیوند لغو عضویت با یک کلیک دارد که بی‌درنگ اعمال می‌شود. لازم نیست دلیلش
              را بگویید و ما هم ایمیلی برای پرسیدن نمی‌فرستیم.
            </p>
            <p className="text-sm leading-relaxed text-ink-soft">
              جزئیات کامل در{' '}
              <a
                href="/privacy/"
                className="font-medium text-brand-deep underline decoration-brand-red/40 underline-offset-2 transition-colors hover:decoration-brand-red"
              >
                سیاست حریم خصوصی
              </a>
              {' '}ما آمده است. پرسش‌ها را به {site.email} بفرستید.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
