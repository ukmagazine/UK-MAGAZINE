import fs from 'node:fs';
import path from 'node:path';
import { HIDDEN_CATEGORY_SLUG_SET } from '@/lib/category-slugs';
import { articleSourceSchema, type ArticleSource } from '@/lib/content/schema';
import { estimateReadingTime, markdownToBlocks } from '@/lib/content/markdown';
import type { Article, BreakingItem } from '@/lib/types';

/**
 * Loads the article corpus from `content/articles/*.json` at build time.
 *
 * Automation output is treated as untrusted input. A malformed file or a
 * duplicate slug is warned about and skipped so one bad article cannot take
 * the whole publication offline. The build fails only when no valid article
 * remains, because a completely empty news site is itself a deployment error.
 */

const PROJECT_ROOT = process.env.PROJECT_ROOT ?? process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content', 'articles');
const RELATED_COUNT = 3;

export function readSources(): ArticleSource[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    throw new Error(
      `پوشهٔ محتوا پیدا نشد: ${CONTENT_DIR}\n` +
        'حداقل یک فایل JSON مقاله لازم است تا سایت ساخته شود.',
    );
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith('.json'))
    .sort();

  if (files.length === 0) {
    throw new Error(`هیچ فایل مقاله‌ای در ${CONTENT_DIR} نیست.`);
  }

  const sources: ArticleSource[] = [];
  const seenSlugs = new Map<string, string>();
  let rejected = 0;

  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    let raw: unknown;

    try {
      raw = JSON.parse(fs.readFileSync(full, 'utf8'));
    } catch (error) {
      rejected += 1;
      console.warn(`[content] ${file} رد شد: JSON نامعتبر — ${(error as Error).message}`);
      continue;
    }

    const result = articleSourceSchema.safeParse(raw);
    if (!result.success) {
      rejected += 1;
      const issues = result.error.issues.map((issue) => {
        const where = issue.path.length > 0 ? issue.path.join('.') : '(ریشه)';
        return `${where}: ${issue.message}`;
      });
      console.warn(`[content] ${file} رد شد → ${issues.join(' | ')}`);
      continue;
    }

    const previous = seenSlugs.get(result.data.slug);
    if (previous) {
      rejected += 1;
      console.warn(
        `[content] ${file} رد شد: اسلاگ تکراری «${result.data.slug}» ` +
          `(قبلاً در ${previous} ثبت شده است).`,
      );
      continue;
    }

    seenSlugs.set(result.data.slug, file);
    sources.push(result.data);
  }

  if (sources.length === 0) {
    throw new Error(
      `هیچ مقالهٔ معتبری در ${CONTENT_DIR} باقی نماند. ${rejected} فایل رد شد.`,
    );
  }

  console.info(`[content] ${sources.length} معتبر، ${rejected} رد شد.`);
  return sources;
}

/**
 * Related stories are derived from shared tags/category, then recency.
 */
function deriveRelated(sources: ArticleSource[]): Map<string, string[]> {
  const related = new Map<string, string[]>();

  for (const source of sources) {
    const tags = new Set(source.tags.map((tag) => tag.toLowerCase()));

    const ranked = sources
      .filter((other) => other.id !== source.id)
      .map((other) => {
        const shared = other.tags.filter((tag) => tags.has(tag.toLowerCase())).length;
        const score = shared * 2 + (other.category === source.category ? 1 : 0);
        return { id: other.id, score, at: Date.parse(other.publishedAt) };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || b.at - a.at)
      .slice(0, RELATED_COUNT)
      .map((entry) => entry.id);

    related.set(source.id, ranked);
  }

  return related;
}

function build(): { articles: Article[]; breakingItems: BreakingItem[] } {
  const sources = readSources();
  const related = deriveRelated(sources);

  const articles: Article[] = sources
    .map((source) => {
      const { bodyMarkdown, ...rest } = source;
      const body = markdownToBlocks(bodyMarkdown);

      return {
        ...rest,
        body,
        readingTime: estimateReadingTime(body),
        relatedIds: related.get(source.id) ?? [],
      } satisfies Article;
    })
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

  // The breaking bar sits on every page, so it is a discovery surface like any
  // other and a hidden desk must not reach it.
  const surfaceable = articles.filter(
    (article) => !HIDDEN_CATEGORY_SLUG_SET.has(article.category),
  );

  const breakingItems: BreakingItem[] = [
    ...surfaceable.filter((article) => article.kind === 'breaking'),
    ...surfaceable.filter((article) => article.kind !== 'breaking'),
  ]
    .slice(0, 5)
    .map((article) => ({
      id: `br-${article.id}`,
      text: article.title,
      href: `/article/${article.slug}/`,
      timestamp: article.publishedAt,
    }));

  return { articles, breakingItems };
}

const corpus = build();

export const articles = corpus.articles;
export const breakingItems = corpus.breakingItems;
