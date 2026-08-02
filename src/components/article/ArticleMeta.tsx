import { RelativeTime } from '@/components/ui/RelativeTime';
import { formatReadingTime } from '@/lib/format';
import type { CardArticle } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ArticleMetaProps {
  article: CardArticle;
  className?: string;
  inverted?: boolean;
}

/**
 * Timestamp · reading time.
 *
 * No byline: every story carries the same house byline, so printing it on each
 * card in a listing would repeat the publication's own name a dozen times down
 * the page. The attribution belongs on the article itself, where it is read
 * once and means something.
 */
export function ArticleMeta({ article, className, inverted = false }: ArticleMetaProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-2 gap-y-1 text-xs',
        inverted ? 'text-white/75' : 'text-ink-soft',
        className,
      )}
    >
      <RelativeTime iso={article.publishedAt} />

      <span aria-hidden="true" className={inverted ? 'text-white/40' : 'text-line-strong'}>
        ·
      </span>

      <span>{formatReadingTime(article.readingTime)}</span>
    </div>
  );
}
