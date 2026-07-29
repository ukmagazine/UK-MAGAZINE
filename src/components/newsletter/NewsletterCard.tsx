import { Mail } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { cn } from '@/lib/utils';

interface NewsletterCardProps {
  title?: string;
  description?: string;
  newsletterName?: string;
  /**
   * `band` spans a full section, `rail` fits the article side rail, and
   * `panel` is the tall red column used in the homepage latest row.
   */
  variant?: 'band' | 'rail' | 'panel';
  className?: string;
  headingLevel?: 'h2' | 'h3';
}

/** Subscription call-to-action, in a full-width band or a compact rail card. */
export function NewsletterCard({
  title = 'Start the day with the Daily Brief',
  description = 'Ten stories that moved overnight, each in under sixty words, with a line on why they matter. Weekdays at 06:30.',
  newsletterName = 'the Daily Brief',
  variant = 'band',
  className,
  headingLevel: Heading = 'h2',
}: NewsletterCardProps) {
  if (variant === 'rail') {
    return (
      <aside className={cn('relative rounded-md border border-line bg-surface p-5 shadow-card', className)}>
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-5 w-5 bg-brand-red"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />
        <Heading className="label mb-3 flex items-center gap-2 text-brand-red">
          <Mail aria-hidden="true" className="h-3.5 w-3.5" />
          Newsletter
        </Heading>
        <p className="font-serif text-lg leading-snug text-ink">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
        <NewsletterForm
          className="mt-4"
          newsletterName={newsletterName}
          buttonLabel="Subscribe"
          showPrivacyNote={false}
        />
      </aside>
    );
  }

  if (variant === 'panel') {
    return (
      <section
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-md bg-gradient-to-br from-brand-red to-brand-deep p-6 shadow-card',
          className,
        )}
        aria-labelledby="newsletter-panel-heading"
      >
        {/* Abstract geometric lines, kept faint. */}
        <span
          aria-hidden="true"
          className="absolute -right-10 -top-16 h-[140%] w-24 rotate-[24deg] border-x border-white/15"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-16 w-16 bg-white/10"
          style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }}
        />

        <div className="relative">
          <p className="label mb-4 text-white/95">Stay informed</p>
          <Heading
            id="newsletter-panel-heading"
            className="font-serif text-2xl leading-tight tracking-[-0.03em] text-white sm:text-[1.75rem]"
          >
            {title}
          </Heading>
          <p className="mt-3 text-sm leading-relaxed text-white/95">{description}</p>
        </div>

        <div className="relative mt-auto pt-8">
          <NewsletterForm
            onRed
            newsletterName={newsletterName}
            buttonLabel="Subscribe"
            showPrivacyNote={false}
            stacked
          />
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-lg bg-gradient-to-br from-brand-red to-brand-deep px-6 py-12 shadow-card sm:px-10 sm:py-16',
        className,
      )}
      aria-labelledby="newsletter-band-heading"
    >
      {/* Abstract geometric line pattern, kept faint. */}
      <span
        aria-hidden="true"
        className="absolute -right-16 -top-24 h-[130%] w-40 rotate-[24deg] border-x border-white/15"
      />
      <span
        aria-hidden="true"
        className="absolute -right-40 -top-24 h-[130%] w-16 rotate-[24deg] border-x border-white/10"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-20 w-20 bg-white/10"
        style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }}
      />

      <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="label mb-3 flex items-center text-white/95">
            <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-white" />
            Stay informed
          </p>
          <Heading
            id="newsletter-band-heading"
            className="font-serif text-2xl leading-tight tracking-[-0.03em] text-white sm:text-3xl lg:text-[2.25rem]"
          >
            {title}
          </Heading>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/95 sm:text-base">
            {description}
          </p>
        </div>

        <div className="lg:ps-10">
          <NewsletterForm onRed newsletterName={newsletterName} />
        </div>
      </div>
    </section>
  );
}
