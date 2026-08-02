import { articleSourceSchema, type ArticleSource } from '@/lib/content/schema';
import { decodeSlug, isLatinSlug, toLatinSlug } from '@/lib/content/slug';
import type { CategorySlug } from '@/lib/types';

/**
 * Headless WordPress source.
 *
 * WordPress is the content store the Make.com pipeline writes into — its
 * native module makes creating a post with a featured image a two-request job,
 * which is far less work for the automation than committing files. This module
 * pulls those posts at build time and maps them onto exactly the same
 * `ArticleSource` shape the local JSON files use, so the rest of the site
 * cannot tell the two apart.
 *
 * Enabled by setting `WORDPRESS_URL` (see `.env.example`). Unset, the build
 * falls back to `content/articles/*.json`.
 *
 * Only published posts are fetched, so a draft in WordPress is a draft on the
 * site — which is the human review gate for AI-written copy.
 *
 * NOTE: untested against a live instance. The field mapping follows the
 * documented `wp/v2/posts` response, but the ACF/meta key names below must be
 * confirmed against the actual WordPress setup before going live.
 */

/** Meta keys the pipeline is expected to register via `register_post_meta`. */
const META = {
  subtitle: 'uk_subtitle',
  imageCredit: 'uk_image_credit',
  kind: 'uk_kind',
} as const;

const PER_PAGE = 100;

interface WpRendered {
  rendered: string;
}

interface WpMedia {
  source_url?: string;
  alt_text?: string;
  media_details?: {
    sizes?: Record<string, { width?: number; height?: number; source_url?: string }>;
  };
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
    'wp:featuredmedia'?: WpMedia[];
    'wp:term'?: Array<Array<{ taxonomy?: string; slug?: string; name?: string }>>;
  };
}

/**
 * Featured image URL, tagged with the sizes WordPress generated on upload.
 *
 * The tag is a `#wp=1024x576,768x432,…` fragment that `image-loader.ts` reads to
 * request the right variant. Without it the browser downloads the full-size
 * original for a 68px thumbnail — WordPress does not resize on request.
 */
function readImage(media: WpMedia | undefined): string | undefined {
  const source = media?.source_url;
  if (!source) return undefined;

  // The suffix is read off each variant's own URL rather than computed from its
  // width and height. WordPress's `full` entry points at the untouched original
  // (`hero.jpg`, no suffix) — deriving `1920x1080` from its dimensions would
  // produce a URL that 404s. Only genuinely suffixed files are offered.
  const labels = Object.values(media?.media_details?.sizes ?? {})
    .map((size) => /-(\d+x\d+)\.[a-z0-9]+(?:$|\?)/i.exec(size.source_url ?? '')?.[1])
    .filter((label): label is string => Boolean(label));

  const unique = [...new Set(labels)];
  return unique.length > 0 ? `${source}#wp=${unique.join(',')}` : source;
}

/** WordPress returns HTML-escaped, tag-wrapped strings even for plain fields. */
function plain(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Post HTML → Markdown.
 *
 * Deliberately minimal: the pipeline is expected to write Markdown-ish content
 * through the block editor, so this only has to undo the wrapper markup that
 * WordPress adds. Anything it does not recognise survives as a paragraph.
 */
function htmlToMarkdown(html: string): string {
  return html
    .replace(/<h([2-4])[^>]*>(.*?)<\/h\1>/gis, (_, level: string, text: string) =>
      `\n\n${'#'.repeat(Number(level))} ${plain(text)}\n\n`,
    )
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (_, text: string) =>
      `\n\n> ${plain(text)}\n\n`,
    )
    .replace(/<li[^>]*>(.*?)<\/li>/gis, (_, text: string) => `\n- ${plain(text)}`)
    .replace(/<\/(ul|ol)>/gi, '\n\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gis, (_, text: string) => `\n\n${plain(text)}\n\n`)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const CATEGORY_SLUGS = new Set<string>([
  'ai',
  'education',
  'technology',
  'politics',
  'world',
  'business',
  'science',
  'culture',
  'health',
  'environment',
]);

