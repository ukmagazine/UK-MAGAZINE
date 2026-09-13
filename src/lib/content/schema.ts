import { z } from 'zod';
import { CATEGORY_SLUGS } from '@/lib/category-slugs';
import { PIN_TARGETS, isCalendarDate } from '@/lib/pins';

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

/** Absolute https(s) URL. Used for company sites, logos and LinkedIn pages. */
const externalUrl = z.string().refine(
  (value) => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
      return false;
    }
  },
  { message: 'باید یک نشانی کامل http(s) باشد' },
);

/**
 * Interview-desk fields.
 *
 * 🔴 Every field here is `.optional()`, and that is not a style choice. All
 * articles published before this desk existed carry none of them; a single
 * required field would fail every one of them at once, leaving zero valid
 * articles — which is the one condition that fails the build outright.
 */
export const interviewDetailsSchema = z.object({
  lang: z.enum(['fa', 'en']).optional(),
  guestName: z.string().min(1).optional(),
  guestRole: z.string().min(1).optional(),
  companyName: z.string().min(1).optional(),
  companyUrl: externalUrl.optional(),
  companyLogoUrl: externalUrl.optional(),
  companyLocation: z.string().min(1).optional(),
  guestLinkedin: externalUrl.optional(),
  companyLinkedin: externalUrl.optional(),
  editorNote: z.string().min(1).optional(),
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
  kind: z
    .enum(['report', 'analysis', 'opinion', 'video', 'breaking', 'interview'])
    .default('report'),
  /**
   * Commercial disclosure. Defaults to editorial, so an automated record that
   * never mentions the field — every one of them — is unaffected.
   */
  sponsored: z.enum(['paid', 'advertorial', 'supported', '']).default(''),
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

  /**
   * Interviewee and company. Optional as a whole and optional field by field,
   * so this is inert for every non-interview article.
   */
  interview: interviewDetailsSchema.optional(),

  /**
   * Editor-set pin.
   *
   * 🔴 `.catch()` on all three, not merely `.optional()`: a bad pin value must
   * cost the article its pin, never its place on the site. The WordPress
   * adapter has already turned anything invalid into "absent" and warned by
   * slug; this is the backstop for a hand-edited JSON file.
   *
   * An unreadable expiry is caught as a date long past, not as "no expiry".
   * The date was typed to END the pin, and pinned-forever is the dangerous
   * reading of a mistake.
   */
  pin: z.enum(PIN_TARGETS).optional().catch(undefined),
  pinRank: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional().catch(undefined),
  pinUntil: z.string().refine(isCalendarDate).optional().catch('0000-00-00'),

  /** Body as Markdown; converted to typed blocks at load time. */
  bodyMarkdown: z.string().min(1),
});

export type ArticleSource = z.infer<typeof articleSourceSchema>;
