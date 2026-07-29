import type { Article } from '@/lib/types';
import { ago, DAY, HOUR, img } from './_shared';

export const environmentArticles: Article[] = [
  {
    id: 'env-01',
    slug: 'interconnection-queue-reform-results',
    title: 'Interconnection queue reform starts to clear a decade of backlog',
    subtitle:
      'Projects had been waiting years for a study that took weeks to perform. Processing applications in batches rather than in sequence turned out to be most of the fix.',
    summary:
      'Grid operators that replaced first-come sequential processing with batch studies have cleared substantial backlogs. The reform is procedural, unglamorous and is being copied quickly.',
    category: 'environment',
    authorId: 'a-lindqvist',
    publishedAt: ago(6 * HOUR + 55),
    updatedAt: ago(90),
    readingTime: 10,
    image: img('photo-1466611653911-95081537e5b7'),
    imageAlt: 'Wind turbines standing in an open field beneath a golden sunset sky.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: true,
    trending: true,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 37500,
    briefing: {
      whatHappened:
        'Operators switched from studying interconnection applications one at a time to studying them in clustered batches, and backlogs that had grown for a decade began to fall.',
      whyItMatters:
        'Generation projects cannot connect until the study is complete. The queue, not construction, had become the binding constraint on new capacity.',
      biggerPicture:
        'Sequential processing failed because each withdrawal invalidated the studies behind it, forcing repeated rework.',
      whatToWatch:
        'Whether deposit requirements introduced alongside the reform deter speculative applications without excluding smaller developers.',
      keyTakeaway:
        'The constraint was administrative. Fixing it required no new technology and no new money.',
    },
    keyFacts: [
      'A single interconnection study takes weeks; queue waits had reached several years.',
      'Withdrawals under sequential processing forced restudy of every application behind them.',
      'Batch processing studies a cluster together, so one withdrawal does not invalidate the rest.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The technical work of connecting a generation project to the grid is well understood. Engineers model what the addition does to power flows, identify the upgrades required and produce a cost allocation. The study itself takes weeks.',
      },
      {
        type: 'paragraph',
        text: 'Projects were waiting years. The delay was almost entirely queueing, and the queue was structured in a way that guaranteed it would grow.',
      },
      { type: 'heading', id: 'the-flaw', text: 'Why sequential processing failed' },
      {
        type: 'paragraph',
        text: 'Under first-come, first-served processing, each application is studied against a grid that includes every application ahead of it. This is logically sound and operationally fragile: if an earlier project withdraws, every study behind it was performed against a grid configuration that no longer applies, and must be redone.',
      },
      {
        type: 'quote',
        text: 'We were restudying the same projects four and five times. Not because anything changed on our side — because somebody upstream changed their mind.',
        attribution: 'An interconnection manager at a transmission operator',
      },
      {
        type: 'paragraph',
        text: 'Withdrawal rates were high, partly because the queue was free to join. Developers submitted applications for multiple sites to preserve optionality, intending to build one. Each speculative application generated study obligations and, on withdrawal, rework for everyone behind it.',
      },
      {
        type: 'image',
        src: img('photo-1497435334941-8c899ee9e8e9'),
        alt: 'An aerial view of a large solar farm with rows of panels across green fields.',
        caption:
          'Projects held ready to build were waiting on studies, not on equipment or finance.',
      },
      { type: 'heading', id: 'batching', text: 'What batching changes' },
      {
        type: 'paragraph',
        text: 'Clustered processing studies a group of applications together as a single scenario. Upgrade costs are allocated across the cluster by contribution. If one project withdraws, the cluster is restudied once — not every project behind it, individually, in sequence.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Applications received in a window are grouped into a study cluster.',
          'The cluster is modelled together, producing one set of required upgrades.',
          'Costs are allocated proportionally across the projects in the cluster.',
          'Withdrawal triggers a single restudy of the cluster, not a cascade.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Operators that adopted this have reported substantial reductions in queue length within two study cycles. The change required no new technology, no new transmission and no additional funding — only a different processing rule and the regulatory approval to apply it.',
      },
      { type: 'heading', id: 'deposits', text: 'The deposit question' },
      {
        type: 'paragraph',
        text: 'Most reforms introduced deposits and milestone requirements alongside batching, to deter applications from projects with no realistic path to construction. This works, and it carries a distributional concern: a deposit large enough to deter a speculative filing by a large developer is a meaningful barrier to a small community project.',
      },
      {
        type: 'paragraph',
        text: 'Several operators have addressed this with tiered deposits scaled to project size, and one has exempted projects below a capacity threshold entirely. Whether the exemption is exploited is being monitored, and is the most likely subject of the next round of amendments.',
      },
      {
        type: 'links',
        title: 'Related reporting',
        items: [
          { label: 'The power contracts behind the next generation of data centres', href: '/article/ai-datacentre-power-contracts' },
          { label: 'Solar farms and farmland stop competing', href: '/article/solar-farm-land-use-agriculture' },
          { label: 'Pension funds are buying infrastructure', href: '/article/pension-funds-infrastructure-shift' },
        ],
      },
    ],
    tags: ['Energy', 'Grid', 'Regulation', 'Renewables', 'Infrastructure'],
    relatedIds: ['env-02', 'ai-03', 'biz-04'],
  },
  {
    id: 'env-02',
    slug: 'solar-farm-land-use-agriculture',
    title: 'Solar farms and farmland stop competing',
    subtitle:
      'Raising panels and spacing them further apart costs more per megawatt. It also lets the field underneath keep working, and the arithmetic is closer than expected.',
    summary:
      'Combined solar and agricultural installations have moved from research plots to commercial scale. The economics depend on the crop, and for some the combination outperforms either use alone.',
    category: 'environment',
    authorId: 'a-lindqvist',
    publishedAt: ago(2 * DAY + 2 * HOUR),
    readingTime: 7,
    image: img('photo-1508514177221-188b1cf16e9d'),
    imageAlt: 'Rows of solar panels angled toward a blue sky streaked with thin cloud.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 19100,
    keyFacts: [
      'Raised, widely spaced arrays generate less per hectare than conventional layouts.',
      'Partial shade improves yield for some crops in hot, dry conditions.',
      'Planning objections fall sharply where agricultural use continues.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The objection to large solar installations on agricultural land is straightforward and often sincere: the land was producing food, and now it is producing electricity. Framed as a choice, it is a difficult one.',
      },
      {
        type: 'paragraph',
        text: 'A growing number of installations decline the framing. Panels are mounted higher, spaced more widely and sometimes oriented vertically, leaving room for machinery and light for crops below.',
      },
      { type: 'heading', id: 'the-cost', text: 'What it costs' },
      {
        type: 'paragraph',
        text: 'The configuration generates less electricity per hectare than a conventional layout and costs more to build, because taller mounting structures require more steel and deeper foundations. On electricity alone, it is worse.',
      },
      {
        type: 'quote',
        text: 'We give up perhaps a fifth of the generation. We keep the whole farm. In this valley that is not a close decision.',
        attribution: 'A farmer hosting a combined installation',
      },
      { type: 'heading', id: 'the-crops', text: 'Where it works' },
      {
        type: 'paragraph',
        text: 'Results depend heavily on the crop and the climate. In hot, dry regions, partial shade reduces water stress and heat damage, and several trials have recorded higher yields under panels than in adjacent open fields. In cooler, cloudier regions, shading reduces yield and the case rests on the electricity alone.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Shade-tolerant crops and pasture perform best under partial cover.',
          'Grazing continues largely unaffected, and the panels provide shelter.',
          'Cereal yields are more sensitive, and results vary sharply by region.',
          'Machinery clearance drives the mounting height, and therefore most of the extra cost.',
        ],
      },
      { type: 'heading', id: 'planning', text: 'The planning effect' },
      {
        type: 'paragraph',
        text: 'The clearest benefit is not agronomic. Planning objections fall substantially where the agricultural use continues, because the strongest local argument against a project — that productive land is being taken out of use — no longer applies.',
      },
      {
        type: 'paragraph',
        text: 'For developers, a project that clears planning two years faster is worth a good deal more than the generation it gives up. That, more than any yield result, is what has moved these designs from research plots to commercial scale.',
      },
    ],
    tags: ['Solar', 'Agriculture', 'Land use', 'Planning', 'Renewables'],
    relatedIds: ['env-01', 'env-03', 'world-04'],
  },
  {
    id: 'env-03',
    slug: 'ocean-plastic-recovery-audit',
    title: 'An ocean plastic programme audits itself, and publishes the shortfall',
    subtitle:
      'The recovery figures were below target. The decision to publish them anyway is the reason the programme is still credible.',
    summary:
      'A marine plastic recovery initiative commissioned an independent audit, found it had recovered substantially less than projected, and published the finding in full alongside a revised method.',
    category: 'environment',
    authorId: 'a-lindqvist',
    publishedAt: ago(5 * DAY + 9 * HOUR),
    readingTime: 6,
    image: img('photo-1621451537084-482c73073a0f'),
    imageAlt: 'Fragments of plastic waste drifting in clear turquoise seawater.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 15200,
    briefing: {
      whatHappened:
        'An independent audit found a marine plastic recovery programme had collected considerably less material than its published projections, and the programme published the audit unedited.',
      whyItMatters:
        'Recovery figures underpin funding decisions and corporate offset claims. Unverified figures have circulated widely in both.',
      whatToWatch:
        'Whether funders begin requiring independent verification as a condition, which several have signalled.',
      keyTakeaway:
        'Publishing the shortfall cost the programme in the short term and is the reason its numbers can now be used.',
    },
    body: [
      {
        type: 'paragraph',
        text: 'The projections were made in good faith, using assumptions about plastic density and distribution that were the best available when the programme was designed. They were wrong, in the direction that overstates recovery, and by a substantial margin.',
      },
      {
        type: 'paragraph',
        text: 'The programme commissioned an independent audit, received an unwelcome result, and published it without amendment. That sequence is uncommon enough to be worth reporting on its own.',
      },
      { type: 'heading', id: 'why-wrong', text: 'Why the projections were wrong' },
      {
        type: 'paragraph',
        text: 'Two errors compounded. The density estimates were drawn from surveys conducted in the most concentrated areas and applied more broadly. And the recovery equipment performed as designed on large fragments while capturing a much smaller share of the small ones, which constitute most of the material by count.',
      },
      {
        type: 'quote',
        text: 'We were measuring what we caught and reporting it against a model of what was there. Nobody checked the model against the ocean.',
        attribution: 'A programme scientist',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Density surveys taken in concentration zones and extrapolated too widely.',
          'Capture efficiency measured on large fragments only.',
          'No independent verification of recovered mass before publication.',
        ],
      },
      { type: 'heading', id: 'consequences', text: 'What publication cost, and bought' },
      {
        type: 'paragraph',
        text: 'The immediate consequences were bad. Two funders paused disbursements pending review, and corporate partners citing the programme’s figures in sustainability reporting had to restate. Coverage was unkind, including in this publication.',
      },
      {
        type: 'paragraph',
        text: 'The programme has since revised its measurement method, adopted independent verification of recovered mass, and republished its historical figures on the corrected basis. Its numbers are now among the few in the sector that a funder can rely on without commissioning an audit first, which several funders have said publicly is why they resumed support.',
      },
    ],
    tags: ['Oceans', 'Plastic', 'Measurement', 'Accountability', 'Funding'],
    relatedIds: ['env-02', 'env-01', 'sci-03'],
  },
];
