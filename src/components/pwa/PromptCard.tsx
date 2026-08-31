'use client';

import { X } from 'lucide-react';
import { useId, type ReactNode } from 'react';

interface PromptCardProps {
  title: string;
  body: string;
  /** Announced politely when the card appears, without moving focus. */
  announcement: string;
  children: ReactNode;
  onDismiss: () => void;
  dismissLabel: string;
}

/**
 * The shared shell for the install and notification suggestions.
 *
 * Deliberately NOT a modal. These are recommendations that appear while
 * someone is reading, so they must not trap focus, must not cover the article,
 * and must not steal focus from the text. It is a labelled region that sits at
 * the bottom of the viewport, is reachable by keyboard in normal document
 * order, and announces itself politely to a screen reader.
 *
 * Positioning belongs to PwaLayer, which stacks every bottom-pinned element
 * so two of them can never overlap.
 */
export function PromptCard({
  title,
  body,
  announcement,
  children,
  onDismiss,
  dismissLabel,
}: PromptCardProps) {
  const titleId = useId();

  return (
    <>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <section
        aria-labelledby={titleId}
        className="pwa-prompt pointer-events-auto relative rounded-lg border border-line bg-surface p-5 shadow-lift"
      >
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className="absolute left-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-sm text-ink-faint transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>

        <h2 id={titleId} className="pe-10 font-serif text-lg leading-snug text-ink">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">{children}</div>
      </section>
    </>
  );
}

/** Primary action — the one the reader is being invited to take. */
export function PromptPrimary({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-sm bg-brand-red px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
    >
      {children}
    </button>
  );
}

/** Secondary action — declining, which is always one tap away. */
export function PromptSecondary({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-line px-5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
    >
      {children}
    </button>
  );
}
