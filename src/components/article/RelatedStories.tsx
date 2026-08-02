import { ArticleGrid } from '@/components/article/ArticleGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { CardArticle } from '@/lib/types';
import { cn } from '@/lib/utils';

interface RelatedStoriesProps {
  articles: CardArticle[];
  title?: string;
  className?: string;
}

/** Three related stories, shown beneath the article body. */
export function RelatedStories({
  articles,
  title = 'بیشتر دربارهٔ این موضوع',
  className,
}: RelatedStoriesProps) {
  if (articles.length === 0) return null;

  return (
    <section className={cn(className)} aria-labelledby="related-heading">
      <SectionHeader title={title} />
      <ArticleGrid articles={articles} columns={3} headingLevel="h3" />
    </section>
  );
}
