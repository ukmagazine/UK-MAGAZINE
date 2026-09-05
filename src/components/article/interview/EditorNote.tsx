import { cn } from '@/lib/utils';

interface EditorNoteProps {
  note: string;
  className?: string;
}

/**
 * The desk's own framing of the interview, in Persian.
 *
 * It sits between the lead image and the body because that is where it does
 * its job: on an English interview it is the last Persian prose the reader
 * meets before the language changes, and it tells a Persian-reading audience
 * why this conversation was worth running. It is therefore explicitly
 * `dir="rtl" lang="fa"` — the body around it may be neither.
 *
 * Rendered only when `uk_editor_note` is filled; an empty note produces no
 * box, no heading and no border.
 */
export function EditorNote({ note, className }: EditorNoteProps) {
  return (
    <aside
      dir="rtl"
      lang="fa"
      className={cn(
        'rounded-md border border-brand-red/25 bg-brand-wash p-5 text-right sm:p-6',
        className,
      )}
      aria-labelledby="editor-note-heading"
    >
      <h2
        id="editor-note-heading"
        className="label mb-3 flex items-center text-brand-deep"
      >
        <span aria-hidden="true" className="ms-0 me-2 h-[3px] w-5 bg-brand-red" />
        یادداشت تحریریهٔ یوکی مگزین
      </h2>
      <p className="text-[0.9375rem] leading-[1.9] text-ink sm:text-base">{note}</p>
    </aside>
  );
}
