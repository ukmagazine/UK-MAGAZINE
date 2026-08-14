'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';

const FULL_SEQUENCE_MS = 3500;
const REDUCED_SEQUENCE_MS = 120;

/**
 * A short, brand-led entrance shown once when the root layout first mounts.
 * Client-side route changes keep the layout alive, so navigation never waits
 * for the animation a second time.
 *
 * CSS also completes the exit independently: if hydration is delayed, the
 * overlay cannot strand the reader above an otherwise-ready page.
 */
export function SitePreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.classList.add('preloader-active');

    const timer = window.setTimeout(
      () => {
        root.classList.remove('preloader-active');
        setVisible(false);
      },
      reduceMotion ? REDUCED_SEQUENCE_MS : FULL_SEQUENCE_MS,
    );

    return () => {
      window.clearTimeout(timer);
      root.classList.remove('preloader-active');
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="site-preloader" aria-hidden="true">
      <div className="site-preloader__mesh" />
      <div className="site-preloader__beam" />

      <div className="site-preloader__content">
        <div className="site-preloader__mark-wrap">
          <span className="site-preloader__orbit" />
          <span className="site-preloader__mark">
            <Image
              src="/logo.png"
              alt=""
              width={160}
              height={160}
              priority
              unoptimized
            />
          </span>
        </div>

        <div className="site-preloader__lockup" dir="ltr">
          <p className="site-preloader__name">
            <span>{site.wordmark.lead}</span>
            <span>{site.wordmark.trail}</span>
          </p>
          <span className="site-preloader__rule" />
          <p className="site-preloader__tagline" dir="rtl">
            {site.tagline}
          </p>
        </div>
      </div>

      <div className="site-preloader__status" dir="ltr">
        <span>UK / EDITORIAL</span>
        <span>THEUKMAG.COM</span>
      </div>
    </div>
  );
}
