import type { Article } from '@/lib/types';
import { ago, DAY, HOUR, img } from './_shared';

export const worldArticles: Article[] = [
  {
    id: 'world-01',
    slug: 'shipping-corridor-rerouting-costs',
    title: 'Rerouted shipping adds eleven days, and the cost lands in unexpected places',
    subtitle:
      'Freight rates absorbed the first shock. The durable consequences are showing up in warehouse leases, insurance terms and the size of orders retailers place.',
    summary:
      'A sustained detour on a major shipping corridor has stopped being an emergency and become a planning assumption. UK MAGAZINE followed the cost through the chain to see where it finally settles.',
    category: 'world',
    authorId: 'a-rahimi',
    publishedAt: ago(8 * HOUR + 15),
    updatedAt: ago(2 * HOUR),
    readingTime: 13,
    image: img('photo-1494412574643-ff11b0a5c1c3'),
    imageAlt: 'An aerial view of a container port with thousands of stacked shipping containers and gantry cranes.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: true,
    trending: true,
    editorsPick: true,
    inDepth: true,
    kind: 'report',
    reads: 52400,
    briefing: {
      whatHappened:
        'A long detour on a major shipping route has persisted long enough that shippers have stopped treating it as temporary and rebuilt their planning around it.',
      whyItMatters:
        'Freight rates normalised, which made the disruption look resolved. The cost moved instead into inventory, warehousing and insurance.',
      biggerPicture:
        'Longer transit times force higher safety stock, which requires storage, which is the scarce and expensive input in most consuming markets.',
      whatToWatch:
        'Warehouse lease renewals over the next two quarters, where the cost is being repriced most visibly.',
      keyTakeaway:
        'The disruption did not end. It was absorbed, unevenly, by whoever had least ability to pass it on.',
    },
    keyFacts: [
      'The detour adds roughly eleven days to a typical voyage on the affected route.',
      'Longer transit requires proportionally more inventory in transit and more safety stock.',
      'Warehouse vacancy in several consuming markets has fallen to record lows.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'For the first months, the story was freight rates. They rose steeply, the coverage was continuous, and then they came back down as capacity redeployed. By the usual measure the disruption was over.',
      },
      {
        type: 'paragraph',
        text: 'The voyage is still eleven days longer. That fact has not changed, and it is the fact that matters, because a longer voyage is not a price shock — it is a permanent change to the amount of inventory the system must hold.',
      },
      { type: 'heading', id: 'the-arithmetic', text: 'The arithmetic of eleven days' },
      {
        type: 'paragraph',
        text: 'Goods in transit are inventory. Extending every voyage by eleven days increases the quantity of stock floating between origin and destination, financed by somebody, insured by somebody and unavailable to sell. On a route carrying substantial volume, that is a large, permanent addition to working capital.',
      },
      {
        type: 'paragraph',
        text: 'Longer transit also widens the range of arrival dates. A retailer that could once plan on a two-day window now plans on a five-day one, and the standard response to wider variance is to hold more safety stock — which must be stored.',
      },
      {
        type: 'image',
        src: img('photo-1519501025264-65ba15a82390'),
        alt: 'A city street at dusk lined with tall buildings and streaked with traffic light trails.',
        caption:
          'Storage close to consuming markets is the scarce input. Rerouting moved the cost there.',
      },
      { type: 'heading', id: 'warehouses', text: 'Where the cost settled' },
      {
        type: 'paragraph',
        text: 'Warehouse vacancy in several major consuming markets has fallen to record lows, and lease renewals are being negotiated at rates that importers describe as the largest single cost increase they have absorbed from the disruption — larger, now, than the freight itself ever was.',
      },
      {
        type: 'quote',
        text: 'The ocean freight normalised and everybody relaxed. Our storage bill doubled and it is not going back.',
        attribution: 'A logistics director at a mid-sized importer',
      },
      {
        type: 'paragraph',
        text: 'Large retailers with owned distribution capacity absorbed this comfortably. Importers renting space did not, and several have responded by reducing the range of goods they carry — fewer variants, deeper stock on the lines that sell reliably.',
      },
      { type: 'heading', id: 'insurance', text: 'Insurance and the quiet repricing' },
      {
        type: 'paragraph',
        text: 'Marine insurance terms have also shifted, less through headline premium increases than through deductibles, exclusions and survey requirements. Underwriters describe this as ordinary repricing against a changed route profile.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Higher deductibles on affected routes, shifting small losses to the shipper.',
          'Survey requirements adding fixed cost per voyage regardless of cargo value.',
          'Narrower delay coverage, which was the clause many shippers assumed protected them.',
        ],
      },
      { type: 'heading', id: 'who-pays', text: 'Who ends up paying' },
      {
        type: 'paragraph',
        text: 'Following the cost to its destination produces an unsatisfying answer: it settles wherever bargaining power is weakest. Large retailers pushed it back onto suppliers through revised terms. Suppliers with alternatives pushed it forward into prices. Suppliers without alternatives absorbed it.',
      },
      {
        type: 'paragraph',
        text: 'Consumer prices moved less than the disruption’s scale would suggest, which has been read in some coverage as evidence that the impact was modest. The importers UK MAGAZINE spoke to read it differently: the impact was real, and it was mostly paid upstream of the shelf.',
      },
      {
        type: 'links',
        title: 'Related reporting',
        items: [
          { label: 'A regional bloc publishes its tariff schedule', href: '/article/regional-trade-bloc-tariff-schedule' },
          { label: 'Warehouse automation finally shows up in margins', href: '/article/warehouse-automation-margins' },
          { label: 'Three cable faults in a month renew the case for redundant routes', href: '/article/undersea-cable-redundancy' },
        ],
      },
      {
        type: 'paragraph',
        text: 'Whether the routing reverts is not, at this point, the operative question for planners. Several of the largest shippers have signed multi-year warehouse leases sized for the current transit time. They have priced in the detour lasting, which is its own kind of forecast.',
      },
    ],
    tags: ['Shipping', 'Trade', 'Logistics', 'Insurance', 'Supply chains'],
    relatedIds: ['world-02', 'biz-02', 'tech-01'],
  },
  {
    id: 'world-02',
    slug: 'regional-trade-bloc-tariff-schedule',
    title: 'A regional bloc publishes its tariff schedule, and importers recalculate',
    subtitle:
      'The headline rates were expected. The rules of origin, published alongside them, are where the substance turned out to be.',
    summary:
      'A long-negotiated tariff schedule has been published in full. Trade lawyers say the origin rules will determine more outcomes than the rates themselves.',
    category: 'world',
    authorId: 'a-rahimi',
    publishedAt: ago(1 * DAY + 2 * HOUR),
    readingTime: 7,
    image: img('photo-1526778548025-fa2f459cd5c1'),
    imageAlt: 'A world map rendered in dark wood grain across a pale wooden surface.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: true,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 23100,
    briefing: {
      whatHappened:
        'The full tariff schedule and accompanying rules of origin were published after several years of negotiation.',
      whyItMatters:
        'Rules of origin determine which goods qualify for preferential rates, and they are strict enough that many products currently traded within the bloc will not qualify.',
      whatToWatch:
        'Whether the transitional period is extended for sectors with long supplier qualification cycles.',
      keyTakeaway:
        'The rates are generous. Qualifying for them will be the difficult part.',
    },
    body: [
      {
        type: 'paragraph',
        text: 'Tariff schedules attract attention for their headline rates. Trade lawyers read them backwards, starting with the annex nobody reports on, because the rules of origin decide who is actually entitled to the rate on the front page.',
      },
      {
        type: 'paragraph',
        text: 'The schedule published this week is, on rates, close to what negotiators had signalled. On origin, it is stricter than most importers had planned for.',
      },
      { type: 'heading', id: 'origin', text: 'What rules of origin do' },
      {
        type: 'paragraph',
        text: 'A preferential rate applies to goods originating within the bloc. Determining origin for a product assembled from components made in several places requires a rule — typically a threshold of value added locally, a required change in tariff classification, or a specified process that must occur inside the area.',
      },
      {
        type: 'quote',
        text: 'Every client asks about the rate. The rate is the easy part. The question is whether your product is from here, and that is a legal conclusion, not a fact.',
        attribution: 'A trade lawyer advising manufacturers on the new schedule',
      },
      {
        type: 'paragraph',
        text: 'The thresholds in the published annex are high enough that goods assembled locally from imported subassemblies will frequently fail to qualify. For sectors with deep supplier networks outside the bloc, meeting them means requalifying suppliers, which takes eighteen months to three years.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Value-added thresholds above the level most negotiators had signalled.',
          'Cumulation permitted only with a defined list of partners.',
          'Documentation requirements that place the compliance burden on the importer.',
        ],
      },
      { type: 'heading', id: 'transition', text: 'The transitional period' },
      {
        type: 'paragraph',
        text: 'A transitional period applies reduced thresholds for an initial term. Industry groups in sectors with long qualification cycles have already begun arguing that the term is shorter than the requalification it demands, and the mismatch is the most likely subject of the first amendment.',
      },
      {
        type: 'paragraph',
        text: 'Importers, meanwhile, are running the calculation product by product. Several told UK MAGAZINE they expect to pay the standard rate on a meaningful share of goods for at least the first two years — not because the preferential rate is unattractive, but because proving entitlement to it costs more than the saving on low-margin lines.',
      },
    ],
    tags: ['Trade', 'Tariffs', 'Manufacturing', 'Regulation', 'Supply chains'],
    relatedIds: ['world-01', 'biz-01', 'world-03'],
  },
  {
    id: 'world-03',
    slug: 'migration-corridor-labour-agreements',
    title: 'Labour agreements quietly reshape a migration corridor',
    subtitle:
      'Bilateral schemes matching workers to specific shortages have grown without much notice, and are now large enough to change the composition of a long-standing route.',
    summary:
      'Structured labour agreements now account for a substantial share of movement along a corridor previously dominated by informal channels. The effects are visible in both origin and destination communities.',
    category: 'world',
    authorId: 'a-rahimi',
    publishedAt: ago(3 * DAY + 9 * HOUR),
    readingTime: 9,
    image: img('photo-1477959858617-67f85cf4f1df'),
    imageAlt: 'An aerial view of a dense city skyline at dusk beside a large body of water.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 15800,
    keyFacts: [
      'Agreements are sector-specific, tied to identified shortages rather than general quotas.',
      'Most include a return or renewal structure rather than a direct settlement pathway.',
      'Origin countries have negotiated training funding as part of several schemes.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The agreements are unglamorous documents. They identify a sector with a documented shortage, set a number, specify qualification requirements, and establish who verifies credentials on each side. They are negotiated by labour ministries rather than foreign ministries, which is part of why they attract little attention.',
      },
      {
        type: 'paragraph',
        text: 'Collectively they now account for a substantial share of movement along a corridor that was, a decade ago, dominated by informal channels and family reunification.',
      },
      { type: 'heading', id: 'structure', text: 'How the schemes are built' },
      {
        type: 'paragraph',
        text: 'Most share a common architecture: entry tied to a named employer or an approved employer pool, credential verification conducted before departure, and a term with defined renewal conditions rather than an automatic settlement pathway.',
      },
      {
        type: 'quote',
        text: 'The scheme is popular in both capitals because both can describe it accurately as temporary and as an opportunity. Those are not contradictory, but they are not the same promise.',
        attribution: 'A researcher who studies bilateral labour agreements',
      },
      {
        type: 'paragraph',
        text: 'That ambiguity is the source of most disputes. Workers who renew repeatedly accumulate long residence without a settlement route, and the resulting status has been the subject of litigation in two destination countries.',
      },
      { type: 'heading', id: 'origin-effects', text: 'Effects at the origin' },
      {
        type: 'paragraph',
        text: 'Origin countries have negotiated harder over time. Several agreements now include destination-funded training capacity, on the argument that a scheme drawing qualified nurses or technicians out of a system should contribute to producing more of them.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Training capacity funded by the destination country in the origin country.',
          'Caps on recruitment from regions with identified domestic shortages.',
          'Credential recognition agreements that also apply to returning workers.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Whether these provisions work is contested and hard to measure, since the counterfactual — what would have happened absent the scheme — is unobservable. What is clear is that the negotiations have become more balanced as origin countries have gained experience with them.',
      },
      {
        type: 'paragraph',
        text: 'The corridor’s informal channels have not disappeared. They have, by most measures, contracted, which the schemes’ designers cite as evidence of success and their critics attribute to enforcement conducted alongside them.',
      },
    ],
    tags: ['Migration', 'Labour', 'Diplomacy', 'Development', 'Policy'],
    relatedIds: ['world-02', 'hea-01', 'edu-04'],
  },
  {
    id: 'world-04',
    slug: 'city-diplomacy-climate-networks',
    title: 'Mayors negotiate what capitals cannot',
    subtitle:
      'City-to-city agreements on procurement and building standards are moving faster than national negotiations, and they are binding in a practical if not a legal sense.',
    summary:
      'Networks of cities are agreeing common standards and joint purchasing arrangements directly. The agreements have no treaty status and considerable market effect.',
    category: 'world',
    authorId: 'a-rahimi',
    publishedAt: ago(9 * DAY + 5 * HOUR),
    readingTime: 7,
    image: img('photo-1523482580672-f109ba8cb9be'),
    imageAlt: 'A waterfront opera house illuminated at dusk with a calm harbour in the foreground.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'analysis',
    reads: 13400,
    body: [
      {
        type: 'paragraph',
        text: 'The agreement has no legal force. It commits no state to anything, creates no obligation enforceable in any court, and would not appear in a treaty registry. It also, between the cities that signed it, determines the specification for several hundred million units of currency in annual purchasing.',
      },
      {
        type: 'paragraph',
        text: 'City networks have become a quietly consequential venue for the kind of technical harmonisation that national negotiations handle slowly. The mechanism is procurement, and it works because manufacturers respond to a large combined order regardless of whether the document commanding it is a treaty.',
      },
      { type: 'heading', id: 'how', text: 'Why it moves faster' },
      {
        type: 'paragraph',
        text: 'A mayor negotiating a common bus specification with eleven other mayors is dealing with a narrow, technical question among parties with closely aligned interests. A national negotiation on the same subject must accommodate manufacturers, regional employment considerations and unrelated bargaining across other files.',
      },
      {
        type: 'quote',
        text: 'We are not making foreign policy. We are buying buses together, and it turns out that buying buses together changes what gets manufactured.',
        attribution: 'A deputy mayor involved in a joint procurement network',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Joint specifications for vehicles, charging equipment and building components.',
          'Shared pre-qualification of suppliers, reducing duplicated assessment.',
          'Common data reporting, which makes performance comparable between cities.',
        ],
      },
      { type: 'heading', id: 'limits', text: 'The limits' },
      {
        type: 'paragraph',
        text: 'The arrangements are fragile in a specific way: they depend on continuity of political leadership across many jurisdictions at once. A change of administration in a large participating city can withdraw a substantial share of the combined volume, and suppliers price that risk.',
      },
      {
        type: 'paragraph',
        text: 'Several networks have responded by moving agreements into procurement frameworks with multi-year terms, which survive an election in a way that a memorandum between mayors does not. That is a modest institutional innovation, and it is roughly the point at which city diplomacy starts to resemble the slower kind.',
      },
    ],
    tags: ['Cities', 'Procurement', 'Diplomacy', 'Climate', 'Local government'],
    relatedIds: ['env-02', 'pol-02', 'world-03'],
  },
];
