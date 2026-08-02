/**
 * Pulls published posts out of WordPress and materialises them as JSON files
 * in `content/articles/`.
 *
 *   npm run sync:wp
 *
 * Why a sync step rather than fetching during the build:
 *
 *   - the content loader stays synchronous, so nothing downstream changes
 *   - the fetched content lands in the repository as files, which means every
 *     run is a reviewable diff and a bad batch can be reverted
 *   - a build cannot be broken by WordPress being unreachable at the moment it
 *     runs; the last good content is already on disk
 *
 * Only files this script wrote are pruned (their ids carry a `wp-` prefix), so
 * hand-authored articles sitting alongside them are left alone.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchWordPressArticles } from '../src/lib/content/wordpress';
import type { ArticleSource } from '../src/lib/content/schema';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'content', 'articles');

async function main(): Promise<void> {
  const baseUrl = process.env.WORDPRESS_URL;

  if (!baseUrl) {
    console.error(
      'WORDPRESS_URL تنظیم نشده است.\n' +
        'نمونه:  WORDPRESS_URL=https://cms.example.com npm run sync:wp',
    );
    process.exit(1);
  }

  console.log(`دریافت از ${baseUrl} …`);
  const articles: ArticleSource[] = await fetchWordPressArticles(baseUrl);

  if (articles.length === 0) {
    console.error('هیچ پست منتشرشده‌ای برگردانده نشد — چیزی نوشته نشد.');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const written = new Set<string>();
  for (const article of articles) {
    const file = `${article.slug}.json`;
    fs.writeFileSync(
      path.join(OUT_DIR, file),
      `${JSON.stringify(article, null, 2)}\n`,
      'utf8',
    );
    written.add(file);
  }

  // Prune posts that were deleted or unpublished in WordPress. Only files this
  // script owns are considered — a `wp-` id is the marker.
  let pruned = 0;
  for (const file of fs.readdirSync(OUT_DIR)) {
    if (!file.endsWith('.json') || written.has(file)) continue;
    try {
      const existing = JSON.parse(fs.readFileSync(path.join(OUT_DIR, file), 'utf8')) as {
        id?: string;
      };
      if (typeof existing.id === 'string' && existing.id.startsWith('wp-')) {
        fs.unlinkSync(path.join(OUT_DIR, file));
        pruned += 1;
      }
    } catch {
      // Unreadable file: leave it for the build's validation to report.
    }
  }

  console.log(`${articles.length} مقاله نوشته شد${pruned > 0 ? `، ${pruned} مورد حذف شد` : ''}.`);

  /**
   * The adapter fills several fields in rather than rejecting a post that is
   * missing them, which is what keeps the pipeline running unattended. Those
   * guesses are surfaced here so nobody discovers months later that every
   * story has the headline repeated as its image alt text.
   */
  const transliterated = articles.filter((article) => /-\d+$/.test(article.slug));
  const noSubtitle = articles.filter((article) => !article.subtitle);
  const noCredit = articles.filter((article) => !article.imageCredit);
  const altFromTitle = articles.filter((article) => article.imageAlt === article.title);
  const allReports = articles.every((article) => article.kind === 'report');

  const notes: string[] = [];
  if (transliterated.length > 0) {
    notes.push(
      `${transliterated.length} اسلاگ از فارسی به لاتین برگردانده شد ` +
        `(مثال: ${transliterated[0].slug}). برای نشانی خواناتر، اسلاگ را در وردپرس دستی بگذارید.`,
    );
  }
  if (altFromTitle.length > 0) {
    notes.push(
      `${altFromTitle.length} تصویر متن جایگزین نداشت و از تیتر استفاده شد — ` +
        'برای دسترس‌پذیری، Alt Text را در کتابخانهٔ رسانهٔ وردپرس پر کنید.',
    );
  }
  if (noSubtitle.length > 0) notes.push(`${noSubtitle.length} مقاله زیرعنوان (uk_subtitle) ندارد.`);
  if (noCredit.length > 0) notes.push(`${noCredit.length} تصویر اعتبار (uk_image_credit) ندارد.`);
  if (allReports && articles.length > 1) {
    notes.push('هیچ مقاله‌ای نوع (uk_kind) نداشت — همه «گزارش» در نظر گرفته شدند.');
  }

  if (notes.length > 0) {
    console.log('\nمواردی که خودکار تکمیل شد:');
    for (const note of notes) console.log(`  • ${note}`);
  }

  console.log('\nحالا اجرا کنید:  npm run build');
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
