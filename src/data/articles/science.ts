import type { Article } from '@/lib/types';
import { ago, DAY, HOUR, img } from './_shared';

export const scienceArticles: Article[] = [
  {
    id: 'sci-01',
    slug: 'orbital-debris-tracking-consortium',
    title: 'A tracking consortium gives orbital debris a shared map',
    subtitle:
      'Operators have been avoiding each other using incompatible catalogues. A pooled dataset is the least glamorous fix and probably the most effective.',
    summary:
      'Satellite operators have agreed to share tracking data through a common catalogue, reducing the duplicate and contradictory conjunction warnings that have made collision avoidance unreliable.',
    category: 'science',
    authorId: 'a-nakamura',
    publishedAt: ago(7 * HOUR + 30),
    readingTime: 7,
    image: img('photo-1446776877081-d282a0f896e2'),
    imageAlt: 'The Earth seen through the circular window of a spacecraft cupola.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: true,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 26300,
    briefing: {
      whatHappened:
        'A consortium of satellite operators agreed to contribute position and manoeuvre data to a shared catalogue with common formats and uncertainty reporting.',
      whyItMatters:
        'Operators currently receive conjunction warnings derived from different catalogues, and a warning nobody trusts is a warning that gets ignored.',
      whatToWatch:
        'Whether operators outside the consortium contribute, since the value of a shared catalogue scales with coverage.',
      keyTakeaway:
        'The problem was never detection. It was that everyone detected slightly different things.',
    },
    keyFacts: [
      'Conjunction warnings are generated from position estimates carrying substantial uncertainty.',
      'Operators previously used catalogues that disagreed on the same object’s position.',
      'Manoeuvre data is the most valuable and most commercially sensitive contribution.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'A conjunction warning tells an operator that two objects may pass close enough to warrant a manoeuvre. It is a probabilistic statement built on position estimates that carry real uncertainty — an object’s predicted location days ahead is a distribution, not a point.',
      },
      {
        type: 'paragraph',
        text: 'When two operators calculate that distribution from different catalogues, they get different answers about the same encounter. One manoeuvres, the other does not, and occasionally both manoeuvre into the space the other was avoiding.',
      },
      { type: 'heading', id: 'the-fix', text: 'The unremarkable fix' },
      {
        type: 'paragraph',
        text: 'The consortium’s agreement does not involve new sensors or better physics. It establishes a common catalogue, a shared format for reporting positional uncertainty, and — the difficult part — a commitment to contribute planned manoeuvres in advance.',
      },
      {
        type: 'quote',
        text: 'Knowing where you are is useful. Telling me where you intend to be tomorrow is what actually prevents the collision.',
        attribution: 'A flight dynamics engineer at a participating operator',
      },
      {
        type: 'paragraph',
        text: 'Manoeuvre data is commercially sensitive — a planned burn reveals something about mission profile and fuel state — which is why previous attempts stalled. The consortium’s answer is a delayed-disclosure arrangement: manoeuvres are shared with the catalogue operator immediately and published in aggregate after a lag.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'A single reference catalogue with versioned, citable entries.',
          'Standard reporting of covariance rather than position alone.',
          'Advance notification of planned manoeuvres under confidentiality.',
          'A common threshold for what constitutes an actionable warning.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Coverage is the open question. A shared catalogue improves as more operators contribute, and several large constellations have not joined. The consortium has said participation data will be published annually, which is a polite form of pressure and, in this field, a reasonably effective one.',
      },
    ],
    tags: ['Space', 'Orbital debris', 'Standards', 'Satellites', 'Safety'],
    relatedIds: ['sci-02', 'tech-01', 'sci-03'],
  },
  {
    id: 'sci-02',
    slug: 'room-temperature-superconductor-replication',
    title: 'A superconductivity claim meets replication, and gets smaller',
    subtitle:
      'Independent groups reproduced part of the original observation. The part they reproduced is interesting, and it is not the part that generated the headlines.',
    summary:
      'Replication attempts on a widely reported superconductivity result found a real but far more modest effect. The authors have revised their claim, which is how the process is meant to work.',
    category: 'science',
    authorId: 'a-nakamura',
    publishedAt: ago(2 * DAY + 9 * HOUR),
    readingTime: 8,
    image: img('photo-1518152006812-edab29b069ac'),
    imageAlt: 'A row of laboratory microscopes lined up on a bench.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: true,
    inDepth: false,
    kind: 'analysis',
    reads: 22800,
    keyFacts: [
      'Four independent groups attempted replication under varying conditions.',
      'A resistance drop was observed, at a much lower temperature than originally claimed.',
      'The original authors published a revision rather than defending the initial figure.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The original paper reported a sharp drop in electrical resistance at a temperature far above anything previously achieved. It was, if correct, among the more consequential materials results in decades. It was covered accordingly.',
      },
      {
        type: 'paragraph',
        text: 'Four independent groups have now attempted replication. All four observed a resistance drop. None observed it at the reported temperature, and the temperatures they did observe are low enough to place the material in interesting-but-familiar territory.',
      },
      { type: 'heading', id: 'what-happened', text: 'What the replications found' },
      {
        type: 'paragraph',
        text: 'The consistent finding is that sample preparation matters enormously and that the original measurement was probably affected by an artefact in how contacts were attached to a highly inhomogeneous sample. This is a mundane failure mode and an extremely common one.',
      },
      {
        type: 'quote',
        text: 'The measurement was not wrong. The interpretation of what was being measured was.',
        attribution: 'A condensed matter physicist involved in one replication attempt',
      },
      {
        type: 'image',
        src: img('photo-1576086213369-97a306d36557'),
        alt: 'A fluorescence microscopy image showing cells glowing in magenta and blue against a black background.',
        caption: 'Replication attempts across four laboratories converged on a smaller, more robust result.',
      },
      { type: 'heading', id: 'the-good-part', text: 'The part that worked' },
      {
        type: 'paragraph',
        text: 'The original authors published a revision. They did not defend the initial figure, did not accuse the replicating groups of incompetence, and released their preparation protocol in enough detail that the discrepancy could be traced.',
      },
      {
        type: 'paragraph',
        text: 'This is worth stating plainly because the alternative is common and corrosive. The system worked here — a striking claim was made, tested, narrowed and corrected within a year — and the residual result is a real material with genuinely unusual behaviour that will now be studied without the distortion of an inflated headline number.',
      },
      {
        type: 'paragraph',
        text: 'The coverage cycle, including this publication’s, did less well. The initial claim received far more attention than the correction will, which is a structural feature of how science reporting works and not one any individual outlet fixes on its own.',
      },
    ],
    tags: ['Physics', 'Materials', 'Replication', 'Method', 'Research'],
    relatedIds: ['sci-01', 'sci-03', 'hea-02'],
  },
  {
    id: 'sci-03',
    slug: 'microscopy-cell-atlas-release',
    title: 'A cell atlas opens, and small labs get their turn',
    subtitle:
      'The dataset took nine years and considerable money to assemble. Releasing it without an access committee was the decision that took longest.',
    summary:
      'A large reference dataset of cell types has been published without application requirements. Early use is concentrated among smaller laboratories that could not have generated the data themselves.',
    category: 'science',
    authorId: 'a-osei',
    publishedAt: ago(6 * DAY + 3 * HOUR),
    readingTime: 6,
    image: img('photo-1532187863486-abf9dbad1b69'),
    imageAlt: 'A pipette dispensing pink liquid into a laboratory multi-well tray.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 11800,
    body: [
      {
        type: 'paragraph',
        text: 'The dataset represents nine years of work and an amount of instrument time that only a handful of institutions could have supplied. The scientific decision — what to measure, at what resolution — was settled early. The decision that took longest was whether to require an application to use it.',
      },
      { type: 'heading', id: 'access', text: 'The access argument' },
      {
        type: 'paragraph',
        text: 'Arguments for an access committee were serious. Committees allow the consortium to prevent duplicative work, ensure appropriate citation and steer use toward questions the data can actually answer. Every large reference dataset of the previous generation had one.',
      },
      {
        type: 'quote',
        text: 'Every gate we could justify individually added up to a system where you needed a colleague on the inside to get started.',
        attribution: 'A consortium member who argued for open release',
      },
      {
        type: 'paragraph',
        text: 'The consortium released it openly, with a citation requirement and no application. Six months of usage data suggest the argument for openness was correct on its own terms: a substantial share of downloads have come from institutions with no prior connection to the consortium, and disproportionately from smaller laboratories.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'No application or approval requirement for access.',
          'Standard citation with a versioned dataset identifier.',
          'Published processing pipelines so results can be reproduced end to end.',
          'A public issue tracker for reporting suspected errors in annotation.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The issue tracker has been busier than expected, which the consortium describes as the point. Annotation errors in a reference dataset propagate into every study using it, and a thousand external users find them faster than an internal review ever did.',
      },
    ],
    tags: ['Biology', 'Open data', 'Research', 'Method', 'Funding'],
    relatedIds: ['sci-02', 'hea-02', 'tech-02'],
  },
];
