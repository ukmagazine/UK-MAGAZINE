import fs from 'node:fs';
import path from 'node:path';
import { articleSourceSchema, type ArticleSource } from '@/lib/content/schema';
import { estimateReadingTime, markdownToBlocks } from '@/lib/content/markdown';
import type { Article, BreakingItem } from '@/lib/types';

/**
 * Loads the article corpus from `content/articles/*.json`.
 *
 * This runs once, at build time, on the server. Each file is validated against
 * the schema before anything downstream sees it, and a single bad record fails
 * the build — which is the entire point of keeping the site static: content
 * produced by an automation is checked before it can reach a reader.
 *
 * The project root comes from `PROJECT_ROOT` (set in `next.config.ts` from
 * `__dirname`) rather than `process.cwd()`, because Next can be started from a
 * different working directory than the project — which has already broken the
 * PostCSS and Tailwind config lookups in this repo once.
 */

const PROJECT_ROOT = process.env.PROJECT_ROOT ?? process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content', 'articles');

/** How many related stories each article carries. */
const RELATED_COUNT = 3;

function readSources(): ArticleSource[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn(`پوشهٔ محتوا پیدا نشد: ${CONTENT_DIR} — سایت بدون مقاله ساخته می‌شود.`);
    return [];
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith('.json'))
    .sort();

  if (files.length === 0) {
    console.warn(`هیچ فایل مقاله‌ای در ${CONTENT_DIR} نیست — سایت بدون مقاله ساخته می‌شود.`);
    return [];
  }

  const sources: ArticleSource[] = [];
  const problems: string[] = [];

  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    let raw: unknown;

    try {
      raw = JSON.parse(fs.readFileSync(full, 'utf8'));
    } catch (error) {
      problems.push(`${file}: JSON نامعتبر — ${(error as Error).message}`);
      continue;
    }

    const result = articleSourceSchema.safeParse(raw);
    if (!result.success) {
      for (const issue of result.error.issues) {
        const where = issue.path.length > 0 ? issue.path.join('.') : '(ریشه)';
        problems.push(`${file} → ${where}: ${issue.message}`);
      }
      continue;
    }

    sources.push(result.data);
  }

  // Duplicate slugs would silently collide into one route.
  const seen = new Map<string, string>();
  for (const source of sources) {
    const previous = seen.get(source.slug);
    if (previous) problems.push(`اسلاگ تکراری «${source.slug}» در ${previous} و ${source.id}`);
    seen.set(source.slug, source.id);
  }

  if (problems.length > 0) {
    throw new Error(
      `اعتبارسنجی محتوا شکست خورد (${problems.length} مورد):\n  - ${problems.join('\n  - ')}`,
    );
  }

  return sources;
}

/**
 * Related stories, derived rather than authored.
 *
 * An automation cannot meaningfully hand-pick cross-references, so relatedness
 * is computed: shared tags weigh more than a shared desk, ties break towards
 * the more recent story.
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

  // The strip leads with anything filed as breaking, then falls back to the
  // newest stories so it is never empty.
  const breakingItems: BreakingItem[] = [
    ...articles.filter((article) => article.kind === 'breaking'),
    ...articles.filter((article) => article.kind !== 'breaking'),
  ]
    .slice(0, 5)
    .map((article) => ({
      id: `br-${article.id}`,
      text: article.title,
      href: `/article/${article.slug}`,
      timestamp: article.publishedAt,
    }));

  return { articles, breakingItems };
}

const corpus = build();

export const articles = corpus.articles;
export const breakingItems = corpus.breakingItems;
