import Link from 'next/link';
import type { Metadata } from 'next';
import { StaticPage } from '@/components/layout/StaticPage';
import { breadcrumbJsonLd, buildMetadata, jsonLdProps } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'درباره ما',
  description:
    'مجله بریتانیا (UK Magazine) مرجع تخصصی اخبار و اطلاعات کاربردی برای جامعه‌ی فارسی‌زبان مقیم بریتانیاست.',
  path: '/about/',
});

/**
 * Header treatment: the publisher suggested a photograph of a British landmark.
 * None is used, because the only licensing route open to this repository is an
 * Unsplash hotlink, and a decorative hotlink on a standing page is a permanent
 * third-party request on a site whose whole privacy position is that it makes
 * none. The angular brand corner carries the page instead.
 */
export default function AboutPage() {
  const trail = [
    { name: 'خانه', path: '/' },
    { name: 'درباره ما', path: '/about/' },
  ];

  return (
    <>
      <script {...jsonLdProps(breadcrumbJsonLd(trail))} />

      <StaticPage
        kicker="درباره ما"
        title="درباره UK Magazine"
        standfirst="رسانه و راهنمای زندگی فارسی‌زبانان بریتانیا"
      >
        <p>
          مجله بریتانیا (UK Magazine) مرجع تخصصی اخبار و اطلاعات کاربردی برای ایرانیان
          بریتانیاست. چه در میان ایرانیان لندن باشید و چه به‌عنوان بخشی از
          جامعهٔ ایرانیان انگلستان در شهرهای دیگر زندگی کنید، تمرکز ما بر اخباری است که
          مستقیماً بر زندگی
          روزمرهٔ شما اثر می‌گذارد؛ از قوانین جدید مهاجرتی و تغییرات اقتصادی گرفته تا
          رویدادهای فرهنگی و راهنمای زندگی در شهرهای مختلف.
        </p>

        <h2>چه می‌خوانید؟</h2>

        <ul>
          <li>
            <strong>پوشش جامع اخبار بریتانیا:</strong> مهم‌ترین اخبار روز در حوزه‌های متنوع (از سیاست
            و اقتصاد تا سلامت، جامعه و ورزش) به زبانی ساده، دقیق و به دور از پیچیدگی.
          </li>
          <li>
            <strong>راهنمای زندگی:</strong> مقالات و آموزش‌های کاربردی و ماندگار در زمینه‌هایی چون
            مهاجرت، کار، تحصیل، مسکن و معرفی جاذبه‌های گردشگری بریتانیا.
          </li>
        </ul>

        <h2>تعهد ما به شفافیت و راستی‌آزمایی</h2>

        <p>
          اعتبار، مهم‌ترین سرمایه‌ی ماست. تمامی اخباری که در UK Magazine منتشر می‌شوند،
          از معتبرترین رسانه‌های بریتانیا (مانند BBC News، The Guardian، Sky News و…)
          استخراج و ترجمه شده‌اند. ما به اصول حرفه‌ای روزنامه‌نگاری پایبندیم؛ به همین
          دلیل، در انتهای هر مطلب نام و لینک منبع اصلی درج می‌شود تا شما بتوانید با یک
          کلیک، صحت اطلاعات را شخصاً راستی‌آزمایی کنید. ما هیچ محتوایی را بدون پشتوانه‌ی
          معتبر منتشر نمی‌کنیم.
        </p>

        <h2>دعوت به همکاری</h2>

        <p>
          ما همیشه از شنیدن ایده‌های جدید استقبال می‌کنیم. اگر صاحب کسب‌وکار هستید،
          رویدادی برگزار می‌کنید یا پیشنهادی برای همکاری دارید، از طریق صفحه‌ی{' '}
          <Link href="/contact/">ارتباط با ما</Link> با تحریریه در تماس باشید.
        </p>
      </StaticPage>
    </>
  );
}
