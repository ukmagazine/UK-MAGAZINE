import { ArrowUpRight, Linkedin, MapPin } from 'lucide-react';
import { externalRel, safeExternalHref } from '@/components/article/ArticleBody';
import type { InterviewDetails, SponsoredKind } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CompanyCardProps {
  interview: InterviewDetails;
  /**
   * 🔴 The website button is an outbound link like any other in the piece. On
   * a `paid` or `advertorial` interview it has to carry `rel="sponsored"` —
   * that is the CAP Code obligation, not a styling preference.
   */
  sponsored: SponsoredKind;
  className?: string;
}

/**
 * The «About …» card that closes an interview.
 *
 * Every element is conditional on its own field, and the card as a whole does
 * not render without a company name — a heading reading "About" with nothing
 * after it is worse than no card.
 *
 * Labels follow the body language: an English interview closes in English, a
 * Persian one in Persian. The card keeps the page's own direction in Persian
 * and flips to LTR only when the interview itself is English.
 */
export function CompanyCard({ interview, sponsored, className }: CompanyCardProps) {
  const {
    companyName,
    companyLocation,
    companyUrl,
    guestName,
    guestLinkedin,
    companyLinkedin,
  } = interview;

  if (!companyName) return null;

  const english = interview.lang === 'en';
  const rel = externalRel(sponsored);

  const website = companyUrl ? safeExternalHref(companyUrl) : null;
  const guestProfile = guestLinkedin ? safeExternalHref(guestLinkedin) : null;
  const companyProfile = companyLinkedin ? safeExternalHref(companyLinkedin) : null;

  const t = english
    ? {
        heading: `About ${companyName}`,
        website: 'Visit Official Website',
        guestLinkedin: guestName ? `${guestName} on LinkedIn` : 'Guest on LinkedIn',
        companyLinkedin: `${companyName} on LinkedIn`,
      }
    : {
        heading: `دربارهٔ ${companyName}`,
        website: 'وب‌سایت رسمی',
        guestLinkedin: guestName ? `لینکدین ${guestName}` : 'لینکدین مهمان',
        companyLinkedin: `لینکدین ${companyName}`,
      };

  const hasLinkedin = Boolean(guestProfile || companyProfile);

  return (
    <aside
      {...(english ? { dir: 'ltr' as const, lang: 'en' } : {})}
      className={cn(
        'rounded-md border border-line bg-surface p-6 shadow-card sm:p-7',
        english && 'text-left',
        className,
      )}
      aria-labelledby="company-card-heading"
    >
      <h2
        id="company-card-heading"
        className="font-serif text-xl font-semibold leading-snug text-ink sm:text-2xl"
      >
        {t.heading}
      </h2>

      {companyLocation ? (
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
          <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-red" />
          {companyLocation}
        </p>
      ) : null}

      {website ? (
        <a
          href={website}
          target="_blank"
          rel={rel}
          className="group mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-brand-red px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
        >
          {t.website}
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
          />
        </a>
      ) : null}

      {hasLinkedin ? (
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
          {guestProfile ? (
            <li>
              <a
                href={guestProfile}
                target="_blank"
                rel={rel}
                className="inline-flex min-h-[44px] items-center gap-2 text-sm text-ink-soft transition-colors hover:text-brand-red"
              >
                <Linkedin aria-hidden="true" className="h-4 w-4 shrink-0" />
                {t.guestLinkedin}
              </a>
            </li>
          ) : null}
          {companyProfile ? (
            <li>
              <a
                href={companyProfile}
                target="_blank"
                rel={rel}
                className="inline-flex min-h-[44px] items-center gap-2 text-sm text-ink-soft transition-colors hover:text-brand-red"
              >
                <Linkedin aria-hidden="true" className="h-4 w-4 shrink-0" />
                {t.companyLinkedin}
              </a>
            </li>
          ) : null}
        </ul>
      ) : null}
    </aside>
  );
}
