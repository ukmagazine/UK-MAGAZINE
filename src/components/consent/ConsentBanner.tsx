'use client';

import Link from 'next/link';
import { useEffect, useId, useRef } from 'react';
import { setConsent, type ConsentChoice } from '@/lib/consent';
import { wasReopened } from '@/components/consent/useConsentBanner';

const BUTTON =
  'inline-flex min-h-[44px] w-full items-center justify-center rounded-sm border border-brand-red bg-surface px-4 text-sm font-semibold text-brand-deep transition-colors duration-200 hover:bg-brand-wash focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red';

/**
 * The analytics consent banner (UK PECR / UK GDPR).
 *
 * «قبول» and «نه، ممنون» share one class, so neither is the easier or more
 * prominent choice. There is no close button and no pre-ticked option: the
 * banner stays until one of the two is clicked, and until then nothing is
 * loaded.
 *
 * Not a modal. On arrival it does not take focus — it is a labelled region at
 * the end of the page that a keyboard reaches in document order and a screen
 * reader hears announced. Opened from «تنظیمات کوکی» it does take focus, since
 * the reader asked for it, and hands it back to that link afterwards.
 *
 * Mobile: a full-width bar on the bottom edge. From `sm`: a small card in the
 * bottom start corner. While it is open the page gains bottom padding of the
 * banner's height, so the end of every article can still be scrolled clear of
 * it.
 */
export function ConsentBanner() {
  const titleId = useId();
  const bodyId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!wasReopened()) return;
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    firstButtonRef.current?.focus();
  }, []);

  // Reserve the banner's height at the foot of the page while it is open.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const body = document.body;
    const previous = body.style.paddingBottom;
    const apply = () => {
      body.style.paddingBottom = `${node.getBoundingClientRect().height}px`;
    };
    apply();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(apply) : null;
    observer?.observe(node);
    return () => {
      observer?.disconnect();
      body.style.paddingBottom = previous;
    };
  }, []);

  const choose = (choice: ConsentChoice) => {
    const target = returnFocusRef.current;
    setConsent(choice);
    if (target && target.isConnected) target.focus();
  };

  return (
    <>
      <p aria-live="polite" className="sr-only">
        تنظیمات کوکی: لطفاً دربارهٔ استفاده از Google Analytics انتخاب کنید.
      </p>

      <section
        ref={rootRef}
        aria-labelledby={titleId}
        aria-describedby={bodyId}
        className="pwa-prompt fixed inset-x-0 bottom-0 z-toast border-t border-line bg-surface px-4 pt-3 shadow-lift sm:inset-x-auto sm:bottom-4 sm:start-4 sm:w-[22rem] sm:rounded-lg sm:border sm:p-5"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-brand-red sm:inset-x-5 sm:rounded-b-sm"
        />

        <h2 id={titleId} className="sr-only">
          تنظیمات کوکی
        </h2>

        <p id={bodyId} className="text-sm leading-relaxed text-ink-strong">
          برای اینکه بفهمیم کدام مطالب برایتان مفیدتر است، با اجازهٔ شما از Google Analytics
          استفاده می‌کنیم. این ابزار کوکی روی دستگاه شما ذخیره می‌کند.{' '}
          <Link
            href="/privacy/"
            className="font-medium text-brand-red underline decoration-brand-red/40 underline-offset-4 hover:decoration-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            بیشتر بخوانید
          </Link>
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4">
          <button
            ref={firstButtonRef}
            type="button"
            onClick={() => choose('granted')}
            aria-label="قبول — استفاده از Google Analytics را می‌پذیرم"
            className={BUTTON}
          >
            قبول
          </button>
          <button
            type="button"
            onClick={() => choose('denied')}
            aria-label="نه، ممنون — Google Analytics استفاده نشود"
            className={BUTTON}
          >
            نه، ممنون
          </button>
        </div>
      </section>
    </>
  );
}
