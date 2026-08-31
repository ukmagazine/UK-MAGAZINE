'use client';

import type { ReactNode } from 'react';

/**
 * The single place anything pinned to the bottom of the viewport is allowed to
 * live: the update notice and the install / notification suggestions.
 *
 * They were each `fixed` at the same offset with the same z-index, so whenever
 * two were on screen at once they sat on top of one another. Stacking them in
 * one flow container makes that impossible by construction, and means the
 * safe-area inset is applied once rather than repeated in every card.
 *
 * The container ignores pointer events so it never blocks the article
 * underneath; each card turns them back on for itself.
 */
export function PwaLayer({ children }: { children: ReactNode }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-3 z-toast mx-auto flex max-w-md flex-col gap-2 sm:inset-x-4"
      style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      {children}
    </div>
  );
}
