'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { NotificationPrompt } from '@/components/pwa/NotificationPrompt';
import { getNotificationState } from '@/lib/push';
import {
  INSTALL_MIN_VIEWS,
  INSTALL_SNOOZE_DAYS,
  NOTIFY_MIN_VIEWS,
  NOTIFY_SNOOZE_DAYS,
  PWA_KEYS,
  isIosSafari,
  isSnoozed,
  isStandalone,
  recordView,
  snooze,
  type BeforeInstallPromptEvent,
} from '@/lib/pwa';

/**
 * Decides which single suggestion — if any — a reader sees.
 *
 * Never more than one at a time, and never on arrival. The order is
 * deliberate: install is offered first, and notifications only much later,
 * because a reader who has installed the app is the one for whom breaking-news
 * alerts actually make sense.
 *
 * Nothing renders until after mount, so the server and client markup agree.
 */
export function PwaPrompts() {
  const pathname = usePathname();
  const [views, setViews] = useState(0);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState<'install' | 'notify' | null>(null);
  const [mounted, setMounted] = useState(false);
  const countedPath = useRef<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setInstalled(isStandalone());

    /**
     * The event usually arrives before this component exists, so the inline
     * script in the document head catches it and parks it on `window`. Read
     * whatever is already there, then listen for both the re-announcement and
     * the real event, in case it has not fired yet.
     */
    const adopt = () => {
      const held = window.__ukmagInstallEvent;
      if (held) setDeferred(held);
    };
    adopt();

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };

    window.addEventListener('ukmag:installable', adopt);
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('ukmag:installable', adopt);
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  // One count per distinct route. The layout is not remounted by client-side
  // navigation, so this is what makes a second article count as a second view.
  useEffect(() => {
    if (!mounted || countedPath.current === pathname) return;
    countedPath.current = pathname;
    setViews(recordView());
  }, [mounted, pathname]);

  const dismissInstall = useCallback(() => {
    snooze(PWA_KEYS.installSnoozedUntil, INSTALL_SNOOZE_DAYS);
    setDismissed('install');
  }, []);

  const dismissNotify = useCallback(() => {
    snooze(PWA_KEYS.notifySnoozedUntil, NOTIFY_SNOOZE_DAYS);
    setDismissed('notify');
  }, []);

  if (!mounted) return null;
  // The offline page is not the moment to ask for anything.
  if (pathname === '/offline' || pathname === '/offline/') return null;

  const pushState = getNotificationState();
  const pushAvailable = pushState !== 'unsupported' && pushState !== 'unconfigured';

  const canInstall =
    !installed &&
    dismissed !== 'install' &&
    views >= INSTALL_MIN_VIEWS &&
    !isSnoozed(PWA_KEYS.installSnoozedUntil) &&
    (deferred !== null || isIosSafari());

  if (canInstall) {
    return (
      <InstallPrompt
        deferred={deferred}
        iosSafari={deferred === null && isIosSafari()}
        pushAvailable={pushAvailable}
        onDismiss={dismissInstall}
        onInstalled={() => setInstalled(true)}
      />
    );
  }

  /**
   * Only once install is out of the way — accepted, snoozed, or impossible on
   * this platform. `default` is the only permission worth asking about:
   * `granted` is already done and `denied` cannot be reopened from script.
   */
  const canNotify =
    dismissed !== 'notify' &&
    pushState === 'default' &&
    views >= NOTIFY_MIN_VIEWS &&
    !isSnoozed(PWA_KEYS.notifySnoozedUntil);

  if (canNotify) {
    return <NotificationPrompt onDismiss={dismissNotify} onEnabled={() => setDismissed('notify')} />;
  }

  return null;
}
