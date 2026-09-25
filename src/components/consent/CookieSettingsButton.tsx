'use client';

import { openConsentSettings } from '@/lib/consent';

/**
 * «تنظیمات کوکی» in the footer. A button, not a link: it opens the consent
 * banner in place rather than going anywhere. Styled to match the footer
 * links around it.
 */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className={className}
    >
      تنظیمات کوکی
    </button>
  );
}
