import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LtrProps {
  children: ReactNode;
  className?: string;
  /** Renders as a link. `tel:` and `mailto:` are the usual cases. */
  href?: string;
}

/**
 * Isolates a left-to-right string inside right-to-left Persian text.
 *
 * Without this the Unicode bidirectional algorithm reorders the run against
 * the surrounding paragraph direction: `+44 7342 183060` renders as
 * `183060 7342 44+`, and a reader dials it wrong. The same applies to email
 * addresses and bare URLs.
 *
 * `dir="ltr"` sets the direction and `unicode-bidi: isolate` stops the run
 * from interacting with the text either side of it — both are needed; `dir`
 * alone still lets adjacent neutral characters (a trailing full stop, a
 * comma) migrate to the wrong end.
 *
 * ⚠️ Verify this visually in a browser. The HTML source reads correctly while
 * the rendered line is reversed, so reading the source proves nothing.
 */
export function Ltr({ children, className, href }: LtrProps) {
  const props = {
    dir: 'ltr' as const,
    style: { unicodeBidi: 'isolate' as const },
    className: cn('inline-block', className),
  };

  if (href) {
    return (
      <a {...props} href={href} className={cn(props.className, 'underline-offset-4 hover:underline')}>
        {children}
      </a>
    );
  }

  return <span {...props}>{children}</span>;
}
