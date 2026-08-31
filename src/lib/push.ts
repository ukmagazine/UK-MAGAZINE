/**
 * Web push, via OneSignal.
 *
 * WHY A PROVIDER AND NOT RAW VAPID
 *
 * The site is a static export on GitHub Pages. Sending a push requires a
 * secret signing key and a server that holds it, which this deployment has
 * nowhere to put. Raw Web Push would therefore mean building and hosting a
 * subscription store and a sender before the first notification could go out.
 * OneSignal supplies both, plus the dashboard the newsroom actually needs to
 * send a breaking-news alert without a developer or a code change.
 *
 * WHAT IS PUBLIC AND WHAT IS NOT
 *
 * The App ID below is a public client identifier — it identifies the app to
 * the browser and is visible in any web client by design. The REST API Key,
 * which can send notifications to every subscriber, is a SECRET: it belongs on
 * a server or in the OneSignal dashboard, and must never appear in this
 * repository, in `NEXT_PUBLIC_*`, or in any bundle.
 *
 * SERVICE WORKER
 *
 * The SDK is pointed at /onesignal/OneSignalSDKWorker.js with scope
 * '/onesignal/' so it cannot collide with the caching worker at '/'. See the
 * comment in that file.
 */

/**
 * Public client identifier, inlined at build time. Empty when push has not
 * been configured, in which case the notification UI never appears — better
 * than offering a feature that cannot work.
 */
export const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID ?? '';

const SDK_URL = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';

type OneSignalApi = {
  init(config: Record<string, unknown>): Promise<void>;
  Notifications: {
    permission: boolean;
    requestPermission(): Promise<void>;
  };
};

declare global {
  interface Window {
    OneSignalDeferred?: Array<(api: OneSignalApi) => void | Promise<void>>;
  }
}

/** Loaded at most once, however many times the reader opens the prompt. */
let sdkPromise: Promise<OneSignalApi> | null = null;

function loadSdk(): Promise<OneSignalApi> {
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<OneSignalApi>((resolve, reject) => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];

    const script = document.createElement('script');
    script.src = SDK_URL;
    script.defer = true;
    script.onerror = () => {
      // Offline, or blocked by an extension or a content blocker.
      sdkPromise = null;
      reject(new Error('OneSignal SDK failed to load'));
    };
    document.head.appendChild(script);

    window.OneSignalDeferred.push(async (OneSignal) => {
      try {
        await OneSignal.init({
          appId: ONESIGNAL_APP_ID,
          // Keeps the provider worker out of the caching worker's scope.
          serviceWorkerPath: 'onesignal/OneSignalSDKWorker.js',
          serviceWorkerParam: { scope: '/onesignal/' },
          /**
           * No automatic prompting. The permission request is triggered by the
           * reader's click in NotificationPrompt and nowhere else, so the
           * provider's own slidedown must stay switched off.
           */
          promptOptions: { slidedown: { prompts: [] } },
          autoResubscribe: true,
        });
        resolve(OneSignal);
      } catch (error) {
        sdkPromise = null;
        reject(error instanceof Error ? error : new Error('OneSignal init failed'));
      }
    });
  });

  return sdkPromise;
}

export type PushResult = 'granted' | 'denied' | 'error';

/**
 * Loads the provider and asks the browser for permission.
 *
 * Only ever called from a click handler: `requestPermission()` requires a user
 * gesture, and a denial is effectively permanent, so it must never be spent on
 * a reader who has not asked for it.
 */
export async function enablePushNotifications(): Promise<PushResult> {
  if (!ONESIGNAL_APP_ID) return 'error';
  if (typeof window === 'undefined' || !('Notification' in window)) return 'error';

  try {
    const OneSignal = await loadSdk();
    await OneSignal.Notifications.requestPermission();
    return Notification.permission === 'granted' ? 'granted' : 'denied';
  } catch {
    return 'error';
  }
}

export type NotificationState = 'unsupported' | 'unconfigured' | 'default' | 'granted' | 'denied';

/**
 * The real state, read from the browser rather than from anything we stored —
 * permission can be changed or reset in browser settings at any time, and a
 * remembered value would drift out of step with it.
 */
export function getNotificationState(): NotificationState {
  if (typeof window === 'undefined') return 'unsupported';
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return 'unsupported';
  if (!ONESIGNAL_APP_ID) return 'unconfigured';
  const permission = Notification.permission;
  if (permission === 'granted') return 'granted';
  if (permission === 'denied') return 'denied';
  return 'default';
}
