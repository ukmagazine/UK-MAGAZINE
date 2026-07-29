'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Link2, Linkedin, Mail, Share2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  title: string;
  /** Site-relative path; the absolute URL is resolved in the browser. */
  path: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/** Share controls with a copy-link confirmation. */
export function ShareButtons({
  title,
  path,
  orientation = 'horizontal',
  className,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();

  const resolveUrl = useCallback(
    () => (typeof window === 'undefined' ? path : new URL(path, window.location.origin).toString()),
    [path],
  );

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resolveUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard unavailable (insecure context or denied permission).
      // The share links beside this button remain usable.
    }
  }, [resolveUrl]);

  const nativeShare = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.share) return;
    try {
      await navigator.share({ title, url: resolveUrl() });
    } catch {
      // The reader dismissed the share sheet; nothing to do.
    }
  }, [title, resolveUrl]);

  const encodedTitle = encodeURIComponent(title);
  const shareTargets = [
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(path)}`,
      Icon: Linkedin,
    },
    {
      label: 'Share by email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%20${encodeURIComponent(path)}`,
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
      <span className="label sr-only">Share this article</span>

      {shareTargets.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={buttonClass}
        >
          <Icon aria-hidden="true" className="h-4 w-4" />
        </a>
      ))}

      <button
        type="button"
        onClick={nativeShare}
        aria-label="Share this article"
        className={cn(buttonClass, 'sm:hidden')}
      >
        <Share2 aria-hidden="true" className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? 'Link copied to clipboard' : 'Copy link to this article'}
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
        {copied ? 'Link copied to clipboard' : ''}
      </span>
    </div>
  );
}
