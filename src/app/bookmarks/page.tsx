import type { Metadata } from 'next';
import { BookmarksList } from '@/components/bookmarks/BookmarksList';
import { NewsletterCard } from '@/components/newsletter/NewsletterCard';
import { getAllArticles, toCardArticles } from '@/lib/articles';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'گزارش‌های ذخیره‌شده',
  description:
    'Stories you have saved to read later. Bookmarks are stored in your browser — no account needed.',
  path: '/bookmarks',
  // A reader's private list should not be indexed.
  noIndex: true,
});

export default function BookmarksPage() {
  // Card-shaped projection only; article bodies never reach the client.
  const articles = toCardArticles(getAllArticles());

  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-20 w-20 bg-brand-red sm:h-28 sm:w-28"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        <div className="frame relative py-9 sm:py-12">
          <p className="label mb-3 flex items-center text-brand-red">
            <span aria-hidden="true" className="me-2 h-[3px] w-6 bg-brand-red" />
            کتابخانهٔ شما
          </p>

          <h1 className="font-serif text-display tracking-[-0.025em] text-ink">گزارش‌های ذخیره‌شده</h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            هر آنچه نشان کرده‌اید، در همین مرورگر نگه داشته می‌شود. چیزی به سرور فرستاده نمی‌شود
            و فهرست شما پس از بازخوانی صفحه باقی می‌ماند.
          </p>
        </div>
      </header>

      <div className="frame py-12 sm:py-16">
        <BookmarksList articles={articles} />
      </div>

      <div className="frame">
        <NewsletterCard
          title="دیگر هیچ گزارشی را از دست ندهید"
          description="خلاصهٔ روزانه هر بامداد کاری با ده گزارشی که شب گذشته تغییر کرده‌اند می‌رسد — و یک جمله دربارهٔ اهمیت هرکدام."
        />
      </div>
    </>
  );
}
