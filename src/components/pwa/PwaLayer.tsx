'use client';

import type { ReactNode } from 'react';
import { ConsentBanner } from '@/components/consent/ConsentBanner';
import { useConsentBannerOpen } from '@/components/consent/useConsentBanner';
import { cn } from '@/lib/utils';

/**
 * The single place anything pinned to the bottom of the viewport is allowed to
 * live: the consent banner, the update notice and the install / notification
 * suggestions.
 *
 * They were each `fixed` at the same offset with the same z-index, so whenever
 * two were on screen at once they sat on top of one another. Stacking them in
 * one flow container makes that impossible by construction, and means the
 * safe-area inset is applied once rather than repeated in every card.
 *
 * The consent banner comes first and comes alone. While it is open the stack
 * is hidden — still mounted, so the service worker keeps registering and page
 * views keep counting — and the update notice or a suggestion appears only
 * once the reader has chosen. The banner has its own geometry (a full-width
 * bar on mobile), which is why it sits outside the stack rather than in it.
 *
 * The container ignores pointer events so it never blocks the article
 * underneath; each card turns them back on for itself.
 */
export function PwaLayer({ children }: { children: ReactNode }) {
  const consentOpen = useConsentBannerOpen();

  return (
    <>
      {consentOpen ? <ConsentBanner /> : null}
      <div
        aria-hidden={consentOpen || undefined}
        className={cn(
          'pointer-events-none fixed inset-x-3 z-toast mx-auto max-w-md flex-col gap-2 sm:inset-x-4',
          consentOpen ? 'hidden' : 'flex',
        )}
        style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        {children}
      </div>
    </>
  );
}
