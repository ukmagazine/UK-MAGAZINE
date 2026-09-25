/**
 * The «تیم ما» section on /about/.
 *
 * This is the About page only. Article bylines are the house byline in
 * data/authors.ts and are deliberately not tied to anyone listed here.
 *
 * - An entry with `visible: false` renders nothing at all: no card, no gap.
 *   To switch one on, fill in `name` and `role` and set `visible: true`.
 * - `photo` is a path inside `public/`. The image is shown only if that file
 *   exists when the site is built; otherwise an initials avatar is drawn. So
 *   uploading the file on GitHub is all it takes — no code change.
 * - `founder: true` also names the person as the publication's founder in the
 *   organisation's structured data.
 */
export interface TeamMember {
  name: string;
  role: string;
  /** Path under `public/`, e.g. `/team/founder.jpg`. */
  photo: string;
  founder?: boolean;
  visible: boolean;
}

export const team: TeamMember[] = [
  {
    name: 'محمدرضا علی یاری',
    role: 'بنیان‌گذار و سردبیر',
    photo: '/team/founder.jpg',
    founder: true,
    visible: true,
  },
  // Ready slots. Fill in and set `visible: true` to show them.
  { name: '', role: '', photo: '', visible: false },
  { name: '', role: '', photo: '', visible: false },
];

/** Entries that are switched on and actually have a name. */
export const visibleTeam: TeamMember[] = team.filter(
  (member) => member.visible && member.name.trim().length > 0,
);
