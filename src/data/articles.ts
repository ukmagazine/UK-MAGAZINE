/**
 * The article corpus.
 *
 * Stories are no longer authored in TypeScript. They live as JSON files in
 * `content/articles/`, written by the content pipeline (Make → WordPress →
 * this repository) and validated against `lib/content/schema.ts` at build
 * time. A record that does not match the schema fails the build rather than
 * reaching a reader.
 *
 * Everything downstream — routes, sitemap, search, structured data and every
 * listing — still reads this same array, so nothing else had to change.
 *
 * To add a story by hand: drop a JSON file into `content/articles/`.
 */
export { articles, breakingItems } from '@/lib/content/load';
