import type { Article } from '@/lib/types';
import { ago, DAY, HOUR, img } from './_shared';

export const politicsArticles: Article[] = [
  {
    id: 'pol-01',
    slug: 'committee-amendment-procurement-bill',
    title: 'A procurement bill survives committee with its transparency clause intact',
    subtitle:
      'Two amendments that would have narrowed the disclosure requirement were withdrawn before the vote. The clause now faces a floor debate.',
    summary:
      'A bill requiring public bodies to publish contract award reasoning cleared committee unchanged. UK MAGAZINE reviewed the amendment texts and the recorded vote.',
    category: 'politics',
    authorId: 'a-marchetti',
    publishedAt: ago(1 * HOUR + 50),
    readingTime: 5,
    image: img('photo-1529107386315-e1a2ed48a620'),
    imageAlt: 'A parliamentary chamber with curved rows of red upholstered benches.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: true,
    editorsPick: false,
    inDepth: false,
    kind: 'breaking',
    reads: 19800,
    briefing: {
      whatHappened:
        'The committee reported the procurement bill without amending its central disclosure clause. Two narrowing amendments were withdrawn before being put.',
      whyItMatters:
        'The clause would require published reasoning for contract awards above a threshold, which does not currently exist in most public bodies.',
      whatToWatch:
        'The floor debate, where a commercial-confidentiality carve-out is expected to be reintroduced.',
      keyTakeaway:
        'The clause survived committee. Committee is usually where clauses like this are removed.',
    },
    keyFacts: [
      'The disclosure threshold in the reported text is unchanged from introduction.',
      'Two amendments narrowing the clause were withdrawn rather than defeated.',
      'The committee reported the bill by nine votes to four.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The clause requires that when a public body awards a contract above a defined value, it must publish not only the award but the reasoning: the criteria applied, the weighting given to each and a summary of how the winning bid scored against them.',
      },
      {
        type: 'paragraph',
        text: 'It entered committee expected to be narrowed. It emerged unchanged, reported by nine votes to four.',
      },
      { type: 'heading', id: 'the-amendments', text: 'The amendments that were not put' },
      {
        type: 'paragraph',
        text: 'Two amendments had been tabled. The first would have restricted publication to contracts above roughly four times the bill’s threshold. The second would have permitted a body to withhold reasoning where a bidder asserted commercial confidentiality, without requiring the body to test the assertion.',
      },
      {
        type: 'paragraph',
        text: 'Both were withdrawn before the vote. Members who had tabled them said in committee that they intended to bring revised versions at the next stage.',
      },
      {
        type: 'quote',
        text: 'We are not opposed to publication. We are opposed to publishing a document that tells a competitor how to price against us next time.',
        attribution: 'A committee member who withdrew one of the amendments',
      },
      { type: 'heading', id: 'what-is-contested', text: 'What is actually contested' },
      {
        type: 'paragraph',
        text: 'Supporters of the clause argue that award criteria and their weightings are published in the tender documents already, so disclosing how they were applied reveals process rather than commercial detail. Opponents argue that scoring narratives inevitably describe a bidder’s proposed method.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Whether a confidentiality claim must be tested by the awarding body or accepted as asserted.',
          'Whether scoring narratives count as commercial information.',
          'Whether the threshold should be fixed in the bill or set by regulation.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The floor debate is scheduled for next month. UK MAGAZINE will publish the amendment texts as they are tabled.',
      },
    ],
    tags: ['Legislation', 'Procurement', 'Transparency', 'Committee', 'Governance'],
    relatedIds: ['pol-02', 'pol-03', 'ai-01'],
  },
  {
    id: 'pol-02',
    slug: 'local-budget-transparency-portals',
    title: 'Cities publish budgets in machine-readable form, and residents start reading them',
    subtitle:
      'The documents were always public. Making them parseable turned out to be the change that mattered.',
    summary:
      'A cluster of municipalities began publishing budget data in structured formats rather than as scanned documents. Engagement rose, and so did the number of questions officials had to answer.',
    category: 'politics',
    authorId: 'a-marchetti',
    publishedAt: ago(2 * DAY + 3 * HOUR),
    readingTime: 7,
    image: img('photo-1487958449943-2429e8be8625'),
    imageAlt: 'An angular white and glass building rising against a pale, overcast sky.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: true,
    inDepth: false,
    kind: 'report',
    reads: 21300,
    keyFacts: [
      'The budgets were already public; the change was format, not access.',
      'Local groups produced comparison tools within weeks of publication.',
      'Officials reported a marked increase in specific, line-level questions.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The budgets had been public for decades. They were published as scanned documents — hundreds of pages, image-based, unsearchable, technically available to anyone with the patience to read them and effectively available to nobody.',
      },
      {
        type: 'paragraph',
        text: 'Several municipalities began publishing the same figures as structured data. Nothing was disclosed that had not been disclosed before. The effect was substantial anyway.',
      },
      { type: 'heading', id: 'what-happened', text: 'What people did with it' },
      {
        type: 'paragraph',
        text: 'Within weeks, local civic groups had built comparison tools: spending per resident by district, year-on-year changes by line, and comparisons between neighbouring municipalities that had adopted the same schema. None of this required special expertise once the data was parseable.',
      },
      {
        type: 'quote',
        text: 'We did not release anything new. We released it in a form where somebody could ask us a hard question about it.',
        attribution: 'A municipal finance officer',
      },
      { type: 'heading', id: 'consequences', text: 'The consequences for officials' },
      {
        type: 'paragraph',
        text: 'Officials interviewed described a shift in the character of public engagement. General complaints about spending were replaced by specific questions about particular lines — why a maintenance budget fell while a consultancy line rose, why two districts with similar populations received different allocations.',
      },
      {
        type: 'paragraph',
        text: 'Most described this as an improvement, with reservations. Specific questions are answerable, and answering them is the job. Several also noted that lines with innocuous explanations now require the explanation to be written down, which takes time that was not budgeted.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'A common schema matters more than a portal — comparability is the value.',
          'Historical data needs converting, or trends cannot be seen.',
          'Publication without explanatory notes generates questions officials must then answer individually.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The municipalities that have gone furthest now publish explanatory notes alongside the data, on the reasoning that answering the predictable questions once is cheaper than answering them forty times.',
      },
    ],
    tags: ['Local government', 'Transparency', 'Budgets', 'Open data', 'Civic'],
    relatedIds: ['pol-01', 'edu-02', 'pol-04'],
  },
  {
    id: 'pol-03',
    slug: 'court-ruling-administrative-deference',
    title: 'Court narrows agency deference, and rulemaking slows',
    subtitle:
      'The immediate effect is not a wave of struck-down rules. It is longer, more heavily documented rulemaking records.',
    summary:
      'A ruling reducing the deference courts give to agency interpretation has changed how agencies write rules — adding months to the process and lengthening the supporting record considerably.',
    category: 'politics',
    authorId: 'a-marchetti',
    publishedAt: ago(4 * DAY + 6 * HOUR),
    readingTime: 8,
    image: img('photo-1555848962-6e79363ec58f'),
    imageAlt: 'An empty legislative chamber with tiered green seating and a central speaker’s desk.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'analysis',
    reads: 17600,
    briefing: {
      whatHappened:
        'Courts are giving less weight to an agency’s own reading of ambiguous statutory language, requiring the agency to justify its interpretation more fully.',
      whyItMatters:
        'Agencies have responded by building longer records before finalising rules, which slows rulemaking whether or not any rule is ultimately challenged.',
      biggerPicture:
        'Similar shifts elsewhere have produced the same pattern: fewer rules, written more defensively, with more of the drafting effort spent anticipating litigation.',
      whatToWatch:
        'Whether legislatures respond by writing more specific statutes, which is the remedy in principle and rare in practice.',
      keyTakeaway:
        'The visible effect is procedural, not substantive — for now.',
    },
    body: [
      {
        type: 'paragraph',
        text: 'The doctrinal change is narrow and its consequences are administrative. Where a statute is ambiguous, courts are giving less weight to the implementing agency’s reading of it, and requiring the agency to show its reasoning rather than rely on its expertise being presumed.',
      },
      {
        type: 'paragraph',
        text: 'The expected consequence was a wave of invalidated rules. That has not happened, at least not yet. What has happened is that rulemaking got slower.',
      },
      { type: 'heading', id: 'the-record', text: 'Building the record' },
      {
        type: 'paragraph',
        text: 'Agencies are responding by documenting more. Where a rule previously rested on a stated interpretation and a summary of comments, drafters now assemble a fuller record: alternatives considered and rejected, the textual basis for each interpretive choice, and responses to objections that were not raised but might be.',
      },
      {
        type: 'quote',
        text: 'We are writing for a reader who has not filed yet and who will be hostile. That reader has always existed. Now we assume the court reads with them.',
        attribution: 'A senior agency lawyer',
      },
      {
        type: 'paragraph',
        text: 'Officials estimate the additional documentation adds several months to a substantial rule. It also lengthens the published record considerably, which has a secondary effect: comment periods on longer documents attract fewer substantive comments from small organisations, which have less capacity to read them.',
      },
      { type: 'heading', id: 'the-remedy', text: 'The remedy nobody uses' },
      {
        type: 'paragraph',
        text: 'The clean answer is for legislatures to write more specific statutes, leaving less to interpret. This is the remedy every commentator identifies and the one least often applied, for reasons that are political rather than technical: ambiguity is frequently how a bill assembles a majority.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Specific statutes require agreement on details that ambiguity allows members to defer.',
          'Detailed drafting takes committee time that is heavily contested.',
          'Statutes written tightly age poorly, and amending them requires the same majority again.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Absent that, the adjustment happens inside agencies, in the length of documents very few people will read. It is an unglamorous form of consequence, and the most common one.',
      },
    ],
    tags: ['Courts', 'Regulation', 'Administrative law', 'Rulemaking', 'Governance'],
    relatedIds: ['pol-01', 'ai-05', 'pol-04'],
  },
  {
    id: 'pol-04',
    slug: 'election-administration-audit-standards',
    title: 'Election administrators converge on a shared audit standard',
    subtitle:
      'The agreement came from the officials who run elections rather than from the legislatures that fund them, and it is more detailed for that reason.',
    summary:
      'A working group of election administrators has published a common post-election audit procedure. It is voluntary, technically specific and already being adopted where no legislation was required.',
    category: 'politics',
    authorId: 'a-rahimi',
    publishedAt: ago(7 * DAY + 4 * HOUR),
    readingTime: 6,
    image: img('photo-1523995462485-3d171b5c8fa9'),
    imageAlt: 'A stack of folded newspapers photographed at close range.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 12900,
    keyFacts: [
      'The standard is voluntary and was written by administrators, not legislators.',
      'It specifies sample sizes tied to margin of victory rather than fixed percentages.',
      'Adoption is fastest where existing rules already permitted the procedure.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'Post-election audits are widely required and inconsistently specified. Some jurisdictions check a fixed percentage of ballots, which is either wasteful or inadequate depending on how close the contest was. Some check a fixed number. Some leave the method to the administrator.',
      },
      {
        type: 'paragraph',
        text: 'A working group of election administrators has published a common procedure, and it is notable mostly for having been written by people who run elections rather than by people who legislate about them.',
      },
      { type: 'heading', id: 'the-method', text: 'Sampling tied to margin' },
      {
        type: 'paragraph',
        text: 'The central provision replaces fixed sampling with sampling scaled to the margin of victory. A contest decided by a wide margin requires a small sample to confirm the outcome with high confidence. A close contest requires a large one, sometimes approaching a full count.',
      },
      {
        type: 'quote',
        text: 'A fixed three per cent tells you almost nothing in a race decided by two hundred votes, and it wastes a week in a race decided by forty thousand.',
        attribution: 'A county election administrator involved in drafting',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Sample size derived from margin and ballot count, published as a formula.',
          'Escalation rules specifying when a sample expands to a full count.',
          'Documentation requirements for chain of custody during the audit itself.',
          'A standard report format so results from different jurisdictions are comparable.',
        ],
      },
      { type: 'heading', id: 'adoption', text: 'Where it is being adopted' },
      {
        type: 'paragraph',
        text: 'Adoption is fastest in jurisdictions whose existing rules set an audit requirement without prescribing a method — there, an administrator can adopt the standard as internal procedure without waiting for legislation. Where a fixed percentage is written into statute, adoption requires an amendment, and the timelines lengthen accordingly.',
      },
      {
        type: 'paragraph',
        text: 'The working group has said it will publish adoption data annually. Its members have been careful to describe the document as a floor rather than a ceiling, and to note that no audit procedure substitutes for the record-keeping that makes an audit possible in the first place.',
      },
    ],
    tags: ['Elections', 'Audit', 'Administration', 'Standards', 'Governance'],
    relatedIds: ['pol-02', 'pol-03', 'pol-01'],
  },
];
