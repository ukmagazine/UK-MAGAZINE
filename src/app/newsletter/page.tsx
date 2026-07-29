import type { Metadata } from 'next';
import {
  BookOpen,
  Check,
  Cpu,
  GraduationCap,
  Landmark,
  Newspaper,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { newsletters } from '@/data/newsletters';
import { site } from '@/data/site';
import type { Newsletter } from '@/lib/types';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Newsletters',
  description:
    'Five UK MAGAZINE newsletters: the Daily Brief, AI Weekly, Education Update, Global Politics and the Weekend Review. Concise, edited, and free.',
  path: '/newsletter',
});

const ICONS: Record<Newsletter['icon'], typeof Newspaper> = {
  brief: Newspaper,
  ai: Cpu,
  education: GraduationCap,
  politics: Landmark,
  weekend: BookOpen,
};

const TRUST = [
  { Icon: Users, label: '524,000 readers', detail: 'across all five editions' },
  { Icon: ShieldCheck, label: 'No data sold', detail: 'ever, to anyone' },
  { Icon: Check, label: 'One-click unsubscribe', detail: 'in every edition' },
];

export default function NewsletterPage() {
  return (
    <>
      {/* Value proposition ----------------------------------- */}
      <header className="relative overflow-hidden border-b border-line">
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-24 w-24 bg-brand-red sm:h-32 sm:w-32"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        <div className="frame relative py-14 sm:py-20">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="label mb-4 flex items-center text-brand-red">
                <span aria-hidden="true" className="me-2 h-[3px] w-6 bg-brand-red" />
                Newsletters
              </p>

              <h1 className="max-w-2xl font-serif text-display tracking-[-0.025em] text-ink">
                The news, edited down to what changed.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                Every UK MAGAZINE newsletter is written by the desk that covers the beat, edited to
                remove everything that is not new, and sent on a schedule you can plan around. No
                filler, no engagement tricks, and no charge.
              </p>

              <ul className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {TRUST.map(({ Icon, label, detail }) => (
                  <li key={label} className="border-t border-line pt-4">
                    <Icon aria-hidden="true" className="mb-2.5 h-5 w-5 text-brand-red" />
                    <p className="font-serif text-base text-ink">{label}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{detail}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary signup ---------------------------------- */}
            <div className="lg:col-span-5">
              <div className="relative border border-line bg-surface-soft p-6 sm:p-8">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[3px] bg-brand-red"
                />

                <p className="label mb-2 text-brand-red">Start here</p>
                <h2 className="font-serif text-2xl leading-snug text-ink">
                  Get the Daily Brief
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  Ten stories that moved overnight, each in under sixty words. Weekdays at 06:30
                  local time.
                </p>

                <NewsletterForm className="mt-6" newsletterName="the Daily Brief" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="frame py-14 sm:py-20">
        {/* Newsletter types --------------------------------- */}
        <section aria-labelledby="editions-heading">
          <SectionHeader
            title="Five editions"
            kicker="Choose your desks"
            description="Each one is written by the reporters who cover the beat. Subscribe to as many as you like."
            size="display"
            className="border-t-0 pt-0"
            as="h2"
          />

          <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {newsletters.map((newsletter, index) => {
              const Icon = ICONS[newsletter.icon];
              return (
                <Reveal as="li" key={newsletter.id} delay={index * 0.06}>
                  <article className="flex h-full flex-col border-t-2 border-ink pt-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-surface-soft">
                        <Icon aria-hidden="true" className="h-5 w-5 text-brand-red" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-xl text-ink sm:text-2xl">
                          {newsletter.name}
                        </h3>
                        <p className="label mt-1 text-ink-soft">{newsletter.cadence}</p>
                      </div>

                      <p className="tabular shrink-0 text-end text-xs text-ink-faint">
                        {newsletter.subscribers}
                        <br />
                        readers
                      </p>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {newsletter.description}
                    </p>

                    {/* Example content ------------------------ */}
                    <div className="mt-5 border-s-2 border-brand-red bg-surface-soft py-3 ps-4 pe-4">
                      <p className="label mb-1.5 text-brand-red">A recent line</p>
                      <p className="font-serif text-base leading-snug text-ink">
                        {newsletter.sample}
                      </p>
                    </div>

                    <div className="mt-auto pt-6">
                      <NewsletterForm
                        newsletterName={newsletter.name}
                        buttonLabel="Subscribe"
                        showPrivacyNote={false}
                      />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </section>

        {/* Privacy ------------------------------------------ */}
        <section
          className="mt-16 border border-line bg-surface-soft p-6 sm:mt-20 sm:p-10"
          aria-labelledby="privacy-heading"
        >
          <h2 id="privacy-heading" className="label mb-4 flex items-center text-brand-red">
            <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-brand-red" />
            How we handle your address
          </h2>

          <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
            <p className="text-sm leading-relaxed text-ink-soft">
              We store your email address to send the editions you asked for, and for nothing else.
              It is never sold, rented or shared with advertisers.
            </p>
            <p className="text-sm leading-relaxed text-ink-soft">
              Every edition carries a one-click unsubscribe link that takes effect immediately. You
              do not need to tell us why, and we will not email to ask.
            </p>
            <p className="text-sm leading-relaxed text-ink-soft">
              Full details are in our{' '}
              <a
                href="/about#privacy"
                className="font-medium text-brand-deep underline decoration-brand-red/40 underline-offset-2 transition-colors hover:decoration-brand-red"
              >
                privacy policy
              </a>
              . Questions go to {site.email}.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
