import Link from 'next/link';
import type { Metadata } from 'next';
import { StaticPage } from '@/components/layout/StaticPage';
import { Ltr } from '@/components/ui/Ltr';
import { site } from '@/data/site';
import { breadcrumbJsonLd, buildMetadata, jsonLdProps } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'ارتباط با ما',
  description:
    'راه‌های تماس با تحریریه UK Magazine: ارسال سوژه و خبر، معرفی رویدادها، حمایت از کسب‌وکارهای کوچک و پیشنهاد همکاری.',
  path: '/contact/',
});

/**
 * No contact form, deliberately. The site is a static export and cannot receive
 * a submission; a form that silently discards messages is worse than none.
 */
export default function ContactPage() {
  const trail = [
    { name: 'خانه', path: '/' },
    { name: 'ارتباط با ما', path: '/contact/' },
  ];

  return (
    <>
      <script {...jsonLdProps(breadcrumbJsonLd(trail))} />

      <StaticPage kicker="ارتباط با ما" title="با ما در تماس باشید">
        <p>
          تحریریه و تیم پشتیبانی UK Magazine مشتاق شنیدن نظرات، اخبار و پیشنهادهای
          شماست. از راه‌های زیر می‌توانید با ما در ارتباط باشید:
        </p>

        <ul>
          <li>
            ✉️ <strong>ایمیل:</strong>{' '}
            <Ltr href={`mailto:${site.email}`}>{site.email}</Ltr>
          </li>
          <li>
            💬 <strong>واتس‌اپ:</strong> <Ltr>{site.phone}</Ltr>
          </li>
          <li>
            📱 <strong>اینستاگرام:</strong> <Ltr>{site.instagramHandle}</Ltr>
          </li>
        </ul>

        <h2>چگونه می‌توانیم به شما کمک کنیم؟</h2>

        <h3>📰 ارسال سوژه و خبر</h3>
        <p>
          تغییر قانون جدیدی را دیده‌اید؟ یا موضوعی در جامعه وجود دارد که فکر می‌کنید باید
          به آن پرداخته شود؟ سوژه‌ها و لینک منابع خود را برای ما بفرستید تا توسط تحریریه
          بررسی شود.
        </p>

        <h3>🎤 معرفی و تبلیغ رویدادها (کنسرت و نمایشگاه)</h3>
        <p>
          اگر برگزارکننده‌ی رویدادهای فرهنگی، کنسرت یا نمایشگاه هستید و تمایل دارید
          برنامه‌ی خود را در وب‌سایت و صفحه‌ی اینستاگرام ما به جامعه‌ی فارسی‌زبان بریتانیا
          معرفی کنید، برای اطلاع از شرایط و هماهنگی از طریق راه‌های زیر با ما در تماس
          باشید:
        </p>
        <ul>
          <li>
            ✉️ ایمیل: <Ltr href={`mailto:${site.email}`}>{site.email}</Ltr>
          </li>
          <li>
            💬 واتس‌اپ (فقط پیام): <Ltr>{site.phone}</Ltr>
          </li>
        </ul>

        <h3>💼 حمایت از کسب‌وکارهای کوچک</h3>
        <p>
          ما بخش ویژه‌ای برای معرفی رایگان کسب‌وکارهای کوچک جامعه‌ی فارسی‌زبان داریم. برای
          قرار گرفتن در این لیست، اطلاعات خود را برای ما ارسال کنید. (برای تبلیغات تجاری
          گسترده‌تر، لطفاً بخش <Link href="/services/">خدمات ما</Link> را مطالعه کنید.)
        </p>

        <h3>🤝 ایده‌های همکاری</h3>
        <p>
          اگر ایده‌ای برای تولید محتوای مشترک یا همکاری با رسانه‌ی ما دارید، پیشنهادتان را
          ارسال کنید. تمامی پیام‌ها به دقت توسط تیم مدیریت بررسی می‌شوند.
        </p>

        <p>
          معرفی‌های بخش <Link href="/category/spotlight/">معرفی کسب‌وکار</Link> رایگان‌اند و
          خریدنی نیستند؛ انتخاب با تحریریه است.
        </p>
      </StaticPage>
    </>
  );
}
