import type { Metadata, Viewport } from 'next';
import { Inter, Newsreader, Vazirmatn } from 'next/font/google';
import { BreakingNewsBar } from '@/components/layout/BreakingNewsBar';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { BookmarksProvider } from '@/components/providers/BookmarksProvider';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import { SearchProvider } from '@/components/providers/SearchProvider';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { breakingItems } from '@/data/articles';
import { footerCategories } from '@/data/categories';
import { site } from '@/data/site';
import { getPopularTags } from '@/lib/articles';
import { buildSearchIndex } from '@/lib/search-index';
import { jsonLdProps, organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import './globals.css';

/**
 * Editorial serif for headlines, neutral sans for interface text.
 * `display: 'swap'` avoids invisible text while the fonts load.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-ui',
});

/**
 * Persian face. Loaded alongside the Latin fonts and applied by the
 * `[dir='rtl']` rule in globals.css, so switching language needs no reload.
 */
const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-fa',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  /**
   * Derived from the visible desks rather than hand-written. The hand-written
   * list had gone stale — it still advertised هوش مصنوعی، آموزش، علم and
   * محیط زیست, three of which are hidden and one of which no longer exists,
   * and it named none of the new desks. Search engines ignore this tag, so an
   * inconsistent one is strictly worse than an accurate one.
   */
  keywords: ['اخبار', 'بریتانیا', 'فارسی', ...footerCategories.map((c) => c.name)],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Matches the brand purple sampled from the logo.
  themeColor: '#8E1B9C',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Built on the server so the overlay ships an index, not the whole corpus.
  const searchIndex = buildSearchIndex();
  const suggestions = getPopularTags(10);

  return (
    <html lang="fa" dir="rtl" className={`${newsreader.variable} ${inter.variable} ${vazirmatn.variable}`}>
      <body className="min-h-dvh bg-surface-page">
        <script {...jsonLdProps(organizationJsonLd())} />
        <script {...jsonLdProps(websiteJsonLd())} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-toast focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-sm focus:bg-brand-red focus:px-4 focus:text-sm focus:font-semibold focus:text-white"
        >
          پرش به محتوای اصلی
        </a>

        <LocaleProvider>
          <SearchProvider>
            <BookmarksProvider>
            {/* Elevated white editorial canvas. Full-bleed on mobile; a floating
                sheet with the page shadow on large screens.

                Capped at 1720px rather than 1480px: on a 1920 display the old
                cap left ~220px of dead grey either side and the whole
                publication read as a small panel floating in the middle of the
                screen. The article measure is unaffected — body copy is still
                held to `max-w-read`. */}
            <div className="mx-auto flex min-h-dvh w-full flex-col bg-surface lg:my-6 lg:min-h-[calc(100dvh-3rem)] lg:w-[min(1720px,calc(100%-48px))] lg:rounded-lg lg:shadow-page">
              <Header />
              <BreakingNewsBar items={breakingItems} />

              <main id="main" className="flex-1">
                {children}
              </main>

              <Footer />
            </div>

            <SearchOverlay articles={searchIndex} suggestions={suggestions} />
            </BookmarksProvider>
          </SearchProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
