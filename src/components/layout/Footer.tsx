'use client';

import Link from 'next/link';
import { Linkedin, Rss, Youtube } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { Wordmark } from '@/components/ui/Wordmark';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useLocale } from '@/components/providers/LocaleProvider';
import { categoryShortName } from '@/i18n/category';
import { categories } from '@/data/categories';
import { site } from '@/data/site';

const SOCIAL_ICONS = {
  x: XIcon,
  linkedin: Linkedin,
  youtube: Youtube,
  rss: Rss,
} as const;

/** Simple X glyph — Lucide has no brand mark for it. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** Dark charcoal footer with restrained red accents. */
export function Footer() {
  const { t, locale } = useLocale();
  const year = new Date(Date.parse('2026-01-01T00:00:00.000Z')).getUTCFullYear();

  return (
    <footer className="mt-20 bg-surface-char text-white sm:mt-24 lg:rounded-b-lg">
      <span aria-hidden="true" className="block h-[3px] w-full bg-brand-red" />

      <div className="frame py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand + newsletter --------------------------------- */}
          <div className="lg:col-span-5">
            <Wordmark inverted />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {site.description}
            </p>

            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-white/40">
              {site.established}
            </p>

            <div className="mt-8 max-w-sm">
              <p className="label mb-3 flex items-center text-white">
                <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-brand-red" />
                {t.footer.dailyBrief}
              </p>
              <NewsletterForm inverted buttonLabel={t.footer.join} />
            </div>
          </div>

          {/* Link columns --------------------------------------- */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <nav aria-labelledby="footer-sections">
              <h2 id="footer-sections" className="label mb-4 text-white/50">
                {t.footer.sections}
              </h2>
              <ul className="space-y-2.5">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="inline-flex min-h-[44px] items-center text-sm text-white/75 transition-colors hover:text-brand-red"
                    >
                      {categoryShortName(category, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-company">
              <h2 id="footer-company" className="label mb-4 text-white/50">
                {t.footer.company}
              </h2>
              <ul className="space-y-2.5">
                {site.footer.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-[44px] items-center text-sm text-white/75 transition-colors hover:text-brand-red"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-legal">
              <h2 id="footer-legal" className="label mb-4 text-white/50">
                {t.footer.legal}
              </h2>
              <ul className="space-y-2.5">
                {site.footer.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-[44px] items-center text-sm text-white/75 transition-colors hover:text-brand-red"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Base bar --------------------------------------------- */}
        <div className="mt-12 flex flex-col gap-6 border-t border-line-dark pt-8 sm:mt-14 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-1">
            {site.social.map((entry) => {
              const Icon = SOCIAL_ICONS[entry.icon];
              return (
                <a
                  key={entry.icon}
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={entry.label}
                  className="inline-flex h-11 w-11 items-center justify-center text-white/60 transition-colors hover:text-brand-red"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <LanguageSwitcher inverted variant="select" />

            <p className="text-xs text-white/45">
              © {year} {site.name}. {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
