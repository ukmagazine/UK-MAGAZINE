'use client';

import { useEffect, useState } from 'react';
import { formatRelative, formatStamp } from '@/lib/format';

interface RelativeTimeProps {
  iso: string;
  className?: string;
}

/**
 * Shows an absolute timestamp on the server and upgrades to a relative label
 * ("3h ago") once mounted. Rendering the absolute value first keeps the server
 * and client markup identical, so there is no hydration mismatch.
 */
export function RelativeTime({ iso, className }: RelativeTimeProps) {
  const absolute = formatStamp(iso);
  const [label, setLabel] = useState(absolute);

  useEffect(() => {
    const update = () => setLabel(formatRelative(iso));
    update();
    // Refresh once a minute so "just now" does not linger.
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [iso]);

  return (
    <time dateTime={iso} title={absolute} className={className}>
      {label}
    </time>
  );
}
