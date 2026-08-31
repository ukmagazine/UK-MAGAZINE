/*
 * OneSignal push worker.
 *
 * WHY IT LIVES IN ITS OWN DIRECTORY
 *
 * Only one service worker can control a given scope. The caching worker at
 * /sw.js owns '/' — it decides how every navigation, asset and image is
 * fetched. If the push SDK also registered at '/', one of the two would
 * replace the other and the site would silently lose either its offline
 * behaviour or its notifications.
 *
 * A worker's maximum scope is the directory it is served from, so serving this
 * file from /onesignal/ confines it to that scope. The two registrations never
 * overlap. A push subscription belongs to the registration that created it, so
 * push is delivered here regardless of the narrow scope, and notification
 * clicks still open any URL on the site through clients.openWindow().
 *
 * This file is only ever registered after a reader explicitly enables
 * notifications, and only when NEXT_PUBLIC_ONESIGNAL_APP_ID is configured —
 * see src/components/pwa/NotificationPrompt.tsx. Nothing is fetched from
 * OneSignal for a reader who never opts in.
 *
 * The push and notificationclick handlers come from the imported SDK. The
 * caching worker deliberately implements neither, so a single notification can
 * never be shown twice.
 */
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');
