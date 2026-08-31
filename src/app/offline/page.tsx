import type { Metadata } from 'next';
import { WifiOff } from 'lucide-react';
import { OfflineRetry } from '@/components/pwa/OfflineRetry';
import { buildMetadata } from '@/lib/seo';

/**
 * The fallback the service worker serves when a navigation fails and nothing
 * matching is in the cache. It is a normal statically exported route, so it is
 * also reachable directly and is precached on install.
 *
 * Deliberately not indexed: it carries no editorial content and would be a
 * poor search result.
 */
export const metadata: Metadata = buildMetadata({
  title: 'اتصال اینترنت در دسترس نیست',
  description: 'برای دریافت جدیدترین مطالب UK Magazine اتصال اینترنت خود را بررسی کنید.',
  path: '/offline/',
  noIndex: true,
});

export default function OfflinePage() {
  return (
    <div className="frame flex flex-1 items-center justify-center py-16 sm:py-24">
      <div className="mx-auto max-w-md text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-wash text-brand-red"
        >
          <WifiOff className="h-7 w-7" />
        </span>

        <h1 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
          اتصال اینترنت در دسترس نیست
        </h1>

        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          برای دریافت جدیدترین مطالب UK Magazine اتصال اینترنت خود را بررسی کنید.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-ink-faint">
          مطالبی که پیش‌تر باز کرده‌اید، همچنان بدون اینترنت در دسترس‌اند.
        </p>

        <OfflineRetry />
      </div>
    </div>
  );
}
