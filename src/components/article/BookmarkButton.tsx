'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '@/components/providers/BookmarksProvider';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  articleId: string;
  /** Used in the accessible label so screen readers know which story. */
  title: string;
  variant?: 'icon' | 'labelled';
  /** Light treatment for placement over imagery. */
  inverted?: boolean;
  className?: string;
}

/**
 * Saves or removes a story. State lives in `BookmarksProvider` and persists to
 * localStorage, so the control reflects the same value everywhere it appears.
 */
export function BookmarkButton({
  articleId,
  title,
  variant = 'icon',
  inverted = false,
  className,
}: BookmarkButtonProps) {
  const { isBookmarked, toggle, hydrated } = useBookmarks();
  const reduced = useReducedMotion();
  const saved = isBookmarked(articleId);

  const label = saved
    ? `حذف «${title}» از ذخیره‌شده‌ها`
    : `ذخیرهٔ «${title}» برای خواندن بعدی`;

  if (variant === 'labelled') {
    return (
      <button
        type="button"
        onClick={() => toggle(articleId)}
        aria-pressed={saved}
        aria-label={label}
        className={cn(
          'inline-flex min-h-[44px] items-center gap-2 border px-4 text-sm font-medium transition-colors duration-200',
          saved
            ? 'border-brand-red bg-brand-wash text-brand-deep'
            : 'border-line bg-surface text-ink hover:border-ink hover:text-brand-red',
          className,
        )}
      >
        {saved ? (
          <BookmarkCheck aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Bookmark aria-hidden="true" className="h-4 w-4" />
        )}
        <span>{saved ? 'ذخیره شد' : 'ذخیرهٔ گزارش'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(articleId)}
      aria-pressed={saved}
      aria-label={label}
      // Visually 32px, but the touch target is padded out to 44px.
      className={cn(
        'group relative -m-[6px] inline-flex h-11 w-11 items-center justify-center transition-colors',
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center border transition-colors duration-200',
          saved
            ? 'border-brand-red bg-brand-red text-white'
            : inverted
              ? 'border-white/40 bg-black/25 text-white backdrop-blur-[2px] hover:border-white hover:bg-black/40'
              : 'border-line bg-surface/90 text-ink-soft hover:border-ink hover:text-brand-red',
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={saved ? 'saved' : 'unsaved'}
            initial={reduced || !hydrated ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex"
          >
            {saved ? (
              <BookmarkCheck aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Bookmark aria-hidden="true" className="h-4 w-4" />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
