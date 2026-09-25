import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { visibleTeam, type TeamMember } from '@/data/team';

const PROJECT_ROOT = process.env.PROJECT_ROOT ?? process.cwd();

/**
 * Whether the photo file is in `public/`. Checked at build time, so a photo
 * uploaded later through GitHub appears on the next deployment by itself.
 */
function photoExists(photo: string): boolean {
  if (!photo.startsWith('/')) return false;
  try {
    return fs.statSync(path.join(PROJECT_ROOT, 'public', photo)).isFile();
  } catch {
    return false;
  }
}

/**
 * First letter of the first and last word. A zero-width non-joiner keeps the
 * two Persian letters from joining into what would read as a word.
 */
function initials(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.charAt(0) ?? '';
  const last = words.length > 1 ? words[words.length - 1].charAt(0) : '';
  return last ? `${first}‌${last}` : first;
}

function Avatar({ member }: { member: TeamMember }) {
  if (photoExists(member.photo)) {
    return (
      <Image
        src={member.photo}
        alt={member.name}
        width={96}
        height={96}
        className="h-24 w-24 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brand-red font-serif text-2xl font-semibold text-white"
    >
      {initials(member.name)}
    </span>
  );
}

/** «تیم ما». Renders nothing when no entry is visible. */
export function TeamSection() {
  if (visibleTeam.length === 0) return null;

  return (
    <>
      <h2>تیم ما</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {visibleTeam.map((member) => (
          <div
            key={member.name}
            className="flex items-center gap-4 rounded-md border border-line bg-surface p-4"
          >
            <Avatar member={member} />
            <div className="min-w-0">
              <p className="font-serif text-lg font-semibold leading-snug text-ink">
                {member.name}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
