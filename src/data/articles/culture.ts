import type { Article } from '@/lib/types';
import { ago, DAY, HOUR, img } from './_shared';

export const cultureArticles: Article[] = [
  {
    id: 'cul-01',
    slug: 'museum-attendance-late-openings',
    title: 'Late openings changed who comes to the museum',
    subtitle:
      'Institutions that stayed open into the evening expected the same audience at a different hour. They got a different audience.',
    summary:
      'Extended evening hours have produced measurable shifts in visitor demographics at institutions that tracked them — younger, more local, and more likely to return.',
    category: 'culture',
    authorId: 'a-ferreira',
    publishedAt: ago(10 * HOUR + 20),
    readingTime: 6,
    image: img('photo-1518998053901-5348d3961a04'),
    imageAlt: 'A bright white gallery corridor hung with framed artworks and lit by ceiling spotlights.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: true,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 24900,
    keyFacts: [
      'Evening visitors skew younger and more local than daytime visitors.',
      'Return visit rates are higher among evening attendees.',
      'Staffing costs rise less than proportionally, since galleries are already open.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The expectation was straightforward: opening late would let people who work during the day visit at a time that suited them. The same audience, shifted a few hours.',
      },
      {
        type: 'paragraph',
        text: 'Institutions that measured properly found something else. The evening audience is not the daytime audience arriving later. It is a different audience — younger on average, more likely to live within the city rather than to be visiting it, more likely to come with friends than with family, and considerably more likely to come back.',
      },
      { type: 'heading', id: 'why', text: 'Why the composition shifts' },
      {
        type: 'paragraph',
        text: 'Curators and visitor researchers offer a consistent explanation. A daytime museum visit is a planned excursion competing with other excursions. An evening visit competes with a drink, a film or nothing in particular, and it wins that comparison more often than it wins the first one.',
      },
      {
        type: 'quote',
        text: 'We stopped competing with the other museum across the city and started competing with the bar next door. We do better in that fight than we expected.',
        attribution: 'A director of audiences at a national institution',
      },
      {
        type: 'image',
        src: img('photo-1541961017774-22349e4a1262'),
        alt: 'A vivid abstract painting in reds, yellows and blues with heavy textured brushwork.',
        caption:
          'Evening programming has shifted from special events toward simply staying open, which costs less and works better.',
      },
      { type: 'heading', id: 'economics', text: 'The economics' },
      {
        type: 'paragraph',
        text: 'Costs rise less than institutions feared. Galleries already lit and staffed for the day require incremental rather than duplicated staffing to remain open, and the marginal visitor arrives at close to zero additional cost once the doors are open at all.',
      },
      {
        type: 'paragraph',
        text: 'The institutions doing best have also moved away from heavily programmed evening events toward simply being open. Events draw a crowd once. Predictable hours build a habit, and habit is what the return-visit data is measuring.',
      },
    ],
    tags: ['Museums', 'Audiences', 'Cities', 'Culture', 'Programming'],
    relatedIds: ['cul-02', 'cul-03', 'pol-02'],
  },
  {
    id: 'cul-02',
    slug: 'touring-economics-mid-size-venues',
    title: 'The mid-size venue is where touring economics break',
    subtitle:
      'Small rooms work because costs are small. Arenas work because revenue is large. The rooms in between have neither advantage.',
    summary:
      'Venues in the 800–2,500 capacity range are closing at a faster rate than either smaller clubs or large arenas, and the reasons are structural rather than cyclical.',
    category: 'culture',
    authorId: 'a-ferreira',
    publishedAt: ago(3 * DAY + 6 * HOUR),
    readingTime: 7,
    image: img('photo-1499364615650-ec38552f4f34'),
    imageAlt: 'A concert stage seen from the crowd, bathed in blue and white beams of light.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'video',
    reads: 19300,
    briefing: {
      whatHappened:
        'Mid-capacity music venues are closing faster than either small clubs or large arenas.',
      whyItMatters:
        'These rooms are where performers build the audience that eventually fills larger venues. Losing them affects the top of the market with a lag of several years.',
      whatToWatch:
        'Whether the touring rebates and grant schemes now being trialled change the arithmetic enough to matter.',
      keyTakeaway:
        'The squeeze is structural: fixed costs scaled like a large venue, revenue scaled like a small one.',
    },
    body: [
      {
        type: 'paragraph',
        text: 'A four-hundred-capacity room can run with a small staff, a modest sound system and a licence that costs little. An arena runs on volume: enough tickets, enough concessions and enough sponsorship to carry a large fixed cost base.',
      },
      {
        type: 'paragraph',
        text: 'A room holding fifteen hundred people has arena-shaped obligations and club-shaped revenue. It needs professional sound, security staffing, insurance and often a building whose rent reflects a city-centre location. It cannot cover that with fifteen hundred tickets at club prices, and it cannot charge arena prices.',
      },
      { type: 'heading', id: 'the-squeeze', text: 'Where the money goes' },
      {
        type: 'list',
        ordered: false,
        items: [
          'Rent, in locations chosen for transport access that also command high commercial rates.',
          'Security and compliance staffing that scales with capacity in steps, not smoothly.',
          'Production costs that have risen faster than ticket prices for a decade.',
          'Guarantee-based booking, which transfers risk from the performer to the room.',
        ],
      },
      {
        type: 'quote',
        text: 'We take the risk on the night, and we take it at a scale where one cancelled show is a bad month.',
        attribution: 'The owner of an independent 1,200-capacity venue',
      },
      { type: 'heading', id: 'consequences', text: 'The consequence nobody sees for five years' },
      {
        type: 'paragraph',
        text: 'These rooms are where performers learn to hold a large audience. An artist who moves from four hundred capacity directly to an arena support slot has skipped the stage where that is learned, and the industry figures who worry about this describe the effect as showing up years later, in the quality of the acts capable of headlining.',
      },
      {
        type: 'paragraph',
        text: 'Several cities have introduced targeted relief — rate reductions, licensing simplification, grant schemes tied to the number of developing acts booked. It is early, and the operators receiving it describe the amounts as helpful rather than decisive.',
      },
    ],
    tags: ['Music', 'Venues', 'Touring', 'Cities', 'Economics'],
    relatedIds: ['cul-01', 'cul-03', 'biz-03'],
  },
  {
    id: 'cul-03',
    slug: 'archival-restoration-colour-film',
    title: 'Restoring colour film without inventing it',
    subtitle:
      'The dyes have faded unevenly for sixty years. Deciding what the film looked like originally is a research problem before it is a technical one.',
    summary:
      'A restoration team spent four years on a film whose colour had shifted beyond recognition. The technical work was the straightforward part; establishing what to restore it to was not.',
    category: 'culture',
    authorId: 'a-ferreira',
    publishedAt: ago(8 * DAY + 4 * HOUR),
    readingTime: 11,
    image: img('photo-1524721696987-b9527df9e512'),
    imageAlt: 'A swirling abstract texture of deep red liquid pigment.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: true,
    inDepth: true,
    kind: 'report',
    reads: 17400,
    keyFacts: [
      'Colour dyes in mid-century film stock fade at different rates, shifting the whole image.',
      'Original release prints are rarely reliable references, having faded themselves.',
      'The team published its reasoning alongside the restoration, which remains uncommon.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The negative has been in cold storage since 1974, which is why it survives at all. It has still shifted. The three dye layers in film stock of this era fade at different rates, and the result after six decades is an image with a pronounced cast that nobody who worked on the film would recognise.',
      },
      {
        type: 'paragraph',
        text: 'Correcting this is, technically, not difficult. Software can shift the balance to anything. The hard question is what to shift it to.',
      },
      { type: 'heading', id: 'references', text: 'Looking for a reference' },
      {
        type: 'paragraph',
        text: 'The obvious reference is an original release print. The problem is that release prints have been fading too, on different stock, at different rates, in worse storage. A print is evidence, but it is evidence that requires its own correction.',
      },
      {
        type: 'quote',
        text: 'You cannot check your answer against another faded object and call that verification. You are just choosing which fade to trust.',
        attribution: 'The restoration’s supervising colourist',
      },
      {
        type: 'paragraph',
        text: 'The team assembled a broader evidentiary base: production correspondence about intended looks, surviving costume and set materials whose actual colours could be measured directly, contemporary reviews describing specific scenes, and the cinematographer’s own notes, which survived in a university archive.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Physical costume and set pieces, measured with a spectrophotometer.',
          'Production correspondence specifying intended colour treatment for particular sequences.',
          'Multiple release prints, compared to identify consistent versus stock-specific shifts.',
          'The cinematographer’s working notes, held in an archive and not previously consulted.',
        ],
      },
      { type: 'heading', id: 'judgement', text: 'Where judgement is unavoidable' },
      {
        type: 'paragraph',
        text: 'Even with that evidence, decisions remained. A sequence the cinematographer described as intentionally cool had faded warm, and the surviving prints disagreed about how cool. The team documented the disagreement, chose a reading, and published the reasoning.',
      },
      {
        type: 'paragraph',
        text: 'That publication is the unusual part. Restorations are ordinarily released without an account of the judgements inside them, which leaves future restorers unable to distinguish a documented decision from an accident. This team released a written record of every contested choice alongside the film.',
      },
      {
        type: 'image',
        src: img('photo-1533174072545-7a4b6ad7a6c3'),
        alt: 'A crowd at a concert with confetti falling through bright stage lighting.',
        caption:
          'The restored film screened publicly this year, accompanied by a published record of the team’s decisions.',
      },
      {
        type: 'paragraph',
        text: 'The result is not the film as audiences saw it in 1961, and the team is explicit about that. It is a defensible reconstruction with its reasoning attached — which, for an object that no longer exists in its original state, is the most honest thing a restoration can be.',
      },
    ],
    tags: ['Film', 'Restoration', 'Archives', 'Method', 'Heritage'],
    relatedIds: ['cul-01', 'cul-02', 'sci-03'],
  },
];
