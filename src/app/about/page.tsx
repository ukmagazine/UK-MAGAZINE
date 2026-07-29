import Link from 'next/link';
import type { Metadata } from 'next';
import { Globe2, PenLine, Scale, ShieldCheck } from 'lucide-react';
import { NewsletterCard } from '@/components/newsletter/NewsletterCard';
import { AuthorAvatar } from '@/components/ui/AuthorAvatar';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { authors } from '@/data/authors';
import { categories } from '@/data/categories';
import { site } from '@/data/site';
import { articles } from '@/data/articles';
import { breadcrumbJsonLd, buildMetadata, jsonLdProps } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: site.description,
  path: '/about',
});

const PRINCIPLES = [
  {
    Icon: Scale,
    title: 'Report the process',
    body: 'We describe what was decided, who decided it, what it costs and what happens next. Where we do not know, we say so rather than filling the gap with adjectives.',
  },
  {
    Icon: ShieldCheck,
    title: 'Correct in public',
    body: 'Corrections are appended to the story, dated and described. We do not quietly edit a published piece to make an error disappear.',
  },
  {
    Icon: PenLine,
    title: 'Separate report from opinion',
    body: 'Columns are labelled as opinion and written under a named byline. Reporting is not, and does not carry the reporter’s view.',
  },
  {
    Icon: Globe2,
    title: 'Report from where it happens',
    body: 'Our correspondents live on their beats. Where we rely on another outlet’s work, we say whose it is and link to it.',
  },
];

const STATS = [
  { value: '34', label: 'Countries with correspondents' },
  { value: String(authors.length), label: 'Journalists on staff' },
  { value: String(categories.length), label: 'Desks' },
  { value: String(articles.length), label: 'Stories published' },
];

const SECTIONS = [
  {
    id: 'standards',
    title: 'Standards and ethics',
    body: 'Reporters do not accept payment, gifts or travel from the organisations they cover. Sources are granted anonymity only when the information is material and cannot be obtained on the record, and the reason is explained in the story. Every anonymous source is known to at least one editor.',
  },
  {
    id: 'corrections',
    title: 'Corrections',
    body: 'When we get something wrong we correct it at the top of the story, describe what was wrong, and record the date. Substantive corrections are also listed on this page. If you think we have made an error, write to the newsroom and a person will read it.',
  },
  {
    id: 'careers',
    title: 'Careers',
    body: 'We hire reporters who can read a budget document and explain it to somebody who cannot. Openings are listed here as they arise, with the salary range included in the posting. We accept applications from anywhere our correspondents can legally be employed.',
  },
  {
    id: 'contact',
    title: 'Contact',
    body: `Editorial enquiries, story tips and corrections go to ${site.email}. Confidential material can be sent by post to the newsroom; ask us for the address before sending anything sensitive.`,
  },
  {
    id: 'terms',
    title: 'Terms of service',
    body: 'UK MAGAZINE is a design template, and this page stands in for the terms a real publication would publish here — covering acceptable use, subscription terms, licensing of our reporting, and the limits of our liability.',
  },
  {
    id: 'privacy',
    title: 'Privacy policy',
    body: 'We collect the minimum needed to run the site: an email address if you subscribe to a newsletter, and aggregate traffic figures with no personal identifiers. Bookmarks are stored in your own browser and never sent to us. We do not sell reader data.',
  },
  {
    id: 'cookies',
    title: 'Cookie preferences',
    body: 'This template sets no tracking cookies. A real deployment would present a preference centre here, defaulting to essential cookies only, with analytics and personalisation off until a reader turns them on.',
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    body: 'UK MAGAZINE targets WCAG 2.1 AA. Every control is reachable by keyboard with a visible focus indicator, images carry descriptive alternative text, animation respects your reduced-motion setting, and colour is never the only way information is conveyed. If something is not usable for you, tell us and we will fix it.',
  },
];

export default function AboutPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <script {...jsonLdProps(breadcrumbJsonLd(trail))} />

      {/* Masthead ------------------------------------------- */}
      <header className="relative overflow-hidden border-b border-line">
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-24 w-24 bg-brand-red sm:h-36 sm:w-36"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        <div className="frame relative py-14 sm:py-20">
          <p className="label mb-4 flex items-center text-brand-red">
            <span aria-hidden="true" className="me-2 h-[3px] w-6 bg-brand-red" />
            About
          </p>

          <h1 className="max-w-3xl font-serif text-display tracking-[-0.025em] text-ink">
            Clear reporting, without the noise.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {site.description}
          </p>

          <p className="mt-5 text-xs uppercase tracking-[0.14em] text-ink-faint">
            {site.established}
          </p>
        </div>
      </header>

      <div className="frame py-14 sm:py-20">
        {/* Statistics --------------------------------------- */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-line pb-12 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  aria-hidden="true"
                  className="mb-3 block h-[3px] w-8 bg-brand-red"
                />
                <span className="tabular block font-serif text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-ink-soft">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Principles --------------------------------------- */}
        <section className="mt-16" aria-labelledby="principles-heading">
          <SectionHeader
            title="How we work"
            kicker="Principles"
            description="Four commitments that shape every story we publish."
            size="display"
            as="h2"
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {PRINCIPLES.map(({ Icon, title, body }, index) => (
              <Reveal key={title} delay={index * 0.06}>
                <article className="flex gap-4 border-t border-line pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-surface-soft">
                    <Icon aria-hidden="true" className="h-5 w-5 text-brand-red" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-ink">{title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Newsroom ----------------------------------------- */}
        <section className="mt-16 scroll-mt-32 sm:mt-20" id="newsroom" aria-labelledby="newsroom-heading">
          <SectionHeader
            title="The newsroom"
            kicker="Bylines"
            description="Ten journalists across four continents. Every story on UK MAGAZINE carries a named byline."
            size="display"
            as="h2"
          />

          <ul className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {authors.map((author, index) => (
              <Reveal as="li" key={author.id} delay={Math.min(index, 5) * 0.05}>
                <article className="flex h-full gap-4 border-t border-line pt-5">
                  <AuthorAvatar author={author} size="md" />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg text-ink">{author.name}</h3>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {author.role} · {author.location}
                    </p>
                    <p className="clamp-3 mt-2.5 text-sm leading-relaxed text-ink-soft">
                      {author.bio}
                    </p>

                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {author.beats.map((slug) => (
                        <li key={slug}>
                          <Link
                            href={`/category/${slug}`}
                            className="label inline-flex min-h-[44px] items-center border border-line px-2 text-ink-soft transition-colors hover:border-ink hover:text-brand-red"
                          >
                            {categories.find((category) => category.slug === slug)?.shortName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Policy sections ---------------------------------- */}
        <section className="mt-16 sm:mt-20" aria-labelledby="policies-heading">
          <SectionHeader
            title="Policies and contact"
            kicker="The details"
            size="display"
            as="h2"
          />

          <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 border-t border-line pt-5">
                <h3 className="font-serif text-xl text-ink">{section.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{section.body}</p>
              </section>
            ))}
          </div>
        </section>
      </div>

      <div className="frame">
        <NewsletterCard />
      </div>
    </>
  );
}
