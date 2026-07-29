import type { Article } from '@/lib/types';
import { ago, DAY, HOUR, img } from './_shared';

export const aiArticles: Article[] = [
  {
    id: 'ai-01',
    slug: 'open-weight-models-enterprise-procurement',
    title: 'Open-weight models are quietly winning enterprise procurement',
    subtitle:
      'Three years of pilot projects have produced an unglamorous conclusion: for most corporate work, the deciding factor is not capability but control.',
    summary:
      'Procurement teams at large employers are increasingly choosing models they can host themselves. The reason is rarely performance — it is audit trails, data residency and the ability to keep a system running when a vendor changes its terms.',
    category: 'ai',
    authorId: 'a-halden',
    publishedAt: ago(3 * HOUR + 12),
    updatedAt: ago(48),
    readingTime: 9,
    image: img('photo-1620712943543-bcc4688e7485'),
    imageAlt: 'A small humanoid robot seated at a wooden desk in front of an open notebook.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: true,
    trending: true,
    editorsPick: true,
    inDepth: false,
    kind: 'report',
    reads: 48200,
    briefing: {
      whatHappened:
        'Four of the six largest procurement consortiums tracked by UK MAGAZINE now list self-hosting as a scored requirement in model tenders, up from one two years ago.',
      whyItMatters:
        'It shifts leverage away from a small number of frontier vendors and toward the buyers, who can credibly threaten to move workloads between providers.',
      biggerPicture:
        'The gap between the best hosted model and the best open-weight model has narrowed enough that, for document handling and internal search, the difference no longer decides the contract.',
      whatToWatch:
        'Whether insurers begin pricing model-hosting arrangements differently — the first policies treating self-hosted deployments as a separate risk class are in draft.',
      keyTakeaway:
        'Enterprises are optimising for exit options, not benchmark scores.',
    },
    keyFacts: [
      'Self-hosting appears as a scored tender requirement at four of six consortiums, up from one in 2024.',
      'Median pilot-to-production time fell from 14 months to 7 for self-hosted deployments.',
      'Cost was ranked fourth among decision criteria, behind control, auditability and continuity.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The procurement documents are dull, which is precisely why they are useful. Buried in the scoring matrices that large employers use to compare artificial intelligence vendors is a line item that barely existed three years ago: whether the buyer can run the model on infrastructure it controls.',
      },
      {
        type: 'paragraph',
        text: 'UK MAGAZINE reviewed tender frameworks from six purchasing consortiums covering hospitals, regional governments and two industrial groups. Four now score self-hosting explicitly. Two years ago only one did. None of the six lists benchmark performance as its highest-weighted criterion.',
      },
      { type: 'heading', id: 'what-changed', text: 'What actually changed' },
      {
        type: 'paragraph',
        text: 'The shift is not a verdict on quality. Procurement officers interviewed for this story were consistent on that point: the hosted frontier systems remain, on most tasks they care about, somewhat better. The difference is that "somewhat better" stopped being decisive once open-weight models crossed the threshold of adequacy for the work most organisations actually assign them — summarising internal documents, routing support requests, drafting correspondence that a human then edits.',
      },
      {
        type: 'quote',
        text: 'We are not buying the smartest system available. We are buying the one we can still be running in four years if the terms change.',
        attribution: 'A procurement lead at a regional health authority, speaking on condition of anonymity',
      },
      {
        type: 'paragraph',
        text: 'That framing recurred in nearly every conversation. The organisations moving fastest toward self-hosting are those with long planning horizons and low tolerance for service discontinuity: public agencies, hospitals, utilities and manufacturers running processes that cannot be paused while a contract is renegotiated.',
      },
      {
        type: 'image',
        src: img('photo-1518770660439-4636190af475'),
        alt: 'Close-up of a dark green circuit board densely populated with microchips and components.',
        caption:
          'Self-hosting shifts cost from a per-request line item to capital expenditure — a trade many finance teams prefer.',
      },
      { type: 'heading', id: 'the-audit-problem', text: 'The audit problem' },
      {
        type: 'paragraph',
        text: 'A second, quieter driver is auditability. Regulated organisations increasingly need to demonstrate not just that a decision was made, but which version of which system made it, on what data, at what time. Hosted services have improved their logging considerably, but a model that is silently updated is difficult to reconcile with a records-retention obligation written for a filing cabinet.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Version pinning — the ability to freeze a model for the life of a case file.',
          'Data residency — keeping inputs inside a jurisdiction without relying on contractual assurance alone.',
          'Reproducibility — regenerating an output months later to explain how a decision was reached.',
          'Continuity — running through a vendor outage, price change or withdrawal from a market.',
        ],
      },
      {
        type: 'paragraph',
        text: 'None of these are capability questions. All of them are contract questions, and open-weight releases answer them by removing the counterparty.',
      },
      { type: 'heading', id: 'costs', text: 'What it costs' },
      {
        type: 'paragraph',
        text: 'Self-hosting is not free, and the organisations doing it are candid that the savings are often smaller than expected once staffing is counted. What changes is the shape of the cost: capital expenditure and salaried engineers instead of per-request billing that scales with adoption. Finance teams that have watched usage-based invoices grow unpredictably tend to find the trade appealing on its own terms.',
      },
      {
        type: 'paragraph',
        text: 'The consortiums that have completed a full cycle report a median pilot-to-production time of seven months for self-hosted deployments, against fourteen for hosted ones — a gap they attribute less to technology than to the shorter legal review a system without a third-party data transfer requires.',
      },
      {
        type: 'links',
        title: 'Related reporting',
        items: [
          { label: 'A new evaluation standard would make model audits comparable', href: '/article/evaluation-standard-model-audits' },
          { label: 'The power contracts behind the next generation of data centres', href: '/article/ai-datacentre-power-contracts' },
          { label: 'Who pays the maintainers holding up the software supply chain', href: '/article/open-source-maintainer-funding' },
        ],
      },
      {
        type: 'paragraph',
        text: 'Whether the pattern holds depends on a variable none of the buyers control: how long the capability gap stays narrow. If the distance between hosted and open-weight systems widens sharply, the calculation changes overnight. For now, the scoring matrices suggest buyers are betting it will not.',
      },
    ],
    tags: ['Procurement', 'Open source', 'Enterprise', 'Regulation', 'Model hosting'],
    relatedIds: ['ai-02', 'ai-03', 'tech-02'],
  },
  {
    id: 'ai-02',
    slug: 'evaluation-standard-model-audits',
    title: 'A new evaluation standard would make model audits comparable for the first time',
    subtitle:
      'A draft framework from an international standards body proposes common reporting formats — and the fights are over what gets left out.',
    summary:
      'Model evaluations today are difficult to compare because each lab defines its own tests. A draft standard would fix the reporting format without fixing the tests themselves, a compromise its authors call the only one available.',
    category: 'ai',
    authorId: 'a-halden',
    publishedAt: ago(11 * HOUR),
    readingTime: 7,
    image: img('photo-1677442136019-21780ecad995'),
    imageAlt: 'The letters A and I rendered in translucent blue glass against a dark purple patterned backdrop.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: true,
    editorsPick: false,
    inDepth: false,
    kind: 'analysis',
    reads: 31400,
    briefing: {
      whatHappened:
        'A working group circulated a draft standard defining how model evaluation results must be reported — sample sizes, confidence intervals, prompt disclosure and failure taxonomies.',
      whyItMatters:
        'Buyers and regulators currently cannot compare two vendors’ safety claims, because the underlying tests are described differently even when they measure the same thing.',
      whatToWatch:
        'The comment period closes in the autumn. The unresolved question is whether disclosure of evaluation prompts becomes mandatory or advisory.',
      keyTakeaway:
        'Standardising the report is achievable. Standardising the test is not, and the draft does not pretend otherwise.',
    },
    keyFacts: [
      'The draft covers reporting format only — it does not prescribe which evaluations to run.',
      'Confidence intervals would become mandatory for any published capability claim.',
      'Twenty-two organisations submitted comments during the first review round.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'Anyone who has tried to compare two model evaluation reports knows the problem. One vendor reports accuracy on a thousand held-out examples. Another reports a pass rate on an internal suite it will not describe. A third publishes a single headline number with no interval around it. All three are technically disclosing results, and none of the three can be placed on the same axis.',
      },
      {
        type: 'paragraph',
        text: 'A draft standard now circulating among laboratories, auditors and procurement bodies attempts a narrow fix: it says nothing about which tests a developer should run, and a great deal about how the results must be written down.',
      },
      { type: 'heading', id: 'the-compromise', text: 'The deliberate compromise' },
      {
        type: 'paragraph',
        text: 'The working group considered and rejected a more ambitious approach — a mandated battery of evaluations every model must pass. The objection was practical. A fixed battery becomes a target, and a target that is public and static is one developers optimise against directly, which destroys the measurement it was meant to provide.',
      },
      {
        type: 'quote',
        text: 'The moment you publish the exam, you stop measuring understanding and start measuring preparation.',
        attribution: 'A member of the drafting group',
      },
      {
        type: 'paragraph',
        text: 'So the draft moves the requirement one level up. Developers keep choosing their evaluations. They must, however, report sample size, the statistical interval around every published figure, whether the evaluation set was held out or reused, and a structured description of observed failures rather than a summary adjective.',
      },
      { type: 'heading', id: 'the-disagreement', text: 'Where it is contested' },
      {
        type: 'list',
        ordered: false,
        items: [
          'Prompt disclosure — whether the exact inputs used in an evaluation must be published, or merely described.',
          'Failure taxonomy — how granular the categories must be before a report counts as complete.',
          'Retrospective application — whether models already deployed must be re-reported under the new format.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Prompt disclosure is the sharpest disagreement. Auditors want the inputs, arguing that a result nobody can reproduce is not a result. Several developers argue that publishing evaluation prompts guarantees they appear in the next generation of training data, rendering the evaluation useless within a year.',
      },
      {
        type: 'paragraph',
        text: 'A compromise under discussion would require prompts to be escrowed with an accredited auditor rather than published — reproducible for a party with standing, opaque to a web crawler. Whether escrow satisfies regulators who value public verifiability is unresolved.',
      },
      {
        type: 'paragraph',
        text: 'The comment period closes in autumn. Even if adopted quickly, the standard would take effect against a moving target, and its authors are unusually frank about that. It does not tell anyone whether a model is safe. It tells them whether two claims about safety are talking about the same thing.',
      },
    ],
    tags: ['Standards', 'Evaluation', 'Audit', 'Policy', 'Transparency'],
    relatedIds: ['ai-01', 'ai-05', 'tech-02'],
  },
  {
    id: 'ai-03',
    slug: 'ai-datacentre-power-contracts',
    title: 'The power contracts behind the next generation of AI data centres',
    subtitle:
      'Twenty-year electricity agreements are being signed for facilities that do not yet have planning permission — and utilities are rewriting their forecasts around them.',
    summary:
      'The constraint on new computing capacity has moved from chips to electricity. The contracts being signed now commit utilities and operators to each other for two decades, on demand projections neither side can verify.',
    category: 'ai',
    authorId: 'a-brenner',
    publishedAt: ago(1 * DAY + 4 * HOUR),
    readingTime: 12,
    image: img('photo-1479839672679-a46483c0e7c8'),
    imageAlt: 'A white geometric building facade of stacked rectangular volumes against a pale sky.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: true,
    editorsPick: true,
    inDepth: true,
    kind: 'report',
    reads: 39800,
    briefing: {
      whatHappened:
        'Operators have signed long-term power purchase agreements for computing facilities still years from breaking ground, locking in capacity ahead of grid upgrades.',
      whyItMatters:
        'Utilities size transmission investment against contracted demand. If the demand does not materialise, the cost of the upgrade falls to other ratepayers.',
      biggerPicture:
        'This is a familiar pattern from earlier industrial build-outs, where speculative capacity commitments outran the demand that justified them.',
      whatToWatch:
        'Regulators reviewing whether take-or-pay provisions adequately protect households from stranded transmission costs.',
      keyTakeaway:
        'Electricity, not silicon, is now the scarce input — and the contracts reflect it.',
    },
    keyFacts: [
      'Several agreements run twenty years, beginning before construction is permitted.',
      'Transmission upgrades typically take seven to eleven years from approval to energisation.',
      'Take-or-pay terms shift some, but not all, of the risk back to operators.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The site is a field. There is a gravel track, a survey marker and a sign giving notice of a planning application that has not been decided. There is also, filed with a regional utility, a twenty-year agreement to purchase a quantity of electricity that would today rank the empty field among the larger industrial consumers in its province.',
      },
      {
        type: 'paragraph',
        text: 'This sequence — contract first, permission later, construction later still — has become common enough that utilities are restructuring their long-range forecasts around it. The scarce input in computing is no longer processors. It is firm, deliverable power, and the queue for it is long enough that operators are joining before they know exactly what they are building.',
      },
      { type: 'heading', id: 'why-early', text: 'Why the contracts come first' },
      {
        type: 'paragraph',
        text: 'Transmission is slow. Getting substantial new capacity to a site involves studies, approvals, easements, procurement of equipment with multi-year lead times, and construction. Seven to eleven years is a normal span from approval to energised line. A facility that waits for planning permission before securing power has effectively chosen to open a decade from now.',
      },
      {
        type: 'image',
        src: img('photo-1473341304170-971dccb5ac1e'),
        alt: 'Electricity transmission pylons silhouetted against an orange sunset sky.',
        caption:
          'Transmission upgrades run on a decade-long clock, which is why power is contracted before ground is broken.',
      },
      {
        type: 'paragraph',
        text: 'So operators join the interconnection queue early, with load estimates built on assumptions about hardware that has not shipped and workloads that have not been sold. The estimates are made in good faith. They are also, by construction, uncertain.',
      },
      { type: 'heading', id: 'the-forecast-problem', text: 'The forecasting problem' },
      {
        type: 'paragraph',
        text: 'Utilities have a statutory obligation to plan for demand, and contracted load is the best evidence they have. A signed agreement is treated as firm — that is what makes it useful. Regulators approving transmission investment ask what demand justifies it, and contracted load is the answer.',
      },
      {
        type: 'quote',
        text: 'We are being asked to build for a number that exists on paper. Sometimes the paper turns into a building. Sometimes it does not, and the line is already there.',
        attribution: 'A transmission planner at a regional utility',
      },
      {
        type: 'paragraph',
        text: 'When speculative load does not materialise, the transmission asset remains, and its cost is recovered through rates paid by everyone connected to the network. That is the mechanism regulators are now examining, and the reason several have begun requiring larger deposits and stricter milestone schedules before a project holds a queue position.',
      },
      { type: 'heading', id: 'take-or-pay', text: 'What take-or-pay does and does not cover' },
      {
        type: 'paragraph',
        text: 'Most of these agreements include take-or-pay provisions: the operator pays for contracted capacity whether or not it consumes the electricity. This transfers real risk back to the operator and is the main protection ratepayers have.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'It covers the energy commitment for the contract term.',
          'It does not always cover transmission built specifically to serve the site.',
          'It offers little protection if the counterparty is a project company that can be wound up.',
          'It rarely addresses what happens to the asset if the facility is built at half the contracted size.',
        ],
      },
      {
        type: 'paragraph',
        text: 'That fourth case is the one planners describe as most likely and least well handled. Facilities are frequently built in phases, with later phases contingent on demand. A contract sized for the full build-out, serving a site that stops after phase one, leaves a gap that nobody drafted for.',
      },
      { type: 'heading', id: 'the-counterargument', text: 'The case for building anyway' },
      {
        type: 'paragraph',
        text: 'Utilities are not uniformly alarmed. Several argue that transmission built for a facility that never arrives is rarely wasted — networks are congested, and capacity added for one purpose relieves constraints elsewhere. In regions where the grid is the binding constraint on new industrial connection generally, an over-built line is a problem that solves other problems.',
      },
      {
        type: 'paragraph',
        text: 'The disagreement, then, is less about whether to build than about who should carry the risk of building early. That is a question regulators are equipped to answer, and several have opened proceedings to do so. The field with the survey marker will get its answer before it gets its building.',
      },
    ],
    tags: ['Energy', 'Data centres', 'Infrastructure', 'Utilities', 'Regulation'],
    relatedIds: ['env-01', 'ai-01', 'tech-04'],
  },
  {
    id: 'ai-04',
    slug: 'robotics-labs-general-purpose',
    title: 'General-purpose robots leave the lab, slowly',
    subtitle:
      'Demonstration videos have outpaced deployment for a decade. A handful of warehouses are now running the machines for real shifts, and the results are instructive.',
    summary:
      'Robots that can be instructed in ordinary language are being trialled on real shifts. Reporters visited three sites: the machines work, they are slower than a person, and the economics turn on something other than speed.',
    category: 'ai',
    authorId: 'a-brenner',
    publishedAt: ago(2 * DAY + 7 * HOUR),
    readingTime: 6,
    image: img('photo-1485827404703-89b55fcc595e'),
    imageAlt: 'A white humanoid robot with large dark eyes photographed at close range indoors.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'video',
    reads: 27600,
    keyFacts: [
      'Observed pick rates were 40–60 per cent of an experienced human worker.',
      'Machines ran continuously across shift changes, closing much of the gap on daily throughput.',
      'Retraining a task took hours rather than the weeks required for fixed automation.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The machine picks up a plastic tote, turns, and sets it on a conveyor. It does this correctly, and it does it slowly — perhaps half the pace of the worker doing the same job two aisles away. Then it does it again, and again, through the shift change, through the break, and through the second shift.',
      },
      {
        type: 'paragraph',
        text: 'That is the actual proposition, and it is less cinematic than the demonstration videos suggest. UK MAGAZINE visited three distribution sites running general-purpose robotic systems on live shifts rather than in staged pilots. None of the operators described the machines as faster than people. All three described them as economically interesting anyway.',
      },
      { type: 'heading', id: 'the-arithmetic', text: 'The arithmetic' },
      {
        type: 'paragraph',
        text: 'A machine running at fifty per cent of human pace for twenty hours does more work in a day than a person running at full pace for eight. The comparison that matters is not per-hour throughput but per-day throughput against total cost, and on that measure the systems are close to viable in specific, repetitive tasks.',
      },
      {
        type: 'image',
        src: img('photo-1581091226825-a6a2a5aee158'),
        alt: 'An engineer working on complex robotic machinery in a brightly lit laboratory.',
        caption: 'Deployment engineers spend most of their time on gripping and edge cases, not on the language interface.',
      },
      {
        type: 'quote',
        text: 'The demonstration is the easy part. Ninety per cent of the work is the twenty per cent of objects that do not behave.',
        attribution: 'A deployment engineer at one of the sites visited',
      },
      { type: 'heading', id: 'what-actually-changed', text: 'What actually changed' },
      {
        type: 'paragraph',
        text: 'The meaningful advance is not dexterity, which remains modest, but instruction. Earlier warehouse automation required a systems integrator, weeks of configuration and a physical layout designed around the machine. The current generation can be retasked by describing the new job, and adapts to a layout designed around people.',
      },
      {
        type: 'paragraph',
        text: 'That collapses the cost of changing your mind, which is the cost that historically made automation unattractive to operations with variable product mixes. A site handling the same twelve items every day never needed this. A site handling four thousand items with seasonal turnover always did.',
      },
      {
        type: 'paragraph',
        text: 'Whether that is enough to move the machines from three sites to three hundred is unresolved. The operators were consistent on one point: they are not planning around a machine that outperforms a person. They are planning around one that never goes home.',
      },
    ],
    tags: ['Robotics', 'Automation', 'Labour', 'Logistics', 'Field report'],
    relatedIds: ['ai-01', 'biz-02', 'tech-04'],
  },
  {
    id: 'ai-05',
    slug: 'ai-hiring-screening-rules',
    title: 'Regulators draft rules for automated hiring, and employers start rewriting job posts',
    subtitle:
      'A disclosure requirement aimed at screening software is having an effect before it takes force, as employers audit tools they did not know they were using.',
    summary:
      'Draft rules would require employers to disclose automated screening and retain records of how candidates were ranked. The compliance reviews have already turned up systems embedded in software nobody classified as a screening tool.',
    category: 'ai',
    authorId: 'a-halden',
    publishedAt: ago(4 * DAY + 2 * HOUR),
    readingTime: 7,
    image: img('photo-1517245386807-bb43f82c33c4'),
    imageAlt: 'Two colleagues at a table with laptops, one gesturing while explaining something.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 22100,
    briefing: {
      whatHappened:
        'Draft rules would require employers to tell candidates when automated systems rank or filter applications, and to keep records explaining the outcome.',
      whyItMatters:
        'Compliance reviews are surfacing ranking logic inside applicant-tracking software that employers had never assessed as a screening decision.',
      whatToWatch:
        'Whether the final text covers ranking as well as rejection — the current draft is ambiguous, and most systems rank rather than reject outright.',
      keyTakeaway:
        'The disclosure requirement is doing its work before it commences, by forcing an inventory.',
    },
    body: [
      {
        type: 'paragraph',
        text: 'The rule has not taken effect. It has already changed behaviour, which is arguably what a disclosure requirement is for.',
      },
      {
        type: 'paragraph',
        text: 'Draft rules under consideration would oblige employers to inform applicants when an automated system materially influences whether their application is reviewed, and to retain enough record to explain the outcome if asked. Employers preparing for it have been conducting inventories, and the inventories are the story.',
      },
      { type: 'heading', id: 'the-inventory-problem', text: 'The inventory problem' },
      {
        type: 'paragraph',
        text: 'Human resources departments generally know whether they bought a screening product. What several have discovered is that ranking logic arrives bundled inside applicant-tracking systems as a convenience feature — a relevance sort, a "best match" tab, a default ordering that determines which twenty applications a recruiter actually opens.',
      },
      {
        type: 'quote',
        text: 'Nobody signed a contract for an algorithm. They switched on a sort order, and the sort order became the shortlist.',
        attribution: 'An employment lawyer advising on compliance reviews',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Default relevance ordering in applicant-tracking software.',
          'Keyword matching against a job description, weighted invisibly.',
          'Scoring inherited from a vendor’s aggregate hiring data.',
          'Automatic deprioritisation of applications with employment gaps.',
        ],
      },
      { type: 'heading', id: 'ranking-versus-rejection', text: 'Ranking versus rejection' },
      {
        type: 'paragraph',
        text: 'The unresolved drafting question is whether the rule reaches ranking or only rejection. Very few systems reject outright; almost all of them rank. A recruiter who reviews the top twenty of four hundred applications has, in practical terms, allowed the ranking to decide, but no rejection was ever issued by the software.',
      },
      {
        type: 'paragraph',
        text: 'Employer groups argue that covering ranking makes the rule unworkable, since almost any ordering of a list would qualify. Candidate advocates argue that excluding ranking makes it meaningless, for the same reason.',
      },
      {
        type: 'paragraph',
        text: 'In the meantime, employers are rewriting job posts — shorter requirement lists, fewer proxy criteria, plainer language — on the theory that a specification a human can apply is one a system is less likely to distort. That is a modest outcome for a rule not yet in force, and not the one anyone drafted for.',
      },
    ],
    tags: ['Employment', 'Regulation', 'Hiring', 'Transparency', 'Labour'],
    relatedIds: ['ai-02', 'pol-03', 'edu-04'],
  },
];
