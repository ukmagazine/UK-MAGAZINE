/**
 * Pulls published posts out of WordPress and materialises them as JSON files
 * in `content/articles/`.
 *
 *   npm run sync:wp
 *
 * Why a sync step rather than fetching during the build:
 *
 *   - the content loader stays synchronous, so nothing downstream changes
 *   - the fetched content lands in the build workspace as files, keeping the
 *     site loader deterministic and making local sync output easy to inspect
 *   - a build cannot be broken by WordPress being unreachable at the moment it
 *     runs; the last good content is already on disk
 *
 * `content/articles/` is a generated workspace, not an editorial source.
 * On every successful sync, every existing JSON article is removed first and
 * replaced only with the current valid WordPress payload. This guarantees that
 * legacy/demo/static articles can never leak into the published site.
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
        'نمونه:  WORDPRESS_URL=https://cms.theukmag.com npm run sync:wp',
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

  // Workflow-only content policy: this directory is generated output.
  // Remove every legacy/demo/static JSON file before materialising the current
  // WordPress corpus. `.gitkeep` and any non-JSON files are intentionally kept.
  let removed = 0;
  for (const file of fs.readdirSync(OUT_DIR)) {
    if (!file.endsWith('.json')) continue;
    fs.unlinkSync(path.join(OUT_DIR, file));
    removed += 1;
  }

  for (const article of articles) {
    const file = `${article.slug}.json`;
    fs.writeFileSync(
      path.join(OUT_DIR, file),
      `${JSON.stringify(article, null, 2)}\n`,
      'utf8',
    );
  }

  console.log(
    `${articles.length} مقاله از وردپرس نوشته شد` +
      `${removed > 0 ? `، ${removed} فایل قدیمی/استاتیک حذف شد` : ''}.`,
  );

  /**
   * Optional editorial fields may be defaulted by the adapter. Surface those
   * defaults here so unattended publishing never turns a silent assumption
   * into a long-lived content-quality problem.
   */
  const transliterated = articles.filter((article) => /-\d+$/.test(article.slug));
  const noSubtitle = articles.filter((article) => !article.subtitle);
  const noCredit = articles.filter((article) => !article.imageCredit);
  const allReports = articles.every((article) => article.kind === 'report');

  const notes: string[] = [];
  if (transliterated.length > 0) {
    notes.push(
      `${transliterated.length} اسلاگ از فارسی به لاتین برگردانده شد ` +
        `(مثال: ${transliterated[0].slug}). برای نشانی خواناتر، اسلاگ را در وردپرس دستی بگذارید.`,
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
