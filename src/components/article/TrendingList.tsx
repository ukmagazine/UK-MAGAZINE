'use client';

import { ArticleCard } from '@/components/article/ArticleCard';
import type { CardArticle } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';

interface TrendingListProps {
  articles: CardArticle[];
  title?: string;
  className?: string;
  headingLevel?: 'h2' | 'h3';
}

/** Numbered ranking, 01–10, for "Most read". */
export function TrendingList({
  articles,
  title,
  className,
  headingLevel: Heading = 'h2',
}: TrendingListProps) {
  const { t } = useLocale();
  const heading = title ?? t.home.mostRead;
  if (articles.length === 0) return null;

  return (
    <section className={cn(className)} aria-labelledby="trending-heading">
      <Heading
        id="trending-heading"
        className="label mb-5 flex items-center border-t border-line pt-5 text-ink"
      >
        <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-brand-red" />
        {heading}
      </Heading>

      <ol className="space-y-0">
        {articles.map((article, index) => (
          <li key={article.id}>
            <ArticleCard
              article={article}
              variant="numbered"
              index={index}
              showSummary={false}
              headingLevel="h3"
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
