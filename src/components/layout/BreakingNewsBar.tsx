'use client';

import Link from 'next/link';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RelativeTime } from '@/components/ui/RelativeTime';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { BreakingItem } from '@/lib/types';
import { cn } from '@/lib/utils';

interface BreakingNewsBarProps {
  items: BreakingItem[];
}

/** How long each headline holds before rotating to the next. */
const ROTATE_MS = 6000;

/**
 * Slim premium breaking strip beneath the header.
 *
 * One headline at a time on a white ground, rotating on a timer with a gentle
 * fade — no ticker, no marquee. Hovering or the pause control stops the
 * rotation; reduced-motion users get the same rotation without the entrance
 * animation (the global reduced-motion CSS collapses it).
 */
export function BreakingNewsBar({ items }: BreakingNewsBarProps) {
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const { t } = useLocale();

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [paused, items.length]);

  if (items.length === 0) return null;

  const current = items[index] ?? items[0];

  return (
    <aside
      aria-label={t.breaking.label}
      className="border-b border-line bg-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="frame">
        <div className="flex h-11 items-center gap-3 sm:gap-4">
          <span className="label inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-brand-red px-2 py-1 text-white">
            <span
              className={cn('h-1.5 w-1.5 rounded-full bg-white', !paused && 'animate-pulse')}
              aria-hidden="true"
            />
            {t.breaking.label}
          </span>

          {/* Rotating headline — keyed so each one fades up on change. */}
          <p
            key={current.id}
            className="min-w-0 flex-1 animate-fade-up truncate text-sm text-ink"
          >
            <Link
              href={current.href}
              className="inline-flex h-11 max-w-full items-center truncate font-medium transition-colors hover:text-brand-red"
            >
              {current.text}
            </Link>
            <span className="ms-2 text-xs text-ink-soft">
              <RelativeTime iso={current.timestamp} />
            </span>
          </p>

          <Link
            href="/#latest"
            /* py-2 -my-2 lifts the hit area to 32px without changing the bar's height. */
            className="group hidden shrink-0 items-center gap-1 py-2 -my-2 text-xs font-medium text-ink-soft transition-colors hover:text-brand-red sm:inline-flex"
          >
            {t.breaking.viewAll}
            <ArrowRight
              aria-hidden="true"
              className="h-3 w-3 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 rtl:-scale-x-100"
            />
          </Link>

          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? t.breaking.resume : t.breaking.pause}
            className="-me-2.5 inline-flex h-11 w-11 shrink-0 items-center justify-center text-ink-soft transition-colors hover:text-brand-red"
          >
            {paused ? (
              <Play aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
            ) : (
              <Pause aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
