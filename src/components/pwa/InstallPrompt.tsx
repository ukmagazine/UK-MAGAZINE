'use client';

import { useState } from 'react';
import { PromptCard, PromptPrimary, PromptSecondary } from '@/components/pwa/PromptCard';
import type { BeforeInstallPromptEvent } from '@/lib/pwa';

interface InstallPromptProps {
  /** Captured Chromium event, or null on platforms that do not fire it. */
  deferred: BeforeInstallPromptEvent | null;
  /** True only for iOS Safari, the one iOS browser that can install a PWA. */
  iosSafari: boolean;
  /** Whether push is actually available, so the copy does not over-promise. */
  pushAvailable: boolean;
  onDismiss: () => void;
  onInstalled: () => void;
}

const TITLE = 'UK Magazine را همیشه همراه داشته باشید';

/**
 * The install recommendation.
 *
 * Chromium hands us a `beforeinstallprompt` event which we hold rather than
 * fire: `prompt()` is only called from the reader's own click, never on
 * arrival. iOS has no such API at all, so Safari users get the real manual
 * steps instead of a button that could not work.
 */
export function InstallPrompt({
  deferred,
  iosSafari,
  pushAvailable,
  onDismiss,
  onInstalled,
}: InstallPromptProps) {
  const [showIosSteps, setShowIosSteps] = useState(false);

  const body = pushAvailable
    ? 'برای دسترسی سریع‌تر به اخبار و دریافت خبرهای مهم، اپلیکیشن UK Magazine را نصب کنید.'
    : 'برای دسترسی سریع‌تر به اخبار، اپلیکیشن UK Magazine را روی دستگاه خود نصب کنید.';

  // ---------------------------------------------------------------- iOS --
  if (iosSafari) {
    if (showIosSteps) {
      return (
        <PromptCard
          title="افزودن به صفحهٔ خانه"
          body="در Safari دکمهٔ هم‌رسانی را در نوار پایین بزنید، سپس «Add to Home Screen» را انتخاب کنید."
          announcement="راهنمای نصب UK Magazine روی iPhone"
          onDismiss={onDismiss}
          dismissLabel="بستن راهنمای نصب"
        >
          <PromptPrimary onClick={onDismiss}>متوجه شدم</PromptPrimary>
        </PromptCard>
      );
    }

    return (
      <PromptCard
        title={TITLE}
        body={body}
        announcement="پیشنهاد نصب اپلیکیشن UK Magazine"
        onDismiss={onDismiss}
        dismissLabel="بستن پیشنهاد نصب"
      >
        <PromptPrimary onClick={() => setShowIosSteps(true)}>روش نصب</PromptPrimary>
        <PromptSecondary onClick={onDismiss}>بعداً</PromptSecondary>
      </PromptCard>
    );
  }

  // ----------------------------------------------------------- Chromium --
  const install = async () => {
    if (!deferred) return;
    try {
      await deferred.prompt();
      const { outcome } = await deferred.userChoice;
      // Either way the event is spent and cannot be reused; hide the card.
      if (outcome === 'accepted') onInstalled();
      else onDismiss();
    } catch {
      onDismiss();
    }
  };

  return (
    <PromptCard
      title={TITLE}
      body={body}
      announcement="پیشنهاد نصب اپلیکیشن UK Magazine"
      onDismiss={onDismiss}
      dismissLabel="بستن پیشنهاد نصب"
    >
      <PromptPrimary onClick={install}>نصب اپلیکیشن</PromptPrimary>
      <PromptSecondary onClick={onDismiss}>بعداً</PromptSecondary>
    </PromptCard>
  );
}
