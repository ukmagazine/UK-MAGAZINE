import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { AuthorAvatar } from '@/components/ui/AuthorAvatar';
import { getCategory } from '@/data/categories';
import type { Author } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AuthorCardProps {
  author: Author;
  className?: string;
  headingLevel?: 'h2' | 'h3';
}

/** Byline biography shown at the foot of an article. */
export function AuthorCard({ author, className, headingLevel: Heading = 'h2' }: AuthorCardProps) {
  return (
    <section
      className={cn('rounded-md border border-line bg-surface shadow-card p-5 sm:p-7', className)}
      aria-labelledby={`author-${author.id}`}
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <AuthorAvatar author={author} size="lg" />

        <div className="min-w-0 flex-1">
          <p className="label mb-1.5 text-brand-red">Written by</p>

          <Heading id={`author-${author.id}`} className="font-serif text-xl text-ink sm:text-2xl">
            {author.name}
          </Heading>

          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
            <span>{author.role}</span>
            <span aria-hidden="true" className="text-line-strong">
              ·
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              {author.location}
            </span>
          </p>

          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{author.bio}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {author.beats.map((slug) => {
              const category = getCategory(slug);
              if (!category) return null;
              return (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  className="label inline-flex min-h-[44px] items-center border border-line bg-surface px-3 text-ink-soft transition-colors hover:border-ink hover:text-brand-red"
                >
                  {category.shortName}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
