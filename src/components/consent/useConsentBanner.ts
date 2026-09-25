'use client';

import { useSyncExternalStore } from 'react';
import { site } from '@/data/site';
import { CONSENT_CHANGE_EVENT, CONSENT_KEY, CONSENT_OPEN_EVENT, getConsent } from '@/lib/consent';

/**
 * Whether the consent banner is on screen, shared by the banner itself and by
 * PwaLayer, which holds every other bottom prompt back while it is.
 *
 * Open when the reader has no valid choice (first visit, or twelve months
 * on), or after «تنظیمات کوکی» until a choice is made. Always false on the
 * server, so the static HTML carries no banner and nothing hydrates wrongly.
 */

let reopened = false;
const listeners = new Set<() => void>();
let wired = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function wire() {
  if (wired) return;
  wired = true;
  window.addEventListener(CONSENT_OPEN_EVENT, () => {
    reopened = true;
    emit();
  });
  window.addEventListener(CONSENT_CHANGE_EVENT, () => {
    reopened = false;
    emit();
  });
  window.addEventListener('storage', (event) => {
    if (event.key === CONSENT_KEY) emit();
  });
}

function subscribe(listener: () => void) {
  wire();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): boolean {
  if (!site.analytics.gaMeasurementId) return false;
  return reopened || getConsent() === null;
}

const getServerSnapshot = () => false;

export function useConsentBannerOpen(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True only when the banner was reopened from the footer, not on arrival. */
export function wasReopened(): boolean {
  return reopened;
}
