'use client';

import { useEffect, useState } from 'react';

export interface Presence {
  /** Whether the element should be in the DOM at all. */
  present: boolean;
  /**
   * Whether it should be in its *open* visual state. Stays false for one frame
   * after mounting so the browser has a "from" state to transition out of.
   */
  entered: boolean;
}

/**
 * Drives an enter/exit transition without a animation library.
 *
 * Overlays here are animated with plain CSS transitions rather than Framer
 * Motion. Framer twice left these panels in a broken state — first by not
 * unmounting them (`AnimatePresence`), then by rendering a stale `animate`
 * value, which produced an invisible full-screen scrim that swallowed every
 * click. A mounted flag plus a one-frame delay is fully deterministic.
 *
 * @param open     whether the element should be visible
 * @param exitMs   duration of the exit transition, in milliseconds
 * @param instant  skip both delays (reduced-motion readers)
 */
export function usePresence(open: boolean, exitMs: number, instant = false): Presence {
  const [present, setPresent] = useState(open);
  const [entered, setEntered] = useState(open);

  // Mount immediately on open; delay unmount until the exit has played.
  useEffect(() => {
    if (open) {
      setPresent(true);
      return;
    }
    setEntered(false);
    if (instant) {
      setPresent(false);
      return;
    }
    const timer = window.setTimeout(() => setPresent(false), exitMs);
    return () => window.clearTimeout(timer);
  }, [open, exitMs, instant]);

  // Once mounted, flip to the open state on the next frame so the transition
  // has a "from" state to run out of.
  useEffect(() => {
    if (!open || !present) return;
    if (instant) {
      setEntered(true);
      return;
    }

    // rAF gives the cleanest first frame, but it never fires while the tab is
    // not compositing (backgrounded, or a hidden preview pane) — which would
    // leave the panel mounted and permanently closed. The timer guarantees the
    // open state is reached either way.
    const frame = window.requestAnimationFrame(() => setEntered(true));
    const fallback = window.setTimeout(() => setEntered(true), 50);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, [open, present, instant]);

  return { present, entered };
}
