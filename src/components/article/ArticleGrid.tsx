import { ArticleCard, type ArticleCardVariant } from '@/components/article/ArticleCard';
import { Reveal } from '@/components/ui/Reveal';
import type { CardArticle } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ArticleGridProps {
  articles: CardArticle[];
  variant?: ArticleCardVariant;
  columns?: 2 | 3 | 4;
  showSummary?: boolean;
  /** Hairline dividers between columns, in the editorial newspaper manner. */
  divided?: boolean;
  className?: string;
  headingLevel?: 'h2' | 'h3' | 'h4';
  /** Disables scroll reveal where the grid is already inside one. */
  animate?: boolean;
}

const COLUMN_CLASSES = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const;

const SIZES = {
  2: '(max-width: 640px) 100vw, 50vw',
  3: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  4: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
} as const;

/** Responsive grid of cards with staggered reveal. */
export function ArticleGrid({
  articles,
  variant = 'standard',
  columns = 3,
  showSummary = true,
  divided = false,
  className,
  headingLevel = 'h3',
  animate = true,
}: ArticleGridProps) {
  if (articles.length === 0) return null;

  return (
    <div className={cn('grid grid-cols-1 gap-x-6 gap-y-9', COLUMN_CLASSES[columns], className)}>
      {articles.map((article, index) => {
        const card = (
          <ArticleCard
            article={article}
            variant={variant}
            showSummary={showSummary}
            headingLevel={headingLevel}
            sizes={SIZES[columns]}
            className={cn(
              divided &&
                'sm:border-s sm:border-line sm:ps-6 sm:[&:nth-child(odd)]:border-s-0 sm:[&:nth-child(odd)]:ps-0',
              divided &&
                columns === 3 &&
                'lg:[&:nth-child(odd)]:border-s lg:[&:nth-child(odd)]:ps-6 lg:[&:nth-child(3n+1)]:border-s-0 lg:[&:nth-child(3n+1)]:ps-0',
            )}
          />
        );

        if (!animate) return <div key={article.id}>{card}</div>;

        return (
          <Reveal key={article.id} delay={Math.min(index, 4) * 0.06}>
            {card}
          </Reveal>
        );
      })}
    </div>
  );
}
