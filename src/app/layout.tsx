import type { Metadata, Viewport } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import localFont from 'next/font/local';
import { BreakingNewsBar } from '@/components/layout/BreakingNewsBar';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SitePreloader } from '@/components/layout/SitePreloader';
import { BookmarksProvider } from '@/components/providers/BookmarksProvider';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import { SearchProvider } from '@/components/providers/SearchProvider';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { PwaPrompts } from '@/components/pwa/PwaPrompts';
import { PwaLayer } from '@/components/pwa/PwaLayer';
import { ServiceWorkerRegistration } from '@/components/pwa/ServiceWorkerRegistration';
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
const vazirmatn = localFont({
  src: [
    { path: './fonts/Vazirmatn-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Vazirmatn-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Vazirmatn-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Vazirmatn-Bold.woff2', weight: '700', style: 'normal' },
  ],
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
  /**
   * Emitted by src/app/manifest.ts as a static file. Root-relative because
   * production is served from the custom-domain root.
   */
  manifest: '/manifest.webmanifest',
  /**
   * iOS home-screen behaviour. `statusBarStyle: 'default'` keeps the status
   * bar opaque and legible above the white masthead; 'black-translucent'
   * would slide the header under the clock and battery.
   *
   * The icon itself is not declared here — Next serves src/app/apple-icon.png
   * at /apple-icon.png and emits the <link> itself, and declaring it twice
   * would put two competing tags in the head.
   */
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: 'default',
  },
  /**
   * Next emits only the modern `mobile-web-app-capable` for `capable: true`.
   * iOS 15.4 and later launch standalone from the manifest's `display`, so
   * this legacy tag is not needed there — it is included for iOS older than
   * that, where it was the only signal, and it is inert everywhere else.
   */
  other: { 'apple-mobile-web-app-capable': 'yes' },
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
  /**
   * Lets the installed app paint into the notch and home-indicator areas
   * instead of being letterboxed. Everything that would otherwise sit under
   * them is inset in globals.css, and only while running standalone — a
   * normal browser tab gets no extra spacing.
   */
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Built on the server so the overlay ships an index, not the whole corpus.
  const searchIndex = buildSearchIndex();
  const suggestions = getPopularTags(10);

  return (
    <html lang="fa" dir="rtl" className={`${newsreader.variable} ${inter.variable} ${vazirmatn.variable}`}>
      <body className="min-h-dvh bg-surface-page">
        <SitePreloader />
        {/*
          Catches `beforeinstallprompt` before React exists.

          Chromium fires it as soon as it decides the app is installable, which
          is routinely earlier than hydration. A listener attached inside a
          component therefore misses it on most visits and the install
          suggestion can never be offered. This runs inline, holds the event on
          `window`, and re-announces it so PwaPrompts can pick it up whenever it
          mounts. preventDefault() suppresses Chromium's own mini-infobar.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){window.__ukmagInstallEvent=null;" +
              "window.addEventListener('beforeinstallprompt',function(e){" +
              "e.preventDefault();window.__ukmagInstallEvent=e;" +
              "window.dispatchEvent(new Event('ukmag:installable'));});" +
              "window.addEventListener('appinstalled',function(){" +
              "window.__ukmagInstallEvent=null;});})();",
          }}
        />

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

            {/* Installable-app layer. Both are client islands that render
                nothing until they have something to say, so the server-rendered
                page is unchanged, and PwaLayer stacks them so an update notice
                and a suggestion can never overlap. */}
            <PwaLayer>
              <ServiceWorkerRegistration />
              <PwaPrompts />
            </PwaLayer>
            </BookmarksProvider>
          </SearchProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
