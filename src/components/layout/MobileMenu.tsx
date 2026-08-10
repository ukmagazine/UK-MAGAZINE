'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight, Bookmark, Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useSearch } from '@/components/providers/SearchProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { categoryName } from '@/i18n/category';
import { usePresence } from '@/hooks/usePresence';
import { Wordmark } from '@/components/ui/Wordmark';
import { footerCategories } from '@/data/categories';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Exit animation duration, shared by the motion config and the unmount timer. */
const EXIT_MS = 340;

/**
 * Slide-in navigation panel, and the overflow target for the desktop row.
 *
 * Implemented as a modal dialog: focus moves into the panel on open, Escape
 * closes it, Tab is trapped inside, and the page behind it cannot scroll.
 *
 * Lists `footerCategories` — the ten navigation desks plus `spotlight`. Hidden
 * desks are navigation, footer and index invisible; this is navigation.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const { openSearch } = useSearch();
  const { t, isRtl } = useLocale();

  // Stay mounted for the slide-out, then unmount deterministically —
  // see usePresence for why AnimatePresence is not used here.
  const { present, entered } = usePresence(open, EXIT_MS, Boolean(reduced));

  // Lock background scrolling while the panel is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus into the panel, and trap it there.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!present) return null;

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-menu bg-ink/50 backdrop-blur-[2px] transition-opacity duration-300 ease-editorial',
          entered ? 'opacity-100' : 'opacity-0',
          // Never intercept clicks unless the menu is actually open.
          entered ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      />

      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.sections}
        className={cn(
          'fixed inset-y-0 start-0 z-menu flex w-[88%] max-w-sm flex-col bg-surface shadow-overlay transition-transform duration-[340ms] ease-editorial',
          entered ? 'translate-x-0' : isRtl ? 'translate-x-full' : '-translate-x-full',
          entered ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div className="flex h-header items-center justify-between border-b border-line px-5">
          <Wordmark />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.nav.closeMenu}
            className="-me-2.5 inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-brand-red"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
          <button
            type="button"
            onClick={() => {
              onClose();
              openSearch();
            }}
            className="flex min-h-[48px] w-full items-center gap-3 border border-line px-4 text-start text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            <Search aria-hidden="true" className="h-4 w-4" />
            {t.search.overlayPlaceholder}
          </button>

          <nav aria-label={t.nav.sections} className="mt-7">
            <p className="label mb-3 flex items-center text-ink-soft">
              <span aria-hidden="true" className="me-2 h-[3px] w-4 bg-brand-red" />
              {t.nav.sections}
            </p>

            <ul className="border-t border-line">
              {footerCategories.map((category) => {
                const href = `/category/${category.slug}`;
                const active = pathname === href;

                return (
                  <li key={category.slug} className="border-b border-line">
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group flex min-h-[52px] items-center justify-between gap-3 py-3 transition-colors',
                        active ? 'text-brand-red' : 'text-ink hover:text-brand-red',
                      )}
                    >
                      <span className="font-serif text-lg">{categoryName(category)}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:text-brand-red rtl:-scale-x-100"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-7">
            <Link
              href="/bookmarks"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 border border-line text-sm font-medium text-ink transition-colors hover:border-ink hover:text-brand-red"
            >
              <Bookmark aria-hidden="true" className="h-4 w-4" />
              {t.nav.saved}
            </Link>
          </div>

          <div className="mt-7 border-t border-line pt-5">
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about/"
                  className="inline-flex min-h-[36px] items-center text-sm text-ink-soft transition-colors hover:text-brand-red"
                >
                  دربارهٔ ما
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
