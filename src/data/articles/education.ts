import type { Article } from '@/lib/types';
import { ago, DAY, HOUR, img } from './_shared';

export const educationArticles: Article[] = [
  {
    id: 'edu-01',
    slug: 'tutoring-programmes-evidence',
    title: 'Four districts, one tutoring programme, and a lesson in measurement',
    subtitle:
      'The same intervention produced four different verdicts. The difference was not the teaching — it was who was counted, and when.',
    summary:
      'A widely adopted tutoring model was evaluated by four school districts that reached four conclusions. UK MAGAZINE obtained the evaluation designs, and the divergence is almost entirely methodological.',
    category: 'education',
    authorId: 'a-varga',
    publishedAt: ago(5 * HOUR + 25),
    readingTime: 10,
    image: img('photo-1509062522246-3755977927d7'),
    imageAlt: 'Students seated at desks in a classroom facing a teacher standing at the front.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: true,
    trending: true,
    editorsPick: true,
    inDepth: false,
    kind: 'report',
    reads: 33800,
    briefing: {
      whatHappened:
        'Four districts ran the same small-group tutoring programme and published evaluations ranging from "substantial gains" to "no measurable effect".',
      whyItMatters:
        'Districts across the region are deciding whether to fund the programme at scale, and are citing whichever evaluation supports the decision they prefer.',
      biggerPicture:
        'Education research repeatedly produces this pattern: an intervention with real but modest effects is oversold, then dismissed, without the design differences ever being examined.',
      whatToWatch:
        'A pooled re-analysis using a common definition of participation, expected before budget decisions in the autumn.',
      keyTakeaway:
        'The programme probably works, modestly. Three of the four evaluations were not built to detect that.',
    },
    keyFacts: [
      'Only one district defined participation as a minimum number of attended sessions.',
      'Two evaluations included students who were enrolled but attended fewer than three sessions.',
      'None of the four used the same assessment instrument at the same point in the year.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The programme is not complicated. Small groups of three or four students meet a trained tutor several times a week during the school day, working from the same curriculum their class is using. Versions of it have been studied for decades, and the honest summary of that literature is that it produces real gains, of moderate size, when it is delivered consistently.',
      },
      {
        type: 'paragraph',
        text: 'Four districts in one region adopted essentially the same model and evaluated it. One reported substantial gains. One reported modest gains. One reported gains that disappeared under scrutiny. One reported no measurable effect at all. UK MAGAZINE obtained all four evaluation designs.',
      },
      { type: 'heading', id: 'who-counted', text: 'Who got counted' },
      {
        type: 'paragraph',
        text: 'The largest single source of divergence is the definition of a participant. One district counted only students who attended at least twenty sessions. Two counted every student assigned to the programme, including those who attended once or never. The fourth counted students enrolled at any point, including those who moved schools mid-year.',
      },
      {
        type: 'quote',
        text: 'If you include the children who never came, you are not measuring the tutoring. You are measuring the enrolment paperwork.',
        attribution: 'A district research officer who requested anonymity to discuss a neighbouring district’s design',
      },
      {
        type: 'paragraph',
        text: 'This is not a technicality. In the districts that counted everyone, between a fifth and a third of assigned students attended fewer than three sessions, generally for reasons unrelated to the programme — transport, timetable conflicts, absence. Averaging their outcomes into the result dilutes any effect toward zero, which is exactly what two of the four evaluations found.',
      },
      {
        type: 'image',
        src: img('photo-1522202176988-66273c2fd55f'),
        alt: 'Three people working together around a laptop at a table in a bright room.',
        caption:
          'Small-group tutoring has a consistent evidence base. Local evaluations of it do not.',
      },
      { type: 'heading', id: 'when-measured', text: 'When it was measured' },
      {
        type: 'paragraph',
        text: 'The second source of divergence is timing. Two districts assessed in late spring, one in early spring, one in the following autumn. Autumn assessment captures what survived the summer, which is a legitimate and much harder test. Comparing an autumn result to a spring result and treating the difference as evidence about the programme is not legitimate, and it happened.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Different assessment instruments, not equated to one another.',
          'Different assessment windows, spanning six months.',
          'Different comparison groups — two used waitlists, one used prior-year cohorts.',
          'Different handling of students who changed schools.',
        ],
      },
      { type: 'heading', id: 'what-happens-next', text: 'What happens next' },
      {
        type: 'paragraph',
        text: 'The four evaluations are now circulating in budget discussions across the region, each cited by whichever side finds it convenient. Officials arguing for expansion cite the first. Officials arguing for reallocation cite the fourth. Both describe their citation as evidence-based, and in a narrow sense both are correct.',
      },
      {
        type: 'paragraph',
        text: 'A pooled re-analysis using a common participation threshold and equated assessments is under way, with results expected before autumn budget decisions. Its authors have said publicly that they expect to find a positive effect of moderate size — which is to say, what the wider literature already indicated before any of the four districts started.',
      },
      {
        type: 'links',
        title: 'More from the education desk',
        items: [
          { label: 'A funding formula written in 1994 still decides which schools get repaired', href: '/article/university-funding-formula-reform' },
          { label: 'Schools that locked away phones are now publishing results', href: '/article/phones-classroom-policy-results' },
          { label: 'Employers wanted vocational pathways. Enrolment finally followed.', href: '/article/vocational-pathways-employer-demand' },
        ],
      },
    ],
    tags: ['Assessment', 'Tutoring', 'Evidence', 'Schools', 'Funding'],
    relatedIds: ['edu-02', 'edu-03', 'edu-04'],
  },
  {
    id: 'edu-02',
    slug: 'university-funding-formula-reform',
    title: 'A funding formula written in 1994 still decides which schools get repaired',
    subtitle:
      'The weightings were set for a population that has since moved. Rewriting them is technically straightforward and politically close to impossible.',
    summary:
      'Capital funding for school buildings is allocated by a formula that has not been substantially revised in three decades. Everyone involved agrees it is outdated; nobody can assemble a majority to change it.',
    category: 'education',
    authorId: 'a-varga',
    publishedAt: ago(1 * DAY + 6 * HOUR),
    readingTime: 8,
    image: img('photo-1524178232363-1fb2b075b655'),
    imageAlt: 'A lecture hall with rows of seated students facing a presentation screen.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'analysis',
    reads: 16400,
    keyFacts: [
      'The formula weights enrolment counts from a census cycle that has since been superseded twice.',
      'Districts that lost population retain funding shares set when they were growing.',
      'Any revision creates identifiable losers before it creates identifiable winners.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The roof is the part people notice. A school with a failing roof is visible, photographable and politically legible in a way that a formula is not. But the roof is downstream of the formula, and the formula was written in 1994.',
      },
      {
        type: 'paragraph',
        text: 'Capital allocations for school buildings in the region are distributed according to weightings that combine enrolment, building age and a deprivation index. Each component was reasonable when set. Each has drifted from the reality it was meant to represent, and the drift compounds.',
      },
      { type: 'heading', id: 'the-drift', text: 'How the drift happened' },
      {
        type: 'paragraph',
        text: 'Population moved. Districts that were growing in the early nineties are now shrinking, and districts that were peripheral are now dense. Because the formula updates enrolment slowly and uses a lagged average, the shift shows up in allocations years after it shows up in classrooms.',
      },
      {
        type: 'quote',
        text: 'We are maintaining buildings for children who moved away, and putting portable classrooms next to the buildings we did not fund.',
        attribution: 'A regional facilities director',
      },
      { type: 'heading', id: 'why-it-persists', text: 'Why nobody fixes it' },
      {
        type: 'paragraph',
        text: 'The technical work of revision is not difficult. Officials have produced updated weightings more than once. The obstacle is arithmetic of a different kind: a fixed pool redistributed produces losers whose losses are immediate and specific, and winners whose gains are diffuse and deferred.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'A revision is proposed with updated population data.',
          'Districts facing reductions calculate their loss precisely and object.',
          'Districts standing to gain calculate a benefit that arrives over several years.',
          'The proposal is deferred pending further consultation.',
        ],
      },
      {
        type: 'paragraph',
        text: 'That cycle has run, by UK MAGAZINE’s count, four times since 2009. Each iteration produced a consultation document and no change to the weightings.',
      },
      {
        type: 'paragraph',
        text: 'The route that has worked elsewhere is transitional protection: guaranteeing that no district falls below its current allocation in cash terms, and directing all growth to the revised formula until the old shares wash out. It is slower and more expensive, and it converts an immediate loss into a gradual one. It is also, on the evidence, the only version that passes.',
      },
    ],
    tags: ['Funding', 'Policy', 'Schools', 'Capital', 'Local government'],
    relatedIds: ['edu-01', 'pol-02', 'edu-03'],
  },
  {
    id: 'edu-03',
    slug: 'phones-classroom-policy-results',
    title: 'Schools that locked away phones are now publishing results',
    subtitle:
      'The early data is more mixed and more interesting than either side of the argument expected.',
    summary:
      'Two years after widespread adoption of phone-free school days, the first substantial outcome data is arriving. The effects on attention and behaviour are clearer than the effects on attainment.',
    category: 'education',
    authorId: 'a-varga',
    publishedAt: ago(2 * DAY + 11 * HOUR),
    readingTime: 7,
    image: img('photo-1503676260728-1c00da094a0b'),
    imageAlt: 'A stack of books topped with a red apple beside alphabet blocks and crayons.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: true,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 41200,
    briefing: {
      whatHappened:
        'Schools that introduced full-day phone restrictions two years ago have begun publishing behaviour, attendance and attainment data.',
      whyItMatters:
        'The policy spread faster than the evidence for it. This is the first tranche of data that can speak to whether it worked, and at what.',
      whatToWatch:
        'Whether attainment effects appear in later cohorts, or whether the benefits remain concentrated in behaviour and social measures.',
      keyTakeaway:
        'Clear improvements in classroom behaviour and reported wellbeing. Attainment effects are small and not yet distinguishable from noise.',
    },
    body: [
      {
        type: 'paragraph',
        text: 'The policy travelled faster than the evidence, which is common. Schools introduced full-day phone restrictions across many systems in the space of about eighteen months, on the strength of teacher testimony and a small research base. Two years on, the first outcome data has arrived.',
      },
      {
        type: 'paragraph',
        text: 'It supports part of the case strongly, and part of it not at all.',
      },
      { type: 'heading', id: 'what-improved', text: 'What clearly improved' },
      {
        type: 'paragraph',
        text: 'Behaviour referrals fell substantially in most reporting schools, with the largest reductions in categories related to conflict that originated online and continued in corridors. Teachers reported fewer interruptions, and the reports are corroborated by lesson observation data where it exists.',
      },
      {
        type: 'paragraph',
        text: 'Reported wellbeing measures also moved, though modestly, and social time during breaks increased in every school that measured it — a finding several head teachers described as the one that convinced sceptical staff.',
      },
      {
        type: 'quote',
        text: 'The corridors got louder. That was the moment we knew something had changed.',
        attribution: 'A secondary school head teacher',
      },
      { type: 'heading', id: 'what-did-not', text: 'What did not move much' },
      {
        type: 'paragraph',
        text: 'Attainment. Effects on examination results are small, inconsistent across subjects and not yet separable from the ordinary year-to-year variation a single school experiences. This does not mean there is no effect; it means two years and a few dozen schools cannot detect one of the size that would be plausible.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Behaviour referrals: consistent, substantial reductions.',
          'Reported wellbeing: modest improvement, consistent direction.',
          'Break-time social interaction: increased everywhere it was measured.',
          'Attainment: small, inconsistent, within normal variation.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Advocates on both sides have moved quickly to claim the data. The more defensible reading is narrower: the policy did what teachers said it would do to classrooms, and the academic case for it remains unproven rather than disproven.',
      },
    ],
    tags: ['Schools', 'Policy', 'Wellbeing', 'Evidence', 'Behaviour'],
    relatedIds: ['edu-01', 'edu-04', 'hea-01'],
  },
  {
    id: 'edu-04',
    slug: 'vocational-pathways-employer-demand',
    title: 'Employers wanted vocational pathways. Enrolment finally followed.',
    subtitle:
      'A decade of underused technical programmes has reversed in three years, and the reason is more mundane than any policy initiative.',
    summary:
      'Technical and vocational enrolment has risen sharply after years of stagnation. Students cite visible local employment and guaranteed placements — not campaigns or curriculum reform.',
    category: 'education',
    authorId: 'a-varga',
    publishedAt: ago(6 * DAY + 8 * HOUR),
    readingTime: 6,
    image: img('photo-1541339907198-e08756dedf3f'),
    imageAlt: 'Graduates in caps and gowns throwing their mortarboards into the air at sunset.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 14700,
    keyFacts: [
      'Enrolment in technical pathways rose for a third consecutive year after a decade of decline.',
      'Programmes with guaranteed placement agreements filled fastest.',
      'Students cited visible local hiring more often than earnings data or campaigns.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'For a decade, employers said they could not find skilled technicians, and technical programmes ran below capacity. Both statements were true at once, which made the situation frustrating rather than mysterious: students were not choosing pathways that led to jobs that visibly existed.',
      },
      {
        type: 'paragraph',
        text: 'That has reversed. Enrolment in technical and vocational pathways has risen for a third consecutive year, and the programmes filling fastest share a specific feature.',
      },
      { type: 'heading', id: 'placements', text: 'The placement guarantee' },
      {
        type: 'paragraph',
        text: 'Programmes that carry a guaranteed placement — an agreement with named employers to take a defined number of students each year — fill before programmes that do not, even where the curriculum and the eventual earnings are comparable.',
      },
      {
        type: 'quote',
        text: 'The students were never confused about the wages. They were unsure the job would be there when they finished.',
        attribution: 'A programme director at a regional technical college',
      },
      {
        type: 'paragraph',
        text: 'That distinction is important because most policy effort went into publicising earnings. Earnings information was not what was missing. Certainty was, and a guarantee supplies it in a form a seventeen-year-old can evaluate.',
      },
      { type: 'heading', id: 'limits', text: 'The limits of the model' },
      {
        type: 'list',
        ordered: false,
        items: [
          'Guarantees require employers confident enough to commit years ahead.',
          'They concentrate provision in sectors with stable local demand.',
          'They are difficult to sustain through a downturn, which is when they matter most.',
        ],
      },
      {
        type: 'paragraph',
        text: 'That last point is the open question. The agreements now driving enrolment were signed in a period of tight labour markets. Nobody has yet observed what happens to a placement guarantee when the employer needs fewer people, and the colleges that have built their intake around it are aware of the exposure.',
      },
    ],
    tags: ['Vocational', 'Employment', 'Enrolment', 'Skills', 'Policy'],
    relatedIds: ['edu-01', 'biz-02', 'ai-05'],
  },
];
