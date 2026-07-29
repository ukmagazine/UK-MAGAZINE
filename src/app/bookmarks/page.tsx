import type { Metadata } from 'next';
import { BookmarksList } from '@/components/bookmarks/BookmarksList';
import { NewsletterCard } from '@/components/newsletter/NewsletterCard';
import { getAllArticles, toCardArticles } from '@/lib/articles';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Saved stories',
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
            Your library
          </p>

          <h1 className="font-serif text-display tracking-[-0.025em] text-ink">Saved stories</h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Everything you have bookmarked, kept in this browser. Nothing is sent to a server, and
            your list survives a refresh.
          </p>
        </div>
      </header>

      <div className="frame py-12 sm:py-16">
        <BookmarksList articles={articles} />
      </div>

      <div className="frame">
        <NewsletterCard
          title="Never lose a story again"
          description="The Daily Brief lands every weekday morning with the ten stories that moved overnight — and a line on why each matters."
        />
      </div>
    </>
  );
}
