'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  headings: ReadonlyArray<{ id: string; text: string }>;
  className?: string;
}

/**
 * Section index for the article side rail, highlighting the section currently
 * in view. Falls back to a plain anchor list without JavaScript.
 */
export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Bias the active band toward the upper third of the viewport.
      { rootMargin: '-120px 0px -66% 0px', threshold: 0 },
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-labelledby="toc-heading" className={cn(className)}>
      <h2 id="toc-heading" className="label mb-3 flex items-center text-ink">
        <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-brand-red" />
        In this article
      </h2>

      <ol className="space-y-0 border-s border-line">
        {headings.map((heading, index) => {
          const active = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  '-ms-px flex min-h-[44px] items-start gap-2.5 border-s-2 py-2 ps-4 text-sm leading-snug transition-colors duration-200',
                  active
                    ? 'border-brand-red font-medium text-ink'
                    : 'border-transparent text-ink-soft hover:border-line-strong hover:text-ink',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'tabular pt-[1px] text-xs font-semibold',
                    active ? 'text-brand-red' : 'text-ink-faint',
                  )}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">{heading.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
