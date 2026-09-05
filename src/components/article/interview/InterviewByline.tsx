import Image from 'next/image';
import { externalRel, safeExternalHref } from '@/components/article/ArticleBody';
import type { InterviewDetails, SponsoredKind } from '@/lib/types';
import { cn } from '@/lib/utils';

interface InterviewBylineProps {
  interview: InterviewDetails;
  sponsored: SponsoredKind;
  className?: string;
}

/**
 * Who was interviewed, and for whom.
 *
 * Names, roles and company names are Latin script in almost every case, so the
 * line is set LTR whatever the article's language — a reversed job title is
 * the exact bidi failure `<bdi>` exists to prevent.
 *
 * The logo is hotlinked from `uk_company_logo_url` and never re-hosted, the
 * same contract as the lead image. It is `unoptimized` because the project's
 * static export routes optimisation through a custom loader that assumes
 * photographic sources; a transparent PNG or SVG mark is neither.
 */
export function InterviewByline({ interview, sponsored, className }: InterviewBylineProps) {
  const { guestName, guestRole, companyName, companyUrl, companyLogoUrl } = interview;

  const logo = companyLogoUrl ? safeExternalHref(companyLogoUrl) : null;
  const website = companyUrl ? safeExternalHref(companyUrl) : null;
  const affiliation = [guestRole, companyName].filter(Boolean).join(' · ');

  if (!guestName && !affiliation && !logo) return null;

  const logoImage = logo ? (
    <Image
      src={logo}
      alt={companyName ? `${companyName} logo` : 'Company logo'}
      width={160}
      height={56}
      unoptimized
      className="h-10 w-auto max-w-[160px] object-contain sm:h-12"
    />
  ) : null;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-x-6 gap-y-4',
        className,
      )}
    >
      {guestName || affiliation ? (
        <div dir="ltr" lang="en" className="min-w-0 text-left">
          {guestName ? (
            <p className="font-serif text-lg font-semibold leading-snug text-ink sm:text-xl">
              {guestName}
            </p>
          ) : null}
          {affiliation ? (
            <p className="mt-1 text-sm text-ink-soft">{affiliation}</p>
          ) : null}
        </div>
      ) : null}

      {logoImage ? (
        website ? (
          <a
            href={website}
            target="_blank"
            rel={externalRel(sponsored)}
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            {logoImage}
          </a>
        ) : (
          <div className="shrink-0">{logoImage}</div>
        )
      ) : null}
    </div>
  );
}
