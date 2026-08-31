'use client';

import { useState } from 'react';
import { PromptCard, PromptPrimary, PromptSecondary } from '@/components/pwa/PromptCard';
import { ONESIGNAL_APP_ID, enablePushNotifications } from '@/lib/push';
import { isIos, isStandalone } from '@/lib/pwa';

interface NotificationPromptProps {
  onDismiss: () => void;
  onEnabled: () => void;
}

type Stage = 'ask' | 'ios-install-first' | 'working' | 'failed';

/**
 * The notification recommendation — step one of a deliberate two-step flow.
 *
 * The browser's own permission dialog is never triggered on arrival. This card
 * explains what the notifications are for in the publication's own words, and
 * only a click on «فعال‌سازی اعلان‌ها» reaches
 * `Notification.requestPermission()`. A permission dialog a reader did not ask
 * for is usually denied for good, and a denial cannot be undone from script.
 *
 * The provider SDK is imported only at that moment, so a reader who never opts
 * in never downloads it.
 */
export function NotificationPrompt({ onDismiss, onEnabled }: NotificationPromptProps) {
  const [stage, setStage] = useState<Stage>('ask');

  const enable = async () => {
    /**
     * iOS only delivers web push to an installed PWA (iOS 16.4+). Asking for
     * permission in the Safari tab cannot work, so say what actually does.
     */
    if (isIos() && !isStandalone()) {
      setStage('ios-install-first');
      return;
    }

    setStage('working');
    const result = await enablePushNotifications();
    if (result === 'granted') onEnabled();
    else if (result === 'denied') onDismiss();
    else setStage('failed');
  };

  if (stage === 'ios-install-first') {
    return (
      <PromptCard
        title="ابتدا اپلیکیشن را نصب کنید"
        body="در iPhone و iPad، اعلان‌ها فقط برای نسخهٔ نصب‌شده کار می‌کنند. در Safari دکمهٔ هم‌رسانی را بزنید، «Add to Home Screen» را انتخاب کنید و سپس اپلیکیشن UK Magazine را باز کنید."
        announcement="برای دریافت اعلان‌ها در iPhone ابتدا باید اپلیکیشن نصب شود"
        onDismiss={onDismiss}
        dismissLabel="بستن"
      >
        <PromptPrimary onClick={onDismiss}>متوجه شدم</PromptPrimary>
      </PromptCard>
    );
  }

  if (stage === 'failed') {
    return (
      <PromptCard
        title="فعال‌سازی اعلان‌ها ممکن نشد"
        body="اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید. اگر مرورگر شما اعلان‌ها را مسدود کرده باشد، باید از تنظیمات مرورگر آن را باز کنید."
        announcement="فعال‌سازی اعلان‌ها ممکن نشد"
        onDismiss={onDismiss}
        dismissLabel="بستن"
      >
        <PromptPrimary onClick={onDismiss}>باشد</PromptPrimary>
      </PromptCard>
    );
  }

  return (
    <PromptCard
      title="از خبرهای مهم جا نمانید"
      body="اعلان خبرهای فوری و مهم UK Magazine را دریافت کنید. هر خبری اعلان نمی‌شود — فقط مهم‌ترین‌ها."
      announcement="پیشنهاد فعال‌سازی اعلان‌های UK Magazine"
      onDismiss={onDismiss}
      dismissLabel="بستن پیشنهاد اعلان‌ها"
    >
      <PromptPrimary onClick={enable}>
        {stage === 'working' ? 'در حال فعال‌سازی…' : 'فعال‌سازی اعلان‌ها'}
      </PromptPrimary>
      <PromptSecondary onClick={onDismiss}>فعلاً نه</PromptSecondary>
    </PromptCard>
  );
}

/** Push is only offered when a provider app id has actually been configured. */
export const PUSH_CONFIGURED = ONESIGNAL_APP_ID.length > 0;
