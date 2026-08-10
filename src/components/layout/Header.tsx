'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bookmark, Menu, Search } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useBookmarks } from '@/components/providers/BookmarksProvider';
import { useSearch } from '@/components/providers/SearchProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { categoryShortName } from '@/i18n/category';
import { fill } from '@/i18n/dictionaries';
import { Wordmark } from '@/components/ui/Wordmark';
import { primaryNavCategories } from '@/data/categories';
import { cn } from '@/lib/utils';

/**
 * `useLayoutEffect` warns when it runs during server rendering. The measurement
 * below has to happen before paint to avoid a visible reflow, so it is the
 * right hook — it simply must not be called on the server.
 */
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Sticky publication header.
 *
 * Minimal at the top of the page, compacting to a shorter bar with a hairline
 * border once scrolled. The active desk is marked with an animated rule that
 * slides between items via a shared `layoutId`.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSearch } = useSearch();
  const { ids, hydrated } = useBookmarks();
  const { t } = useLocale();

  /**
   * Overflow navigation.
   *
   * Ten Persian desk labels are appreciably wider than ten Latin ones and the
   * row shares the bar with the utilities and the masthead, so at the narrower
   * desktop widths not all of them fit. Rather than let the row wrap or clip,
   * the items are measured after layout and whatever does not fit is dropped
   * from the row — the «بیشتر» panel already lists every desk, so nothing
   * becomes unreachable.
   *
   * Starts at "all visible", which is what the server renders, so hydration
   * matches; the count is corrected before the first paint.
   */
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const moreRef = useRef<HTMLLIElement>(null);
  const [visibleCount, setVisibleCount] = useState(primaryNavCategories.length);

  const measure = useCallback(() => {
    const list = listRef.current;
    const more = moreRef.current;
    if (!list || !more) return;

    // `clientWidth` of the row, less the space the «بیشتر» control always needs.
    const available = list.clientWidth - more.offsetWidth;
    if (available <= 0) return;

    let used = 0;
    let fits = 0;
    for (const item of itemRefs.current) {
      if (!item) continue;
      // Width is read from the element even while it is hidden, so the
      // measurement does not depend on the current visible count.
      const width = item.getAttribute('data-width');
      const own = width ? Number(width) : item.offsetWidth;
      if (!width) item.setAttribute('data-width', String(own));
      if (used + own > available) break;
      used += own;
      fits += 1;
    }

    setVisibleCount(fits);
  }, []);

  useIsomorphicLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [measure]);

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
            {/* Start of the row — the RIGHT edge in RTL: the section menu. */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={t.nav.openMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={cn(iconButton, '-ms-2.5 shrink-0 xl:hidden')}
              >
                <Menu aria-hidden="true" className="h-5 w-5" />
              </button>

              {/* Primary navigation --------------------------------- */}
              <nav aria-label={t.nav.sections} className="hidden min-w-0 flex-1 xl:block">
                <ul ref={listRef} className="flex items-center gap-1 overflow-hidden">
                  {primaryNavCategories.map((category, index) => {
                    const href = `/category/${category.slug}`;
                    const active = pathname === href;

                    return (
                      <li
                        key={category.slug}
                        ref={(node) => {
                          itemRefs.current[index] = node;
                        }}
                        className={cn('shrink-0', index >= visibleCount && 'hidden')}
                      >
                        <Link
                          href={href}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'relative inline-flex min-h-[44px] items-center whitespace-nowrap px-2.5 text-sm font-medium transition-colors duration-200',
                            active ? 'text-ink' : 'text-ink-soft hover:text-ink',
                          )}
                        >
                          {categoryShortName(category)}
                          {/* Small dot marks the active desk; space is always
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

                  {/* More — opens the full section panel, and absorbs any desk
                      the row could not fit. */}
                  <li ref={moreRef} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setMenuOpen(true)}
                      aria-expanded={menuOpen}
                      aria-controls="mobile-menu"
                      className="relative inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap px-2.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
                    >
                      {t.nav.more}
                      <Menu aria-hidden="true" className="h-3.5 w-3.5" />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Utilities + masthead — the LEFT edge in RTL. ------- */}
            <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
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

              {/* Last in the row, so the masthead lands on the LEFT edge in
                  RTL — at every width, which is what the brand asks for. */}
              <div className="ms-2 shrink-0 xl:ms-6">
                <Wordmark />
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
