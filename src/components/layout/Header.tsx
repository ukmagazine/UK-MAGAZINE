'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bookmark, Menu, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useBookmarks } from '@/components/providers/BookmarksProvider';
import { useSearch } from '@/components/providers/SearchProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { categoryShortName } from '@/i18n/category';
import { fill } from '@/i18n/dictionaries';
import { Wordmark } from '@/components/ui/Wordmark';
import { primaryNavCategories } from '@/data/categories';
import { cn } from '@/lib/utils';

/**
 * Sticky publication header.
 *
 * Minimal at the top of the page, compacting to a shorter bar with a hairline
 * border once scrolled. The active desk is marked with an animated red rule
 * that slides between items via a shared `layoutId`.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSearch } = useSearch();
  const { ids, hydrated } = useBookmarks();
  const { t, locale } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile panel whenever navigation occurs.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const iconButton =
    'inline-flex h-11 w-11 items-center justify-center text-ink transition-colors duration-200 hover:text-brand-red';

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-header w-full bg-surface/95 backdrop-blur-[6px] transition-shadow duration-300',
          scrolled ? 'shadow-header' : 'border-b border-line lg:rounded-t-lg',
        )}
      >
        <div className="frame">
          <div
            className={cn(
              'relative flex items-center justify-between gap-4 transition-[height] duration-300 ease-editorial',
              scrolled ? 'h-header-sm' : 'h-header',
            )}
          >
            {/* Wordmark + navigation, grouped on the left ---------- */}
            <div className="flex items-center gap-3 xl:gap-8">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={t.nav.openMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={cn(iconButton, '-ms-2.5 xl:hidden')}
              >
                <Menu aria-hidden="true" className="h-5 w-5" />
              </button>

              {/* Centred over the row on mobile, flush left from xl. */}
              <div className="absolute left-1/2 -translate-x-1/2 xl:static xl:translate-x-0">
                <Wordmark />
              </div>

            {/* Primary navigation --------------------------------- */}
            <nav aria-label={t.nav.sections} className="hidden xl:block">
              <ul className="flex items-center gap-1">
                {primaryNavCategories.map((category) => {
                  const href = `/category/${category.slug}`;
                  const active = pathname === href;

                  return (
                    <li key={category.slug}>
                      <Link
                        href={href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'relative inline-flex min-h-[44px] items-center px-2.5 text-sm font-medium transition-colors duration-200',
                          active ? 'text-ink' : 'text-ink-soft hover:text-ink',
                        )}
                      >
                        {categoryShortName(category, locale)}
                        {/* Small red dot marks the active desk; space is always
                            reserved so the row never shifts. */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'ms-1.5 h-1 w-1 rounded-full bg-brand-red transition-opacity duration-200',
                            active ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {active ? (
                          <motion.span
                            layoutId="nav-active-indicator"
                            aria-hidden="true"
                            className="absolute inset-x-2.5 bottom-2 h-[2px] bg-brand-red"
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}

                {/* Opinion — a treatment rather than a desk, so it resolves
                    to the columns across every section. */}
                <li>
                  <Link
                    href="/search?q=opinion"
                    className="relative inline-flex min-h-[44px] items-center px-2.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
                  >
                    {t.nav.opinion}
                  </Link>
                </li>

                {/* More — opens the full section panel. */}
                <li>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    className="relative inline-flex min-h-[44px] items-center gap-1.5 px-2.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
                  >
                    {t.nav.more}
                    <Menu aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                </li>
              </ul>
            </nav>
            </div>

            {/* Utilities ------------------------------------------ */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={openSearch}
                aria-label={t.nav.search}
                className={iconButton}
              >
                <Search aria-hidden="true" className="h-5 w-5" />
              </button>

              <Link
                href="/bookmarks"
                aria-label={
                  hydrated && ids.length > 0
                    ? fill(t.nav.savedCount, { count: ids.length })
                    : t.nav.saved
                }
                className={cn(iconButton, 'relative')}
              >
                <Bookmark aria-hidden="true" className="h-5 w-5" />
                {hydrated && ids.length > 0 ? (
                  <span
                    aria-hidden="true"
                    className="tabular absolute right-1 top-1.5 flex h-4 min-w-[16px] items-center justify-center bg-brand-red px-[3px] text-[0.6rem] font-semibold leading-none text-white"
                  >
                    {ids.length > 9 ? '9+' : ids.length}
                  </span>
                ) : null}
              </Link>

              <LanguageSwitcher variant="toggle" className="ms-1 hidden sm:inline-flex" />

              {/* On mobile the logo is centred, so the utility cluster stays
                  lean; Subscribe lives in the slide-in menu below sm. */}
              <Link
                href="/newsletter"
                className="ms-2 hidden min-h-[40px] items-center rounded-sm bg-brand-red px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-deep sm:inline-flex"
              >
                {t.nav.subscribe}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
