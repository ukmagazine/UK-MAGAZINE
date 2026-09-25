import type { Metadata } from 'next';
import { CookieSettingsButton } from '@/components/consent/CookieSettingsButton';
import { StaticPage } from '@/components/layout/StaticPage';
import { Ltr } from '@/components/ui/Ltr';
import { site } from '@/data/site';
import { breadcrumbJsonLd, buildMetadata, jsonLdProps } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'حریم خصوصی',
  description:
    'این وب‌سایت فقط اگر خودتان اجازه بدهید از Google Analytics برای آمار بازدید استفاده می‌کند؛ داستان‌های ذخیره‌شده و جست‌وجوهای اخیر فقط در حافظهٔ محلی مرورگر روی دستگاه شما نگهداری می‌شوند.',
  path: '/privacy/',
});

/**
 * ⚠️ This text is only true while the only cookies and the only tracking on
 * the site are Google Analytics 4, loaded solely after the reader accepts it
 * in the consent banner (src/components/consent, src/lib/analytics.ts), with
 * Google signals and ad personalisation off.
 *
 * If anything ever adds another analytics package, a third-party embed, a
 * runtime font/script/pixel from another domain, or client-side storage of
 * reader data, this page has to change in the SAME commit — and it must go
 * behind the same consent, or the consent question has to be reopened.
 */
export default function PrivacyPage() {
  const trail = [
    { name: 'خانه', path: '/' },
    { name: 'حریم خصوصی', path: '/privacy/' },
  ];

  return (
    <>
      <script {...jsonLdProps(breadcrumbJsonLd(trail))} />

      <StaticPage kicker="حقوقی" title="حریم خصوصی">
        <p>
          این وب‌سایت فقط اگر خودتان اجازه بدهید از کوکی‌های Google Analytics استفاده
          می‌کند؛ بدون اجازهٔ شما هیچ کوکی‌ای ذخیره نمی‌شود و رفتار شما ردیابی نمی‌شود. حساب
          کاربری، فرم ثبت‌نام و ابزار تبلیغاتی شخص ثالثی روی سایت وجود ندارد.
        </p>

        <p>
          این سایت داستان‌های ذخیره‌شده و جست‌وجوهای اخیر را در حافظهٔ محلی مرورگر روی
          دستگاه خودتان نگه می‌دارد. این داده‌ها هرگز دستگاه شما را ترک نمی‌کنند و به هیچ
          سروری فرستاده نمی‌شوند. هر زمان بخواهید می‌توانید آن‌ها را از تنظیمات مرورگر خود
          پاک کنید.
        </p>

        <h2>آمار بازدید (Google Analytics)</h2>

        <p>
          ما فقط اگر شما «قبول» را بزنید از Google Analytics 4 استفاده می‌کنیم. تا وقتی
          انتخاب نکرده‌اید، یا اگر «نه، ممنون» را بزنید، این ابزار اصلاً بارگذاری نمی‌شود و
          هیچ کوکی‌ای روی دستگاه شما ذخیره نمی‌شود.
        </p>

        <p>
          این ابزار به ما نشان می‌دهد چه صفحه‌هایی خوانده می‌شوند، چقدر روی هر صفحه
          می‌مانید، با چه نوع دستگاهی سایت را می‌خوانید، موقعیت تقریبی شما (مثلاً شهر یا
          کشور) و اینکه از کجا به سایت آمده‌اید. هدف ما فقط این است که بفهمیم کدام مطالب
          برایتان مفیدتر است.
        </p>

        <p>
          ارائه‌دهندهٔ این ابزار شرکت Google است و ممکن است داده‌ها بیرون از بریتانیا پردازش
          شوند. این داده‌ها ۱۴ ماه نگهداری می‌شوند. Google signals و شخصی‌سازی تبلیغات خاموش
          است و از این داده‌ها هیچ استفادهٔ تبلیغاتی نمی‌شود.
        </p>

        <p>
          هر زمان بخواهید می‌توانید قبول کنید، رد کنید یا انتخاب خود را عوض کنید؛ از{' '}
          <CookieSettingsButton className="inline font-medium text-brand-red underline decoration-brand-red/40 underline-offset-4 hover:decoration-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red" />{' '}
          در پایین صفحه. انتخاب شما در حافظهٔ محلی مرورگرتان نگه داشته می‌شود و پس از ۱۲
          ماه دوباره پرسیده می‌شود. رد کردن هیچ تغییری در استفاده از سایت ایجاد نمی‌کند.
        </p>

        <p>
          مانند هر وب‌سایتی، سرور میزبان به‌طور خودکار اطلاعات فنی بازدید — از جمله نشانی
          IP — را در گزارش‌های خود ثبت می‌کند. این اطلاعات فقط برای امنیت و عملکرد سایت
          استفاده می‌شود و با کسی به اشتراک گذاشته نمی‌شود.
        </p>

        <p>
          اگر از طریق ایمیل یا واتس‌اپ با ما تماس بگیرید، پیام شما فقط برای پاسخ‌دادن
          استفاده می‌شود و برای هیچ منظور دیگری نگهداری یا به اشتراک گذاشته نمی‌شود.
        </p>

        <p>این صفحه با تغییر امکانات سایت به‌روز خواهد شد.</p>

        <p>
          برای هر سؤالی درباره‌ی حریم خصوصی:{' '}
          <Ltr href={`mailto:${site.email}`}>{site.email}</Ltr>
        </p>
      </StaticPage>
    </>
  );
}
