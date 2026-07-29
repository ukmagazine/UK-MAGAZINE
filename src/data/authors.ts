import type { Author } from '@/lib/types';

/**
 * Fictional bylines for the template. Avatars render as typographic monograms
 * (see `AuthorAvatar`) rather than photographs, so no real person's likeness is
 * attached to invented reporting.
 */
export const authors: Author[] = [
  {
    id: 'a-halden',
    name: 'Ines Halden',
    initials: 'IH',
    role: 'Senior AI Correspondent',
    bio: 'Ines covers the research labs and the regulators trying to keep pace with them. She joined UK MAGAZINE in 2021 after eight years reporting on computational science, and writes the AI Weekly newsletter.',
    location: 'Zürich',
    beats: ['ai', 'technology'],
  },
  {
    id: 'a-okonjo',
    name: 'Daniel Okonjo',
    initials: 'DO',
    role: 'Chief Economics Writer',
    bio: 'Daniel reports on central banks, labour markets and industrial policy. He has covered four monetary tightening cycles and prefers a balance sheet to a press release.',
    location: 'London',
    beats: ['business', 'world'],
  },
  {
    id: 'a-varga',
    name: 'Petra Varga',
    initials: 'PV',
    role: 'Education Editor',
    bio: 'Petra leads UK MAGAZINE’s education desk, with a focus on assessment reform and the widening gap between school funding formulas and actual classroom cost.',
    location: 'Berlin',
    beats: ['education'],
  },
  {
    id: 'a-marchetti',
    name: 'Luca Marchetti',
    initials: 'LM',
    role: 'Political Correspondent',
    bio: 'Luca covers legislatures and the slow work of lawmaking. He reports on process — committee schedules, amendment texts and vote counts — and leaves the adjectives out.',
    location: 'Brussels',
    beats: ['politics', 'world'],
  },
  {
    id: 'a-nakamura',
    name: 'Aiko Nakamura',
    initials: 'AN',
    role: 'Science Editor',
    bio: 'Aiko trained as a materials physicist before turning to journalism. She is interested in the distance between a published result and a working product.',
    location: 'Tokyo',
    beats: ['science', 'environment'],
  },
  {
    id: 'a-brenner',
    name: 'Sam Brenner',
    initials: 'SB',
    role: 'Technology Correspondent',
    bio: 'Sam writes about platform infrastructure, security and the unglamorous systems that fail loudly when they fail. Previously a network engineer.',
    location: 'Toronto',
    beats: ['technology', 'ai'],
  },
  {
    id: 'a-ferreira',
    name: 'Camila Ferreira',
    initials: 'CF',
    role: 'Culture Editor',
    bio: 'Camila covers film, design and the economics of attention. She is drawn to the moment a subculture becomes an industry.',
    location: 'São Paulo',
    beats: ['culture'],
  },
  {
    id: 'a-osei',
    name: 'Nadia Osei',
    initials: 'NO',
    role: 'Health & Systems Reporter',
    bio: 'Nadia reports on clinical evidence and the health systems meant to deliver it, with particular attention to primary care and workforce shortages.',
    location: 'Accra',
    beats: ['health', 'science'],
  },
  {
    id: 'a-lindqvist',
    name: 'Erik Lindqvist',
    initials: 'EL',
    role: 'Environment Correspondent',
    bio: 'Erik covers the energy transition from the grid outward — interconnectors, permitting queues and the towns hosting the build-out.',
    location: 'Copenhagen',
    beats: ['environment', 'science'],
  },
  {
    id: 'a-rahimi',
    name: 'Yasmin Rahimi',
    initials: 'YR',
    role: 'Foreign Affairs Correspondent',
    bio: 'Yasmin reports on diplomacy, trade corridors and migration policy. She has filed from twenty-three countries and reads three treaty languages.',
    location: 'Istanbul',
    beats: ['world', 'politics'],
  },
];

const authorIndex: Record<string, Author> = Object.fromEntries(
  authors.map((author) => [author.id, author]),
);

export function getAuthor(id: string): Author | undefined {
  return authorIndex[id];
}
