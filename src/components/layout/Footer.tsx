import Link from 'next/link';
import { Wordmark } from '@/components/ui/Wordmark';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { categoryShortName } from '@/i18n/category';
import { footerCategories } from '@/data/categories';
import { activeSocial, site } from '@/data/site';

/**
 * Dark charcoal footer with restrained brand accents.
 *
 * Four columns: the eleven visible desks, the publication's own pages, the
 * legal pages, and the social row. Hidden desks never appear here — that is
 * part of what "hidden" means.
 *
 * There is deliberately no /corrections/ link: a corrections page with no
 * corrections in it is worse than none.
 *
 * A server component now. It stopped needing client state when the newsletter
 * form came out (see NewsletterForm), so the whole footer leaves the bundle.
 */
export function Footer() {
  const year = new Date(Date.parse('2026-01-01T00:00:00.000Z')).getUTCFullYear();

  return (
    <footer className="mt-20 bg-surface-char text-white sm:mt-24 lg:rounded-b-lg">
      <span aria-hidden="true" className="block h-[3px] w-full bg-brand-red" />

      <div className="frame py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand ------------------------------------------------ */}
          <div className="lg:col-span-4">
            <Wordmark inverted />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {site.description}
            </p>
          </div>

          {/* Link columns ---------------------------------------- */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            <nav aria-labelledby="footer-sections" className="col-span-2 sm:col-span-2">
              <h2 id="footer-sections" className="label mb-4 text-white/50">
                بخش‌ها
              </h2>
              <ul className="grid grid-cols-2 gap-x-4">
                {footerCategories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/category/${category.slug}/`}
                      className="inline-flex min-h-[40px] items-center text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {categoryShortName(category)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-company">
              <h2 id="footer-company" className="label mb-4 text-white/50">
                دربارهٔ ما
              </h2>
              <ul>
                {site.footer.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-[40px] items-center text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <nav aria-labelledby="footer-legal">
                <h2 id="footer-legal" className="label mb-4 text-white/50">
                  حقوقی
                </h2>
                <ul>
                  {site.footer.legal.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-[40px] items-center text-sm text-white/75 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* The heading only appears when a channel actually has a URL. */}
              {activeSocial.length > 0 ? (
                <div className="mt-8">
                  <h2 id="footer-social" className="label mb-2 text-white/50">
                    ما را دنبال کنید
                  </h2>
                  <nav aria-labelledby="footer-social">
                    <SocialLinks inverted className="-ms-3" />
                  </nav>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Base bar --------------------------------------------- */}
        <div className="mt-12 flex flex-col gap-3 border-t border-line-dark pt-8 sm:mt-14 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-xs text-white/45">
            © {year} {site.name}. تمامی حقوق محفوظ است.
          </p>
          <a
            href={site.hostingCredit.href}
            target="_blank"
            rel={site.hostingCredit.rel}
            className="text-xs text-white/55 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
          >
            {site.hostingCredit.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
