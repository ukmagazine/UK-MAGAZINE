import type { Article } from '@/lib/types';
import { ago, DAY, HOUR, img } from './_shared';

export const healthArticles: Article[] = [
  {
    id: 'hea-01',
    slug: 'primary-care-workforce-retention',
    title: 'Primary care’s problem is retention, not recruitment',
    subtitle:
      'Training places have expanded for a decade. The people trained in them are leaving within five years, and exit interviews are unusually consistent about why.',
    summary:
      'Systems have responded to primary care shortages by training more clinicians. The data suggests the constraint is how many stay, and the reasons given are administrative rather than financial.',
    category: 'health',
    authorId: 'a-osei',
    publishedAt: ago(9 * HOUR + 45),
    readingTime: 8,
    image: img('photo-1631217868264-e5b90bb7e133'),
    imageAlt: 'A clinician in a white coat speaking with a patient in a consulting room.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: true,
    editorsPick: true,
    inDepth: false,
    kind: 'report',
    reads: 30200,
    briefing: {
      whatHappened:
        'Expanded training intakes have not increased the practising primary care workforce, because departures have risen in step.',
      whyItMatters:
        'Training a clinician takes the better part of a decade. Retention changes can take effect within a year, and cost less.',
      biggerPicture:
        'Exit surveys consistently rank administrative burden and lack of scheduling control above pay as reasons for leaving.',
      whatToWatch:
        'Pilot schemes reducing documentation requirements, where early retention data is due within the year.',
      keyTakeaway:
        'The system has been solving the input side of a problem that lives on the output side.',
    },
    keyFacts: [
      'Training intakes have expanded substantially over the past decade.',
      'The practising workforce has grown far less than intakes would imply.',
      'Administrative burden ranks above pay in most published exit surveys.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'When a health system is short of primary care clinicians, the intuitive response is to train more of them. Systems have done this, at scale and for years. The practising workforce has grown by far less than the intake numbers would predict.',
      },
      {
        type: 'paragraph',
        text: 'The gap is departures. Clinicians are leaving primary care within a few years of qualifying — for hospital specialties, for part-time arrangements, for adjacent roles outside direct clinical practice, and out of medicine entirely.',
      },
      { type: 'heading', id: 'why-they-go', text: 'What exit surveys say' },
      {
        type: 'paragraph',
        text: 'Published exit surveys across several systems are unusually consistent. Pay appears, but rarely first. The reasons ranked highest are administrative: documentation requirements, prior-authorisation processes, inbox volume that continues after clinic hours, and a lack of control over scheduling.',
      },
      {
        type: 'quote',
        text: 'I trained for eleven years to spend most of my day on documentation that exists to satisfy a payer. That is the reason. It is not complicated.',
        attribution: 'A clinician who left primary care after four years, quoted in a published exit survey',
      },
      {
        type: 'paragraph',
        text: 'This matters for what a system can do about it. Pay is expensive to change and slow to affect behaviour. Documentation requirements can be reduced within a budget cycle, and several systems are trialling exactly that.',
      },
      {
        type: 'image',
        src: img('photo-1538108149393-fbbd81895907'),
        alt: 'An empty hospital ward with neatly made beds and pale curtain dividers.',
        caption:
          'Retention interventions act within a year. Training expansion takes the better part of a decade to reach practice.',
      },
      { type: 'heading', id: 'the-pilots', text: 'What is being tried' },
      {
        type: 'list',
        ordered: false,
        items: [
          'Removing prior-authorisation requirements for a defined list of routine treatments.',
          'Protected administrative time inside scheduled hours rather than after them.',
          'Shared documentation roles, so clinical notes are not written solely by clinicians.',
          'Panel size caps, which reduce revenue per clinician and are the least popular with finance departments.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Early results are limited and mostly self-reported. The intervention with the clearest signal so far is the least glamorous: moving the administrative work inside the working day rather than after it. Clinicians in those pilots report intention to stay at markedly higher rates.',
      },
      {
        type: 'paragraph',
        text: 'Whether intention translates into retention is the question the next two years will answer. In the meantime, training intakes continue to expand, which is not wrong — it is simply addressing the part of the pipeline that was not leaking.',
      },
    ],
    tags: ['Primary care', 'Workforce', 'Health systems', 'Retention', 'Policy'],
    relatedIds: ['hea-02', 'world-03', 'edu-04'],
  },
  {
    id: 'hea-02',
    slug: 'surgical-checklist-adoption-outcomes',
    title: 'A checklist, twenty years on, and what adoption actually required',
    subtitle:
      'The intervention was free, simple and demonstrably effective. It still took two decades to become routine, and the reasons are worth understanding.',
    summary:
      'The surgical safety checklist is among the best-evidenced interventions in modern medicine. Its adoption history is a case study in why good evidence is not sufficient on its own.',
    category: 'health',
    authorId: 'a-osei',
    publishedAt: ago(4 * DAY + 10 * HOUR),
    readingTime: 9,
    image: img('photo-1579684385127-1ef15d508118'),
    imageAlt: 'A surgical team in masks and caps viewed from below, gathered around an operating light.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'analysis',
    reads: 21600,
    keyFacts: [
      'The checklist costs essentially nothing to implement.',
      'Compliance measured as "completed" is a poor proxy for compliance as intended.',
      'Sites with the largest outcome improvements changed team behaviour, not just paperwork.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'It is a short list of items, read aloud, at three points during an operation. It requires no equipment, costs nothing meaningful, and has evidence behind it that most interventions never accumulate. Two decades after its introduction, its adoption is near-universal on paper and considerably more variable in practice.',
      },
      { type: 'heading', id: 'the-gap', text: 'The gap between completed and performed' },
      {
        type: 'paragraph',
        text: 'Auditors distinguish between a checklist that is completed and one that is performed. A completed checklist has ticks in boxes. A performed checklist involves the team stopping, the items being read aloud, and each person confirming — including, critically, the most junior person present being invited to speak.',
      },
      {
        type: 'quote',
        text: 'The list is not the intervention. The list is a device for making a hierarchy briefly flat. That is the intervention.',
        attribution: 'A patient safety researcher',
      },
      {
        type: 'paragraph',
        text: 'That distinction explains the variance in results. Studies at sites where the checklist was implemented as a documentation requirement show weak or absent effects. Studies at sites where it was implemented as a team behaviour show the improvements the original trials reported.',
      },
      { type: 'heading', id: 'what-worked', text: 'What adoption actually required' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Senior clinicians visibly participating rather than delegating.',
          'Explicit permission for junior staff to halt a procedure, stated and demonstrated.',
          'Local adaptation of the wording, which increases ownership and does not reduce effectiveness.',
          'Observation-based audit rather than audit of the completed form.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The third item is contested and worth noting. Standardisation advocates argue that local wording changes undermine comparability. Implementation researchers have generally found that teams which adapted the list used it more faithfully than teams handed a fixed one, and that this effect dominates.',
      },
      { type: 'heading', id: 'lesson', text: 'The general lesson' },
      {
        type: 'paragraph',
        text: 'The checklist is often cited as evidence that simple interventions work. The more accurate lesson is narrower: simple interventions work when the behaviour they encode actually changes, and encoding a behaviour in a form is not the same as changing it.',
      },
      {
        type: 'paragraph',
        text: 'That is an uncomfortable finding for health systems, because forms are auditable at scale and behaviours are not. Sites achieving the strongest results have generally accepted the higher cost of observational audit, and describe it as the expense that made the free intervention work.',
      },
    ],
    tags: ['Patient safety', 'Surgery', 'Implementation', 'Evidence', 'Health systems'],
    relatedIds: ['hea-01', 'sci-02', 'edu-01'],
  },
];
