import { z } from 'zod';
import { CATEGORY_SLUGS } from '@/lib/category-slugs';

/**
 * The contract between the content pipeline and the site.
 *
 * Every file in `content/articles/` is validated against this before the build
 * is allowed to use it. Automation output is untrusted: malformed records are
 * warned about and skipped, and the build fails only when no valid article is
 * left to publish.
 *
 * Fields the pipeline must NOT supply are absent here on purpose —
 * `readingTime`, `relatedIds` and `body` are derived at load time (see
 * `load.ts`), because they are facts about the corpus rather than editorial
 * choices.
 */



/** ISO 8601 instant. Checked by parsing rather than by pattern. */
const isoDate = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'باید یک تاریخ معتبر ISO 8601 باشد، مثل 2026-07-29T09:00:00.000Z',
  });

/**
 * Absolute URL, or a path into `public/`. Both are understood by the custom
 * image loader, so both are legal here.
 */
const imageRef = z.string().refine(
  (value) => {
    if (value.startsWith('/')) return true;
    try {
      const url = new URL(value);
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
      return false;
    }
  },
  { message: 'باید یک نشانی کامل http(s) یا مسیری باشد که با / شروع می‌شود' },
);

/** Latin, lowercase, hyphenated — keeps URLs shareable without percent-encoding. */
const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'باید با حروف کوچک لاتین، عدد و خط تیره نوشته شود (اسلاگ فارسی در URL به درصد-کدگذاری تبدیل می‌شود)',
  });

export const briefingSchema = z.object({
  whatHappened: z.string().min(1),
  whyItMatters: z.string().min(1),
  biggerPicture: z.string().optional(),
  whatToWatch: z.string().optional(),
  keyTakeaway: z.string().min(1),
});

export const articleSourceSchema = z.object({
  /** Stable external key — the Airtable record id or the WordPress post id. */
  id: z.string().min(1),
  slug,
  title: z.string().min(1),
  subtitle: z.string().default(''),
  summary: z.string().min(1),
  category: z.enum(CATEGORY_SLUGS),
  authorId: z.string().min(1),
  publishedAt: isoDate,
  updatedAt: isoDate.optional(),
  image: imageRef,
  imageAlt: z.string().min(1, 'متن جایگزین تصویر برای دسترس‌پذیری الزامی است'),
  imageCredit: z.string().default(''),
  kind: z.enum(['report', 'analysis', 'opinion', 'video', 'breaking']).default('report'),
  tags: z.array(z.string().min(1)).default([]),

  // Editorial flags. The pipeline defaults them to false; a human promotes.
  featured: z.boolean().default(false),
  trending: z.boolean().default(false),
  editorsPick: z.boolean().default(false),
  inDepth: z.boolean().default(false),

  /** Popularity, if analytics ever feed it back. Ranking falls back to recency. */
  reads: z.number().int().nonnegative().default(0),

  briefing: briefingSchema.optional(),
  keyFacts: z.array(z.string().min(1)).optional(),

  /** Body as Markdown; converted to typed blocks at load time. */
  bodyMarkdown: z.string().min(1),
});

export type ArticleSource = z.infer<typeof articleSourceSchema>;
