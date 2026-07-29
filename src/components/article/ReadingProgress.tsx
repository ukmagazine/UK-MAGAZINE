'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin red progress bar pinned beneath the header.
 *
 * Purely decorative for assistive technology — the reader already has the
 * scrollbar — so it is hidden from the accessibility tree.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-header h-[3px] bg-transparent"
    >
      <motion.div
        className="h-full origin-left bg-brand-red"
        style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      />
    </div>
  );
}
