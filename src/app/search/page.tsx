import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchResults } from '@/components/search/SearchResults';
import { getAllArticles, toCardArticles } from '@/lib/articles';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'جست‌وجو',
  description:
    'جست‌وجو در همهٔ گزارش‌های یو‌کی مگزین بر پایهٔ تیتر، موضوع یا سرویس — در هوش مصنوعی، آموزش، فناوری، سیاست، جهان، اقتصاد، علم، فرهنگ، سلامت و محیط زیست.',
  path: '/search',
  // Search result pages should not be indexed.
  noIndex: true,
});

export default function SearchPage() {
  // Card-shaped projection only — article bodies stay on the server.
  const articles = toCardArticles(getAllArticles());

  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResults articles={articles} />
    </Suspense>
  );
}

/** Shown while the client component reading `useSearchParams` loads. */
function SearchFallback() {
  return (
    <div className="frame py-10 sm:py-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="label mb-3 flex items-center justify-center text-brand-red">
          <span aria-hidden="true" className="me-2 h-[3px] w-6 bg-brand-red" />
          جست‌وجو
        </p>
        <h1 className="font-serif text-display tracking-[-0.025em] text-ink">یافتن یک گزارش</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          در حال بارگذاری جست‌وجو…
        </p>
      </div>
    </div>
  );
}
