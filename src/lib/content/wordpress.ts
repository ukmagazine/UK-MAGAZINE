import { articleSourceSchema, type ArticleSource } from '@/lib/content/schema';
import { CATEGORY_SLUG_SET } from '@/lib/category-slugs';
import { decodeSlug, isLatinSlug, toLatinSlug } from '@/lib/content/slug';
import type { CategorySlug } from '@/lib/types';

/**
 * Headless WordPress adapter for the Make.com → WordPress → static-site
 * pipeline. Published posts are fetched at build time, converted to the same
 * `ArticleSource` contract as local JSON, then validated before use.
 *
 * Production contracts:
 * - article routes are built from a Latin WordPress slug
 * - category slugs must match the shared category contract exactly
 * - the five `uk_*` meta keys must be registered by the MU plugin
 * - lead images are hotlinked from `uk_image_url`; featured media is not used
 * - malformed posts are warned about and skipped; HTTP failures remain fatal
 */

const META = {
  subtitle: 'uk_subtitle',
  imageCredit: 'uk_image_credit',
  kind: 'uk_kind',
  imageUrl: 'uk_image_url',
  sponsored: 'uk_sponsored',
} as const;

const PER_PAGE = 100;

interface WpRendered {
  rendered: string;
}

interface WpPost {
  id: number;
  slug: string;
  date_gmt: string;
  modified_gmt: string;
  title: WpRendered;
  excerpt: WpRendered;
  content: WpRendered;
  meta?: Record<string, string | undefined>;
  _embedded?: {
    author?: Array<{ slug?: string; name?: string }>;
    'wp:term'?: Array<Array<{ taxonomy?: string; slug?: string; name?: string }>>;
  };
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCharCode(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'");
}

/** WordPress returns HTML-escaped, tag-wrapped strings even for plain fields. */
function plain(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

/**
 * Convert inline HTML while preserving source links as Markdown links.
 * Everything except anchors and line breaks is intentionally flattened.
 */
function inlineHtmlToMarkdown(html: string): string {
  const withLinks = html.replace(
    /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis,
    (_, href: string, text: string) => {
      const label = plain(text);
      const url = decodeEntities(href).trim();
      return label && url ? `[${label}](${url})` : label;
    },
  );

  return decodeEntities(
    withLinks
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]*>/g, ' '),
  )
    .replace(/[\t ]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .trim();
}

/**
 * Post HTML → the deliberately small Markdown subset understood by the static
 * renderer. Ordered and unordered lists are processed independently so list
 * semantics survive the WordPress conversion. The final strip-all pass comes
 * only after anchors have been converted to `[label](href)`.
 */
export function htmlToMarkdown(html: string): string {
  return html
    .replace(/<h([2-4])[^>]*>(.*?)<\/h\1>/gis, (_, level: string, text: string) =>
      `\n\n${'#'.repeat(Number(level))} ${plain(text)}\n\n`,
    )
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (_, text: string) =>
      `\n\n> ${inlineHtmlToMarkdown(text)}\n\n`,
    )
    .replace(/<ol[^>]*>(.*?)<\/ol>/gis, (_, inner: string) => {
      const items = [...inner.matchAll(/<li[^>]*>(.*?)<\/li>/gis)];
      if (items.length === 0) return '\n\n';
      return `\n\n${items
        .map((match, index) => `${index + 1}. ${inlineHtmlToMarkdown(match[1])}`)
        .join('\n')}\n\n`;
    })
    .replace(/<ul[^>]*>(.*?)<\/ul>/gis, (_, inner: string) => {
      const items = [...inner.matchAll(/<li[^>]*>(.*?)<\/li>/gis)];
      if (items.length === 0) return '\n\n';
      return `\n\n${items.map((match) => `- ${inlineHtmlToMarkdown(match[1])}`).join('\n')}\n\n`;
    })
    .replace(/<p[^>]*>(.*?)<\/p>/gis, (_, text: string) =>
      `\n\n${inlineHtmlToMarkdown(text)}\n\n`,
    )
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** First WordPress category term that matches one of our supported desks. */
function readCategory(post: WpPost): CategorySlug | undefined {
  const groups = post._embedded?.['wp:term'] ?? [];
  for (const group of groups) {
    for (const term of group) {
      if (term.taxonomy === 'category' && term.slug && CATEGORY_SLUG_SET.has(term.slug)) {
        return term.slug as CategorySlug;
      }
    }
  }
  return undefined;
}

function readTags(post: WpPost): string[] {
  const groups = post._embedded?.['wp:term'] ?? [];
  const tags: string[] = [];
  for (const group of groups) {
    for (const term of group) {
      if (term.taxonomy === 'post_tag' && term.name) tags.push(term.name);
    }
  }
  return tags;
}

const KINDS = new Set(['report', 'analysis', 'opinion', 'video', 'breaking']);

function readKind(post: WpPost): string {
  const raw = (post.meta?.[META.kind] ?? '').trim();
  return KINDS.has(raw) ? raw : 'report';
}

const SPONSORED = new Set(['paid', 'advertorial', 'supported']);

/**
 * Anything unrecognised is coerced to editorial rather than guessed at, and
 * says so, because the failure mode in the other direction is labelling a
 * newsroom report as an advertisement.
 */
function readSponsored(post: WpPost): string {
  const raw = (post.meta?.[META.sponsored] ?? '').trim();
  if (raw === '' || SPONSORED.has(raw)) return raw;
  console.warn(
    `[sync:wp] پست ${post.id} (${post.slug}): مقدار ناشناختهٔ uk_sponsored «${raw}» ` +
      'نادیده گرفته شد و محتوا تحریریه در نظر گرفته می‌شود.',
  );
  return '';
}

function readSummary(post: WpPost, body: string): string {
  const excerpt = plain(post.excerpt.rendered);
  if (excerpt) return excerpt;

  const firstParagraph = body
    .split('\n\n')
    .map((chunk) => chunk.trim())
    .find((chunk) => chunk.length > 0 && !chunk.startsWith('#') && !chunk.startsWith('>'));

  if (!firstParagraph) return plain(post.title.rendered);

  const cut = firstParagraph.slice(0, 200);
  const sentence = Math.max(cut.lastIndexOf('.'), cut.lastIndexOf('؟'), cut.lastIndexOf('!'));
  if (sentence > 80) return cut.slice(0, sentence + 1);
  return cut.length < firstParagraph.length ? `${cut.replace(/\s\S*$/, '')}…` : cut;
}

/**
 * Keep an editor-supplied Latin slug. Persian/encoded slugs are transliterated
 * and suffixed with the WordPress id so they remain stable and collision-safe.
 */
function readSlug(post: WpPost): string {
  const decoded = decodeSlug(post.slug);
  if (isLatinSlug(decoded)) return decoded;
  return `${toLatinSlug(plain(post.title.rendered), 'post')}-${post.id}`;
}

function toSource(post: WpPost): unknown {
  const bodyMarkdown = htmlToMarkdown(post.content.rendered);
  const title = plain(post.title.rendered);

  return {
    id: `wp-${post.id}`,
    slug: readSlug(post),
    title,
    subtitle: (post.meta?.[META.subtitle] ?? '').trim(),
    summary: readSummary(post, bodyMarkdown),
    category: readCategory(post),
    authorId: 'ukmagazine',
    publishedAt: new Date(`${post.date_gmt}Z`).toISOString(),
    updatedAt: post.modified_gmt ? new Date(`${post.modified_gmt}Z`).toISOString() : undefined,
    // Contract: images are hotlinked from the source CDN. Do not substitute
    // WordPress `featured_media`, which would violate the current media flow.
    image: (post.meta?.[META.imageUrl] ?? '').trim() || undefined,
    imageAlt: title,
    imageCredit: (post.meta?.[META.imageCredit] ?? '').trim(),
    kind: readKind(post),
    sponsored: readSponsored(post),
    tags: readTags(post),
    bodyMarkdown,
  };
}

/** Every published post, paged through and validated. */
export async function fetchWordPressArticles(baseUrl: string): Promise<ArticleSource[]> {
  const sources: ArticleSource[] = [];
  const rejected: string[] = [];

  for (let page = 1; ; page += 1) {
    // Do not use `new URL('/wp-json/...', baseUrl)`: a leading slash discards a
    // possible WordPress subdirectory (the exact bug the local install exposed).
    const url = new URL(`${baseUrl.replace(/\/+$/, '')}/wp-json/wp/v2/posts`);
    url.searchParams.set('status', 'publish');
    url.searchParams.set('per_page', String(PER_PAGE));
    url.searchParams.set('page', String(page));
    url.searchParams.set('_embed', '1');

    const response = await fetch(url, { headers: { Accept: 'application/json' } });

    // Past the last page WordPress answers 400 with `rest_post_invalid_page_number`.
    if (response.status === 400 && page > 1) break;
    if (!response.ok) {
      throw new Error(`دریافت از وردپرس ناموفق بود (${response.status}): ${url.pathname}`);
    }

    const posts = (await response.json()) as WpPost[];
    if (posts.length === 0) break;

    for (const post of posts) {
      const result = articleSourceSchema.safeParse(toSource(post));
      if (result.success) {
        sources.push(result.data);
        continue;
      }

      const issues = result.error.issues.map((issue) => {
        const where = issue.path.length > 0 ? issue.path.join('.') : '(ریشه)';
        return `${where}: ${issue.message}`;
      });
      const message = `پست ${post.id} (${post.slug}) رد شد → ${issues.join(' | ')}`;
      rejected.push(message);
      console.warn(`[sync:wp] ${message}`);
    }

    const totalPages = Number(response.headers.get('x-wp-totalpages') ?? '1');
    if (page >= totalPages) break;
  }

  if (sources.length === 0) {
    throw new Error(
      `هیچ پست معتبر وردپرسی باقی نماند${
        rejected.length > 0 ? ` (${rejected.length} پست رد شد):\n  - ${rejected.join('\n  - ')}` : '.'
      }`,
    );
  }

  console.info(`[sync:wp] ${sources.length} معتبر، ${rejected.length} رد شد.`);
  return sources;
}