/** First WordPress category term that matches one of our desks. */
function readCategory(post: WpPost): CategorySlug | undefined {
  const groups = post._embedded?.['wp:term'] ?? [];
  for (const group of groups) {
    for (const term of group) {
      if (term.taxonomy === 'category' && term.slug && CATEGORY_SLUGS.has(term.slug)) {
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

/**
 * `register_post_meta` with a `''` default returns an empty string, not
 * `undefined`, for any post whose editor never touched the field — so `??`
 * never fires and the enum rejects it. Anything unrecognised becomes a plain
 * report, which is the correct neutral treatment.
 */
function readKind(post: WpPost): string {
  const raw = (post.meta?.[META.kind] ?? '').trim();
  return KINDS.has(raw) ? raw : 'report';
}

/**
 * WordPress auto-generates an excerpt from the body, but a short post — or one
 * whose content is mostly markup — can still yield an empty string. Fall back
 * to the opening of the body rather than refusing to publish the story.
 */
function readSummary(post: WpPost, body: string): string {
  const excerpt = plain(post.excerpt.rendered);
  if (excerpt) return excerpt;

  const firstParagraph = body
    .split('\n\n')
    .map((chunk) => chunk.trim())
    .find((chunk) => chunk.length > 0 && !chunk.startsWith('#') && !chunk.startsWith('>'));

  if (!firstParagraph) return plain(post.title.rendered);

  // Trim to a sentence boundary where there is one nearby, else a word one.
  const cut = firstParagraph.slice(0, 200);
  const sentence = cut.lastIndexOf('.');
  if (sentence > 80) return cut.slice(0, sentence + 1);
  return cut.length < firstParagraph.length ? `${cut.replace(/\s\S*$/, '')}…` : cut;
}

/**
 * A slug an editor set by hand is kept verbatim. Anything else — which means
 * WordPress derived it from a Persian title and percent-encoded it — is
 * transliterated and suffixed with the post id, because two different titles
 * can transliterate to the same consonant skeleton.
 */
function readSlug(post: WpPost): string {
  const decoded = decodeSlug(post.slug);
  if (isLatinSlug(decoded)) return decoded;
  return `${toLatinSlug(plain(post.title.rendered), 'post')}-${post.id}`;
}

function toSource(post: WpPost): unknown {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const author = post._embedded?.author?.[0];
  const bodyMarkdown = htmlToMarkdown(post.content.rendered);

  return {
    id: `wp-${post.id}`,
    slug: readSlug(post),
    title: plain(post.title.rendered),
    subtitle: (post.meta?.[META.subtitle] ?? '').trim(),
    summary: readSummary(post, bodyMarkdown),
    category: readCategory(post),
    authorId: author?.slug ?? 'a-rahimi',
    publishedAt: new Date(`${post.date_gmt}Z`).toISOString(),
    updatedAt: post.modified_gmt ? new Date(`${post.modified_gmt}Z`).toISOString() : undefined,
    image: readImage(media),
    imageAlt: media?.alt_text?.trim() || plain(post.title.rendered),
    imageCredit: (post.meta?.[META.imageCredit] ?? '').trim(),
    kind: readKind(post),
    tags: readTags(post),
    bodyMarkdown,
  };
}

/** Every published post, paged through and validated. */
export async function fetchWordPressArticles(baseUrl: string): Promise<ArticleSource[]> {
  const sources: ArticleSource[] = [];
  const problems: string[] = [];

  for (let page = 1; ; page += 1) {
    const url = new URL('/wp-json/wp/v2/posts', baseUrl);
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
      } else {
        for (const issue of result.error.issues) {
          problems.push(`پست ${post.id} (${post.slug}) → ${issue.path.join('.')}: ${issue.message}`);
        }
      }
    }

    const totalPages = Number(response.headers.get('x-wp-totalpages') ?? '1');
    if (page >= totalPages) break;
  }

  if (problems.length > 0) {
    throw new Error(
      `اعتبارسنجی محتوای وردپرس شکست خورد (${problems.length} مورد):\n  - ${problems.join('\n  - ')}`,
    );
  }

  return sources;
}
