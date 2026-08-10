'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Link2, Mail, Share2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { absoluteUrl } from '@/lib/seo';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  title: string;
  /** Site-relative path, e.g. `/article/slug/`. */
  path: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/** WhatsApp glyph — Lucide has no brand mark for it. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.42 5.83c0 4.55-3.71 8.25-8.26 8.25a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.55 3.7-8.25 8.25-8.25zm-3.4 4.4c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.19 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46z" />
    </svg>
  );
}

/**
 * Share controls with a copy-link confirmation.
 *
 * 🔴 The share URL is built from `site.url` + the article path, never from
 * `usePathname()` or `window.location` alone. Every target used to receive a
 * bare relative path — `?url=%2Farticle%2F…%2F` — which made all of them
 * silently useless, and it looked correct in the source.
 *
 * LinkedIn is gone: it is the wrong platform for this readership. WhatsApp,
 * which is where this audience actually forwards things, replaces it.
 */
export function ShareButtons({
  title,
  path,
  orientation = 'horizontal',
  className,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();

  // Resolved on the server and the client identically, so the href in the
  // static HTML is already the real canonical URL.
  const url = absoluteUrl(path);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard unavailable (insecure context or denied permission).
      // The share links beside this button remain usable.
    }
  }, [url]);

  const nativeShare = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.share) return;
    try {
      await navigator.share({ title, url });
    } catch {
      // The reader dismissed the share sheet; nothing to do.
    }
  }, [title, url]);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareTargets = [
    {
      label: 'هم‌رسانی در واتس‌اپ',
      // Title, a newline, then the absolute URL — the shape WhatsApp previews.
      href: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
      Icon: WhatsAppIcon,
    },
    {
      label: 'ارسال با ایمیل',
      href: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}`,
      Icon: Mail,
    },
  ];

  const buttonClass =
    'inline-flex h-11 w-11 items-center justify-center border border-line bg-surface text-ink-soft transition-colors duration-200 hover:border-ink hover:text-brand-red';

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        orientation === 'vertical' && 'flex-col',
        className,
      )}
    >
      <span className="label sr-only">هم‌رسانی این گزارش</span>

      {shareTargets.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={buttonClass}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}

      <button
        type="button"
        onClick={nativeShare}
        aria-label="هم‌رسانی این گزارش"
        className={cn(buttonClass, 'sm:hidden')}
      >
        <Share2 aria-hidden="true" className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? 'پیوند در حافظه کپی شد' : 'کپی پیوند این گزارش'}
        className={cn(buttonClass, copied && 'border-brand-red text-brand-red')}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? 'copied' : 'copy'}
            initial={reduced ? false : { scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="inline-flex"
          >
            {copied ? (
              <Check aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Link2 aria-hidden="true" className="h-4 w-4" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Announced to screen readers without moving focus. */}
      <span aria-live="polite" className="sr-only">
        {copied ? 'پیوند در حافظه کپی شد' : ''}
      </span>
    </div>
  );
}
