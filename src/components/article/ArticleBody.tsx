import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ArticleBlock, SponsoredKind } from '@/lib/types';

interface ArticleBodyProps {
  blocks: ArticleBlock[];
  /** Drives the `rel` on outbound links. See `externalRel`. */
  sponsored?: SponsoredKind;
}

/**
 * `rel` for every external link in the body.
 *
 * Google requires `rel="sponsored"` on links where payment was involved, which
 * is `paid` and `advertorial` — and only those.
 *
 * Everywhere else, including `supported`, links keep a plain `rel="noopener"`
 * and must NOT get `nofollow`. Source citations are the credibility backbone of
 * this publication: every article ends by linking the outlet it is drawn from,
 * and marking those `nofollow` would disown them. A `supported` feature
 * involves no payment, so its links are ordinary editorial links.
 */
export function externalRel(sponsored: SponsoredKind | undefined): string {
  return sponsored === 'paid' || sponsored === 'advertorial'
    ? 'sponsored noopener'
    : 'noopener';
}


const INLINE_LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

function safeExternalHref(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

/** Render the tiny inline Markdown subset produced by the WordPress adapter. */
function renderInlineMarkdown(text: string, rel: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  INLINE_LINK_RE.lastIndex = 0;
  while ((match = INLINE_LINK_RE.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));

    const href = safeExternalHref(match[2]);
    if (href) {
      nodes.push(
        <a
          key={`${match.index}-${href}`}
          href={href}
          target="_blank"
          rel={rel}
          className="font-medium text-brand-deep underline decoration-brand-red/40 underline-offset-[3px] transition-colors hover:decoration-brand-red"
        >
          {match[1]}
        </a>,
      );
    } else {
      nodes.push(match[1]);
    }

    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

/**
 * Renders the typed block list that makes up an article.
 *
 * Blocks are structured data rather than HTML strings, so there is no
 * `dangerouslySetInnerHTML` anywhere in the reading experience.
 */
export function ArticleBody({ blocks, sponsored = '' }: ArticleBodyProps) {
  const rel = externalRel(sponsored);

  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={index}>{renderInlineMarkdown(block.text, rel)}</p>;

          case 'heading':
            return (
              <h2
                key={index}
                id={block.id}
                className="mt-11 scroll-mt-32 font-serif text-2xl leading-tight tracking-[-0.015em] text-ink sm:text-[1.75rem]"
              >
                <span aria-hidden="true" className="mb-3 block h-[3px] w-9 bg-brand-red" />
                {block.text}
              </h2>
            );

          case 'quote':
            return (
              <figure
                key={index}
                className="my-10 rounded-md border border-line bg-surface p-6 shadow-card sm:p-8"
              >
                {/* Oversized red opening mark — a magazine flourish. */}
                <span
                  aria-hidden="true"
                  className="block font-serif text-5xl leading-[0.5] text-brand-red sm:text-6xl"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-4">
                  <p className="font-serif text-xl leading-snug tracking-[-0.02em] text-ink sm:text-2xl">
                    {block.text}
                  </p>
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-2.5 text-sm text-ink-soft">
                  <span aria-hidden="true" className="h-[2px] w-6 bg-brand-red" />
                  {block.attribution}
                </figcaption>
              </figure>
            );

          case 'list': {
            const items = block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="ps-1.5 marker:text-brand-red">
                {renderInlineMarkdown(item, rel)}
              </li>
            ));

            return block.ordered ? (
              <ol
                key={index}
                className="my-7 list-decimal space-y-2.5 ps-6 text-[1.0625rem] leading-relaxed marker:font-semibold sm:text-[1.125rem]"
              >
                {items}
              </ol>
            ) : (
              <ul
                key={index}
                className="my-7 list-disc space-y-2.5 ps-6 text-[1.0625rem] leading-relaxed sm:text-[1.125rem]"
              >
                {items}
              </ul>
            );
          }

          case 'image':
            return (
              <figure key={index} className="my-9">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-surface-soft">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 760px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 border-s-2 border-line ps-3 text-sm leading-relaxed text-ink-soft">
                  {block.caption}
                </figcaption>
              </figure>
            );

          case 'links':
            return (
              <aside
                key={index}
                className="my-9 rounded-md border border-line bg-surface-soft p-5"
                aria-label={block.title}
              >
                <p className="label mb-3 flex items-center text-brand-red">
                  <span aria-hidden="true" className="me-2 h-[3px] w-5 bg-brand-red" />
                  {block.title}
                </p>
                <ul className="space-y-2.5">
                  {block.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        {...(safeExternalHref(item.href)
                          ? { target: '_blank', rel }
                          : {})}
                        className="group inline-flex items-start gap-1.5 text-base font-medium leading-snug text-ink no-underline transition-colors hover:text-brand-red"
                      >
                        <span className="link-underline">{item.label}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="mt-1 h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

/** Extracts heading blocks so the table of contents stays in sync with the body. */
export function extractHeadings(blocks: ArticleBlock[]): Array<{ id: string; text: string }> {
  return blocks
    .filter((block): block is Extract<ArticleBlock, { type: 'heading' }> => block.type === 'heading')
    .map((block) => ({ id: block.id, text: block.text }));
}
