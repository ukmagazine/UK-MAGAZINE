import type { ArticleBlock } from '@/lib/types';

/**
 * Markdown → typed article blocks.
 *
 * The AI writes Markdown because it is good at it and because a Markdown cell
 * in Airtable or a WordPress editor stays readable and editable by a human.
 * The conversion to `ArticleBlock[]` happens here, at build time, rather than
 * inside the automation — so it is deterministic, reviewable in a diff, and
 * testable without running a scenario.
 *
 * The supported subset is intentionally small, because it is exactly what the
 * article page renders:
 *
 *   ## Heading            → heading   (sequential id, so Persian text never
 *                                      lands percent-encoded in a TOC anchor)
 *   > Quote               → quote     (a trailing "— attribution" line is split off)
 *   - item / 1. item      → list
 *   ![alt](src "caption") → image
 *   anything else         → paragraph
 *
 * Unsupported syntax degrades to a paragraph rather than throwing: a story
 * with an odd character in it should still publish.
 */

/** Blank-line-separated chunks, with Windows line endings normalised away. */
function toChunks(markdown: string): string[] {
  return markdown
    .replace(/\r\n?/g, '\n')
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

const IMAGE_RE = /^!\[([^\]]*)\]\(\s*(\S+?)(?:\s+"([^"]*)")?\s*\)$/;
const ORDERED_ITEM_RE = /^\d+[.)]\s+/;
const UNORDERED_ITEM_RE = /^[-*+]\s+/;

/** Strip inline emphasis markers the renderer does not interpret. */
function clean(text: string): string {
  // Protect only link destinations so emphasis in a link label is cleaned too,
  // while a rare `*` inside the URL itself remains byte-for-byte unchanged.
  const hrefs: string[] = [];
  const protectedText = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, label: string, href: string) => {
      const token = `@@UKMAG_HREF_${hrefs.length}@@`;
      hrefs.push(href);
      return `[${label}](${token})`;
    },
  );

  return protectedText
    .replace(/\*{1,3}/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/@@UKMAG_HREF_(\d+)@@/g, (_, index: string) => hrefs[Number(index)] ?? '');
}

export function markdownToBlocks(markdown: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  let headingCount = 0;

  for (const chunk of toChunks(markdown)) {
    const lines = chunk.split('\n').map((line) => line.trim());

    // ── Heading ────────────────────────────────────────────────
    const heading = /^#{2,4}\s+(.*)$/.exec(lines[0]);
    if (heading && lines.length === 1) {
      headingCount += 1;
      blocks.push({
        type: 'heading',
        id: `h-${headingCount}`,
        text: clean(heading[1]),
      });
      continue;
    }

    // ── Image ──────────────────────────────────────────────────
    const image = IMAGE_RE.exec(lines[0]);
    if (image && lines.length === 1) {
      blocks.push({
        type: 'image',
        src: image[2],
        alt: clean(image[1]),
        caption: clean(image[3] ?? ''),
      });
      continue;
    }

    // ── Quote ──────────────────────────────────────────────────
    if (lines.every((line) => line.startsWith('>'))) {
      const body = lines.map((line) => line.replace(/^>\s?/, ''));
      // A final line opening with an em dash is the attribution.
      const lastLine = body[body.length - 1] ?? '';
      const attributed = /^[—–-]\s*(.+)$/.exec(lastLine);
      const attribution = attributed ? clean(attributed[1]) : '';
      const text = clean((attributed ? body.slice(0, -1) : body).join(' '));

      if (text) {
        blocks.push({ type: 'quote', text, attribution });
        continue;
      }
    }

    // ── List ───────────────────────────────────────────────────
    const ordered = lines.every((line) => ORDERED_ITEM_RE.test(line));
    const unordered = lines.every((line) => UNORDERED_ITEM_RE.test(line));
    if ((ordered || unordered) && lines.length > 0) {
      blocks.push({
        type: 'list',
        ordered,
        items: lines.map((line) =>
          clean(line.replace(ordered ? ORDERED_ITEM_RE : UNORDERED_ITEM_RE, '')),
        ),
      });
      continue;
    }

    // ── Paragraph ──────────────────────────────────────────────
    blocks.push({ type: 'paragraph', text: clean(lines.join(' ')) });
  }

  return blocks;
}

/**
 * Reading time in minutes, from the body text only.
 *
 * 200 words per minute is the usual figure for Persian prose; headings and
 * image captions are counted because a reader's eye still crosses them. Always
 * at least one minute — "۰ دقیقه مطالعه" reads like a bug.
 */
export function estimateReadingTime(blocks: ArticleBlock[]): number {
  let words = 0;

  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
      case 'heading':
        words += block.text.split(/\s+/).filter(Boolean).length;
        break;
      case 'quote':
        words += `${block.text} ${block.attribution}`.split(/\s+/).filter(Boolean).length;
        break;
      case 'list':
        words += block.items.join(' ').split(/\s+/).filter(Boolean).length;
        break;
      case 'image':
        words += block.caption.split(/\s+/).filter(Boolean).length;
        break;
      case 'links':
        words += block.items.map((item) => item.label).join(' ').split(/\s+/).filter(Boolean).length;
        break;
    }
  }

  return Math.max(1, Math.round(words / 200));
}
