import type { Article } from '@/lib/types';
import { ago, DAY, HOUR, img } from './_shared';

export const businessArticles: Article[] = [
  {
    id: 'biz-01',
    slug: 'central-bank-hold-labour-market',
    title: 'Central bank holds, and points to a labour market it cannot read',
    subtitle:
      'The decision was expected. The accompanying statement was unusually candid about the quality of the data underneath it.',
    summary:
      'Rates were left unchanged, with the statement noting that survey response rates have fallen far enough to widen the uncertainty around every employment figure the committee relies on.',
    category: 'business',
    authorId: 'a-okonjo',
    publishedAt: ago(4 * HOUR + 5),
    readingTime: 8,
    image: img('photo-1611974789855-9c2a0a7236a3'),
    imageAlt: 'A dark financial chart showing red and green candlesticks trending downward.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: true,
    trending: true,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 44600,
    briefing: {
      whatHappened:
        'The policy committee held rates and published a statement acknowledging materially increased uncertainty in labour market data.',
      whyItMatters:
        'Employment figures anchor the committee’s assessment of inflationary pressure. If the figures are noisier, the case for waiting strengthens regardless of what they show.',
      biggerPicture:
        'Survey response rates have been falling across statistical agencies for a decade, and the effect on confidence intervals is now large enough to affect policy.',
      whatToWatch:
        'Whether the committee formally widens the uncertainty bands it publishes alongside its forecasts.',
      keyTakeaway:
        'The hold is about measurement confidence as much as about the economy.',
    },
    keyFacts: [
      'Rates unchanged for a third consecutive meeting.',
      'The statement explicitly referenced data quality, which is unusual.',
      'Household survey response rates have fallen across most advanced statistical agencies.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The decision itself was priced in and produced no market reaction worth describing. The statement was the interesting document, and what made it interesting was a paragraph about statistics.',
      },
      {
        type: 'paragraph',
        text: 'The committee noted that it now attaches wider uncertainty to labour market indicators than at any point in the past decade — not because the indicators are moving unusually, but because the surveys producing them are collecting fewer responses.',
      },
      { type: 'heading', id: 'response-rates', text: 'The response rate problem' },
      {
        type: 'paragraph',
        text: 'Household surveys have been getting harder to run for years. Fewer people answer unknown numbers, fewer answer doors, and the people who do answer differ systematically from those who do not. Statistical agencies compensate with weighting, which works up to a point and produces wider intervals past it.',
      },
      {
        type: 'quote',
        text: 'We are not arguing about whether unemployment rose. We are arguing about whether a movement of that size is distinguishable from nothing.',
        attribution: 'A committee member, speaking at the press conference',
      },
      {
        type: 'paragraph',
        text: 'For a committee that adjusts policy in response to changes of a few tenths of a percentage point, an indicator whose confidence interval has widened is not a technical curiosity. It is a direct constraint on how confidently the committee can act.',
      },
      {
        type: 'image',
        src: img('photo-1590283603385-17ffb3a7f29f'),
        alt: 'A dark trading screen filled with candlestick charts and price data.',
        caption:
          'Markets priced the hold correctly. The statement’s discussion of data quality was the part that was not anticipated.',
      },
      { type: 'heading', id: 'alternatives', text: 'The alternatives, and their problems' },
      {
        type: 'paragraph',
        text: 'The committee has increased its use of administrative data — payroll records, tax filings, job posting series — which have larger samples and different biases. Payroll data misses self-employment. Job postings measure intention rather than hiring. None substitutes cleanly for a household survey.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Payroll records: large samples, but blind to informal and self-employed work.',
          'Tax data: comprehensive and slow, arriving well after a decision must be made.',
          'Job postings: timely, but a measure of intent that varies with hiring fashion.',
          'Private payroll processors: fast, with coverage skewed toward larger employers.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The practical consequence is a committee that has become more willing to wait. Several members have argued publicly that in a noisier information environment the cost of acting on a misread signal has risen relative to the cost of a delayed response.',
      },
      {
        type: 'paragraph',
        text: 'That is a defensible position and it has a cost of its own, which the statement did not dwell on: waiting is itself a policy choice, and it is not obviously the neutral one.',
      },
    ],
    tags: ['Central banks', 'Monetary policy', 'Labour market', 'Statistics', 'Markets'],
    relatedIds: ['biz-03', 'biz-04', 'world-02'],
  },
  {
    id: 'biz-02',
    slug: 'warehouse-automation-margins',
    title: 'Warehouse automation finally shows up in margins',
    subtitle:
      'A decade of capital spending produced years of disappointing returns. The operators who persisted are now reporting the gains, and explaining what took so long.',
    summary:
      'Distribution operators that invested heavily in automation are reporting improved margins after years of write-downs. The delay is attributed less to the machines than to the process redesign around them.',
    category: 'business',
    authorId: 'a-okonjo',
    publishedAt: ago(1 * DAY + 8 * HOUR),
    readingTime: 8,
    image: img('photo-1486406146926-c627a92ad1ab'),
    imageAlt: 'Glass office towers photographed from street level looking upward against a cloudy sky.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: true,
    inDepth: false,
    kind: 'analysis',
    reads: 20400,
    keyFacts: [
      'Gains appeared three to five years after installation, not in the first year.',
      'Operators cite process redesign, not hardware, as the binding constraint.',
      'Sites that automated without changing layout reported the weakest returns.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The pattern is familiar enough to have a literature. A technology arrives, capital floods in, productivity statistics show nothing for years, commentators declare the technology overhyped, and then the gains appear — concentrated among firms that also changed how they work.',
      },
      {
        type: 'paragraph',
        text: 'Distribution and warehousing appear to be at the stage where the gains appear.',
      },
      { type: 'heading', id: 'the-lag', text: 'Where the lag came from' },
      {
        type: 'paragraph',
        text: 'Operators are consistent about the source of the delay, and it is not machine reliability. It is that an automated system installed into a layout designed for people produces a fast version of an inefficient process.',
      },
      {
        type: 'quote',
        text: 'We spent two years automating the way we already worked. The third year we redesigned the work, and that is the year the numbers moved.',
        attribution: 'An operations director at a distribution group',
      },
      {
        type: 'paragraph',
        text: 'The redesign is expensive, disruptive and difficult to justify separately, since it delivers nothing without the equipment already installed. Firms that ran out of patience — or capital — before reaching it wrote down the investment and concluded the technology did not work.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Install equipment into the existing process; see modest gains and high maintenance.',
          'Discover that throughput is limited by upstream and downstream steps.',
          'Redesign the surrounding process, at considerable cost and disruption.',
          'Realise the gains, three to five years after the first invoice.',
        ],
      },
      { type: 'heading', id: 'labour', text: 'What happened to the workforce' },
      {
        type: 'paragraph',
        text: 'Headcount at automated sites fell, but less than early projections suggested and in a different shape. Picking roles reduced sharply. Maintenance, exception handling and systems roles grew, and they are paid more and harder to fill.',
      },
      {
        type: 'paragraph',
        text: 'Several operators described recruitment for technical roles as their current binding constraint — a problem the vocational pathways now filling up may eventually address, on a timescale that does not help them this year.',
      },
    ],
    tags: ['Automation', 'Logistics', 'Productivity', 'Capital', 'Labour'],
    relatedIds: ['ai-04', 'world-01', 'edu-04'],
  },
  {
    id: 'biz-03',
    slug: 'small-cap-listings-return',
    title: 'Small-cap listings return, on stricter terms',
    subtitle:
      'Smaller companies are going public again after a long drought, with governance requirements that would have been considered onerous a decade ago.',
    summary:
      'Listings by smaller companies have picked up for three consecutive quarters. Underwriters attribute it to a narrower, more disciplined pipeline rather than to a broad reopening.',
    category: 'business',
    authorId: 'a-okonjo',
    publishedAt: ago(2 * DAY + 5 * HOUR),
    readingTime: 6,
    image: img('photo-1554224155-6726b3ff858f'),
    imageAlt: 'A desk with financial paperwork, a calculator, a pen and a mobile phone viewed from above.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: true,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 18200,
    body: [
      {
        type: 'paragraph',
        text: 'The market for smaller listings has been effectively closed for long enough that a generation of finance directors has never taken a company public. It is reopening, narrowly, and the terms are noticeably different from the last cycle.',
      },
      { type: 'heading', id: 'terms', text: 'What changed in the terms' },
      {
        type: 'paragraph',
        text: 'Companies coming to market are arriving with independent board majorities, audited multi-year records and, in most cases, positive operating cash flow. Underwriters describe these not as regulatory requirements but as the conditions institutional buyers now impose before participating at all.',
      },
      {
        type: 'quote',
        text: 'Nobody wrote a new rule. The buyers simply stopped showing up for anything that did not look like this.',
        attribution: 'An equity capital markets banker',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Independent board majority at listing, not promised within a transition period.',
          'Three years of audited accounts on a consistent basis.',
          'Lock-up terms extending beyond the traditional six months for founders.',
          'Narrower use-of-proceeds language, with fewer general corporate purposes.',
        ],
      },
      { type: 'heading', id: 'pipeline', text: 'A narrower pipeline' },
      {
        type: 'paragraph',
        text: 'The volume recovery is real but concentrated. Bankers describe a pipeline that is smaller than in the last reopening and heavily weighted toward businesses with established revenue — industrial suppliers, specialist software firms with long contracts, healthcare services.',
      },
      {
        type: 'paragraph',
        text: 'Companies without those characteristics are staying private longer, which is a durable structural change rather than a cyclical one, and it has consequences for who gets to own growth. That question is being debated more seriously than the listing statistics themselves.',
      },
    ],
    tags: ['Markets', 'Listings', 'Governance', 'Capital', 'Companies'],
    relatedIds: ['biz-01', 'biz-04', 'tech-03'],
  },
  {
    id: 'biz-04',
    slug: 'pension-funds-infrastructure-shift',
    title: 'Pension funds are buying infrastructure. They should be clearer about the risk.',
    subtitle:
      'The asset class fits the liability profile well. The governance arrangements around it have not kept pace with the size of the allocation.',
    summary:
      'Long-duration infrastructure assets suit pension liabilities, which is why allocations have grown. The reporting and valuation practices around them deserve more scrutiny than they receive.',
    category: 'business',
    authorId: 'a-okonjo',
    publishedAt: ago(5 * DAY + 7 * HOUR),
    readingTime: 7,
    image: img('photo-1567427017947-545c5f8d16ad'),
    imageAlt: 'A glass jar tipped on its side with coins spilling out across a white surface.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'opinion',
    reads: 16900,
    body: [
      {
        type: 'paragraph',
        text: 'The case for pension funds owning infrastructure is genuinely strong, and this column is not an argument against it. A fund with obligations stretching forty years is well matched to an asset producing inflation-linked cash flows over a similar horizon. That is a better fit than most things on a pension balance sheet.',
      },
      {
        type: 'paragraph',
        text: 'The concern is narrower, and it is about how these holdings are valued and reported to the people whose retirements depend on them.',
      },
      { type: 'heading', id: 'valuation', text: 'Valuation without a market' },
      {
        type: 'paragraph',
        text: 'Infrastructure assets trade rarely. Valuation therefore rests on models — discounted cash flows built on assumptions about usage, regulation and discount rates. The assumptions are usually reasonable. They are also chosen, and they are chosen by parties with an interest in the outcome.',
      },
      {
        type: 'quote',
        text: 'An asset that is marked by a model is an asset that reports the volatility its owner selects.',
        attribution: 'A former pension trustee',
      },
      {
        type: 'paragraph',
        text: 'The consequence is that infrastructure allocations report smooth returns, and smoothness is read by many trustees as low risk. It is not the same thing. A holding that does not reprice is not a holding that cannot lose value; it is one whose losses appear late and all at once.',
      },
      { type: 'heading', id: 'what-to-ask', text: 'Three questions trustees should be asking' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Who selects the valuation assumptions, and are they independent of the manager earning fees on the valuation?',
          'What discount rate is applied, and how has it moved relative to government bond yields since acquisition?',
          'What would a forced sale realise, and how long would it take?',
        ],
      },
      {
        type: 'paragraph',
        text: 'None of these are exotic. All three are answerable. In reviewing published trustee materials, I found the third addressed clearly in a minority of cases.',
      },
      {
        type: 'paragraph',
        text: 'The allocation is sound. The disclosure around it lags the size it has grown to, and closing that gap is a governance task, not an investment one. It would be better to do it now than after a repricing makes it urgent.',
      },
    ],
    tags: ['Pensions', 'Infrastructure', 'Valuation', 'Governance', 'Opinion'],
    relatedIds: ['biz-01', 'biz-03', 'env-01'],
  },
];
