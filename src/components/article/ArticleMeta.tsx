import { RelativeTime } from '@/components/ui/RelativeTime';
import { formatReadingTime } from '@/lib/format';
import type { CardArticle } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ArticleMetaProps {
  article: CardArticle;
  className?: string;
  showAuthor?: boolean;
  inverted?: boolean;
}

/** Byline · timestamp · reading time, in the compact metadata style. */
export function ArticleMeta({
  article,
  className,
  showAuthor = true,
  inverted = false,
}: ArticleMetaProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-2 gap-y-1 text-xs',
        inverted ? 'text-white/75' : 'text-ink-soft',
        className,
      )}
    >
      {showAuthor ? (
        <>
          <span className={cn('font-medium', inverted ? 'text-white' : 'text-ink')}>
            {article.author.name}
          </span>
          <span aria-hidden="true" className={inverted ? 'text-white/40' : 'text-line-strong'}>
            ·
          </span>
        </>
      ) : null}

      <RelativeTime iso={article.publishedAt} />

      <span aria-hidden="true" className={inverted ? 'text-white/40' : 'text-line-strong'}>
        ·
      </span>

      <span>{formatReadingTime(article.readingTime)}</span>
    </div>
  );
}
