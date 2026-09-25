'use client';

import { useEffect } from 'react';
import { site } from '@/data/site';
import { startAnalytics, stopAnalytics } from '@/lib/analytics';
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_KEY,
  getConsent,
  type ConsentChoice,
} from '@/lib/consent';

/**
 * Applies the reader's analytics choice. Renders nothing.
 *
 * On mount it reads the stored choice: a returning reader who accepted is
 * measured from this page on; anyone else gets nothing loaded at all. It then
 * follows changes live — accepting starts measuring without a reload, and
 * withdrawing stops it at once and deletes the GA cookies. A change made in
 * another tab is followed too, through the `storage` event.
 *
 * There is deliberately no route-change effect here. Client-side navigations
 * are counted by GA4's enhanced measurement (browser-history page views), and
 * sending page_view from here as well would count each one twice.
 */
export function Analytics() {
  const id = site.analytics.gaMeasurementId;

  useEffect(() => {
    if (!id) return;

    const apply = (choice: ConsentChoice | null) => {
      if (choice === 'granted') startAnalytics(id);
      else if (choice === 'denied') stopAnalytics(id);
      // null: undecided. Nothing was ever loaded, so there is nothing to undo.
    };

    apply(getConsent());

    const onChange = (event: Event) => apply((event as CustomEvent<ConsentChoice>).detail);
    const onStorage = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY) return;
      const choice = getConsent();
      // Cleared or expired in another tab counts as withdrawn.
      apply(choice ?? 'denied');
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, [id]);

  return null;
}
