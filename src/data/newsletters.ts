import type { Newsletter } from '@/lib/types';

export const newsletters: Newsletter[] = [
  {
    id: 'daily-brief',
    name: 'Daily Brief',
    cadence: 'Every weekday, 06:30 local',
    description:
      'The ten things that moved overnight, each in under sixty words, with a line on why it matters. Built to be finished before your coffee is.',
    sample: 'Grid operators cleared a record interconnection backlog — and three reasons the pace will not hold.',
    subscribers: '184,000',
    icon: 'brief',
  },
  {
    id: 'ai-weekly',
    name: 'AI Weekly',
    cadence: 'Thursdays',
    description:
      'Ines Halden on what actually shipped this week: model capabilities, procurement decisions, regulatory drafts and the research worth reading in full.',
    sample: 'Why the new evaluation standard changes procurement more than it changes the models.',
    subscribers: '96,400',
    icon: 'ai',
  },
  {
    id: 'education-update',
    name: 'Education Update',
    cadence: 'Tuesdays',
    description:
      'Petra Varga on classrooms, campuses and the funding formulas underneath both — including the studies that did not survive replication.',
    sample: 'Four districts tried the same tutoring programme. Only one measured it properly.',
    subscribers: '41,200',
    icon: 'education',
  },
  {
    id: 'global-politics',
    name: 'Global Politics',
    cadence: 'Mondays & Fridays',
    description:
      'Vote counts, committee calendars and treaty texts. A neutral read on where legislation stands, written for people who need the detail.',
    sample: 'The amendment that survived committee, and the four votes that will decide it.',
    subscribers: '73,900',
    icon: 'politics',
  },
  {
    id: 'weekend-review',
    name: 'Weekend Review',
    cadence: 'Saturdays',
    description:
      'Long-form reporting, criticism and one photo essay. The stories our desks spent months on, collected for a slower read.',
    sample: 'Inside the eleven-year restoration of a library nobody was sure should be saved.',
    subscribers: '128,500',
    icon: 'weekend',
  },
];

export function getNewsletter(id: string): Newsletter | undefined {
  return newsletters.find((newsletter) => newsletter.id === id);
}
