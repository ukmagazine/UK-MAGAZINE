import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface StaticPageProps {
  /** Page title, as the reader sees it. Also the breadcrumb leaf. */
  title: string;
  /** Small uppercase kicker over the title. */
  kicker: string;
  /** Optional standfirst under the title. */
  standfirst?: string;
  children: ReactNode;
}

/**
 * Shared shell for the five editorial-standing pages (about, contact,
 * services, terms, privacy).
 *
 * They are Next.js routes, not WordPress pages: `scripts/sync-wordpress.ts`
 * fetches `/wp/v2/posts` only, so a WordPress *page* would never reach the
 * static export at all.
 *
 * The body is wrapped in `.static-prose`, which sets the reading measure and
 * the heading rhythm in globals.css so the five pages cannot drift apart.
 */
export function StaticPage({ title, kicker, standfirst, children }: StaticPageProps) {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line">
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-20 w-20 bg-brand-red sm:h-28 sm:w-28"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        <div className="frame relative py-10 sm:py-14">
          <nav aria-label="مسیر راهبری" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-soft">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-brand-red"
                >
                  خانه
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3 text-line-strong rtl:-scale-x-100" />
              </li>
              <li>
                <span className="font-medium text-ink">{title}</span>
              </li>
            </ol>
          </nav>

          <p className="label mb-2.5 flex items-center text-brand-red">
            <span aria-hidden="true" className="me-2 h-[3px] w-6 bg-brand-red" />
            {kicker}
          </p>

          <h1 className="max-w-3xl font-serif text-display tracking-[-0.025em] text-ink">
            {title}
          </h1>

          {standfirst ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {standfirst}
            </p>
          ) : null}
        </div>
      </header>

      <div className="frame py-12 sm:py-16">
        <div className="static-prose max-w-read">{children}</div>
      </div>
    </>
  );
}
