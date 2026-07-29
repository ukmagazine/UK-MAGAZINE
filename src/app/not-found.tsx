import Link from 'next/link';
import { ArrowRight, Compass, Search } from 'lucide-react';
import { ArticleGrid } from '@/components/article/ArticleGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { categories } from '@/data/categories';
import { getLatest } from '@/lib/articles';

/** Custom 404 — offers a route back rather than a dead end. */
export default function NotFound() {
  const latest = getLatest(3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-24 w-24 bg-brand-red sm:h-36 sm:w-36"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        <div className="frame relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="label mb-4 flex items-center text-brand-red">
              <span aria-hidden="true" className="me-2 h-[3px] w-6 bg-brand-red" />
              Error 404
            </p>

            <p
              aria-hidden="true"
              className="tabular font-serif text-[5rem] font-semibold leading-none tracking-[-0.04em] text-line-strong sm:text-[8rem]"
            >
              404
            </p>

            <h1 className="mt-4 font-serif text-display tracking-[-0.025em] text-ink">
              This page is off the map.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              The story you were looking for may have been moved, renamed, or never existed at this
              address. Everything UK MAGAZINE has published is still one search away.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/"
                className="group inline-flex min-h-[48px] items-center gap-2 bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-red"
              >
                <Compass aria-hidden="true" className="h-4 w-4" />
                Back to the front page
              </Link>

              <Link
                href="/search"
                className="group inline-flex min-h-[48px] items-center gap-2 border border-ink px-6 text-sm font-semibold text-ink transition-colors hover:border-brand-red hover:text-brand-red"
              >
                <Search aria-hidden="true" className="h-4 w-4" />
                Search every story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="frame py-12 sm:py-16">
        <nav aria-labelledby="desks-heading">
          <h2 id="desks-heading" className="label mb-4 flex items-center text-ink">
            <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-brand-red" />
            Browse a desk
          </h2>

          <ul className="grid grid-cols-2 gap-x-6 border-t border-line sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <li key={category.slug} className="border-b border-line">
                <Link
                  href={`/category/${category.slug}`}
                  className="group flex min-h-[56px] items-center justify-between gap-2 py-3 text-ink transition-colors hover:text-brand-red"
                >
                  <span className="font-serif text-base sm:text-lg">{category.shortName}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:text-brand-red rtl:-scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="mt-16">
          <SectionHeader title="Today’s stories" href="/" linkLabel="See all" />
          <ArticleGrid articles={latest} columns={3} headingLevel="h3" />
        </section>
      </div>
    </>
  );
}
