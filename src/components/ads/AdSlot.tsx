import Image from 'next/image';
import type { ElementType } from 'react';
import { getActiveAd, type Ad } from '@/data/ads';
import { cn } from '@/lib/utils';

interface AdSlotProps {
  placement: Ad['placement'];
  className?: string;
  /** Useful when the slot must be a valid direct child of an <ol>/<ul>. */
  as?: 'aside' | 'div' | 'li';
}

/**
 * One advertising slot. With no active campaign it returns `null`, including
 * its wrapper, so empty ad inventory never leaves visual gaps in the layout.
 */
export function AdSlot({ placement, className, as = 'aside' }: AdSlotProps) {
  const ad = getActiveAd(placement);
  if (!ad) return null;

  const Tag = as as ElementType;

  return (
    <Tag className={cn('my-6', className)} aria-label={`تبلیغ از ${ad.advertiser}`}>
      <div className="overflow-hidden rounded-md border border-line bg-surface-soft p-3 sm:p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="rounded-sm bg-brand-wash px-2 py-1 text-xs font-bold text-brand-deep">
            تبلیغ
          </span>
          <span className="text-xs text-ink-soft">{ad.advertiser}</span>
        </div>

        <a
          href={ad.href}
          target="_blank"
          rel="sponsored noopener"
          className="group block"
        >
          <div className="relative aspect-[16/5] min-h-24 overflow-hidden rounded-sm bg-surface">
            <Image
              src={ad.image}
              alt={ad.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover transition-transform duration-300 ease-editorial group-hover:scale-[1.01]"
            />
          </div>
        </a>
      </div>
    </Tag>
  );
}
