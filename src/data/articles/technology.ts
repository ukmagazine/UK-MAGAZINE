import type { Article } from '@/lib/types';
import { ago, DAY, HOUR, img } from './_shared';

export const technologyArticles: Article[] = [
  {
    id: 'tech-01',
    slug: 'undersea-cable-redundancy',
    title: 'Three cable faults in a month renew the case for redundant routes',
    subtitle:
      'None of the breaks caused an outage. Together they used up almost all of the spare capacity that made that possible.',
    summary:
      'Undersea cable faults are routine and usually invisible. A cluster of them in a single corridor exposed how thin the margin has become on routes where redundancy was planned decades ago.',
    category: 'technology',
    authorId: 'a-brenner',
    publishedAt: ago(6 * HOUR + 40),
    readingTime: 8,
    image: img('photo-1451187580459-43490279c0fa'),
    imageAlt: 'The curve of the Earth at night from orbit, city lights glowing along the coastlines.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: true,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 29400,
    briefing: {
      whatHappened:
        'Three separate faults in one submarine corridor were repaired without a visible service interruption, but left the route running with almost no spare path.',
      whyItMatters:
        'Redundancy is what turns a cable fault into a non-event. When redundancy is consumed, the next ordinary fault becomes an outage.',
      whatToWatch:
        'Repair-ship availability. There are fewer vessels than corridors, and scheduling is the real constraint.',
      keyTakeaway:
        'The system worked. It worked with less margin than anyone would design for.',
    },
    keyFacts: [
      'Roughly 150–200 submarine cable faults are recorded worldwide each year.',
      'Most are caused by fishing gear and anchors in shallow water, not by deep-sea failure.',
      'A single repair typically takes one to three weeks once a vessel is on site.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'Submarine cables break constantly. Between one hundred and fifty and two hundred faults are recorded worldwide in a normal year, the great majority caused by anchors and fishing gear in shallow water rather than by anything exotic in the deep ocean. Almost none of them are noticed by the people whose traffic they carry, because the traffic simply takes another path.',
      },
      {
        type: 'paragraph',
        text: 'That is the design working as intended. It is also why a cluster of three faults in a single corridor over four weeks drew attention from network operators who spend most of their careers being calm about cable breaks.',
      },
      { type: 'heading', id: 'margin', text: 'The margin, not the fault' },
      {
        type: 'paragraph',
        text: 'No service interruption resulted. Traffic rerouted, latency rose modestly on some paths, and the repairs proceeded on schedule. The concern raised by operators was not about what happened but about what the sequence revealed: by the third fault, the corridor was carrying close to its full load on its remaining paths.',
      },
      {
        type: 'quote',
        text: 'Redundancy is not a property you have. It is a quantity you spend. We spent most of it in a month.',
        attribution: 'A network operations director at a regional carrier',
      },
      {
        type: 'paragraph',
        text: 'Capacity planning on these routes was set when the corridor carried a fraction of today’s traffic and had, proportionally, far more spare path. Demand grew faster than new cable was laid, and the buffer thinned without any single decision to thin it.',
      },
      { type: 'heading', id: 'ships', text: 'The constraint is ships' },
      {
        type: 'paragraph',
        text: 'The practical limit on recovery is not cable or crews but vessels. Specialised repair ships are few, expensive to keep on standby, and shared across large ocean regions under maintenance agreements that predate current traffic levels. A fault in a busy month waits for a ship that is already working another fault.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Repair vessels are contracted regionally, not per cable.',
          'Mobilisation can take days before repair time even begins.',
          'Weather windows govern the schedule as much as vessel availability does.',
          'New cable builds take three to five years from contract to service.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Several operators have begun buying capacity on physically distinct routes rather than relying on protection within a single corridor — a more expensive arrangement that only pays off on the day it is needed. Whether that spreads depends on how many more quiet months like this one occur.',
      },
    ],
    tags: ['Networks', 'Infrastructure', 'Resilience', 'Submarine cables', 'Operations'],
    relatedIds: ['tech-04', 'world-01', 'ai-03'],
  },
  {
    id: 'tech-02',
    slug: 'open-source-maintainer-funding',
    title: 'Who pays the maintainers holding up the software supply chain',
    subtitle:
      'A handful of unpaid volunteers maintain libraries embedded in nearly every commercial product. Several funding models now exist. None of them has solved the problem.',
    summary:
      'Critical open-source libraries are often maintained by one or two people working unpaid. UK MAGAZINE examined four funding models that have been tried at scale, and why each stalls at the same point.',
    category: 'technology',
    authorId: 'a-brenner',
    publishedAt: ago(1 * DAY + 9 * HOUR),
    updatedAt: ago(20 * HOUR),
    readingTime: 14,
    image: img('photo-1439337153520-7082a56a81f4'),
    imageAlt: 'A white domed rotunda photographed from below, its spiral galleries curving into the light.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: true,
    inDepth: true,
    kind: 'report',
    reads: 35700,
    briefing: {
      whatHappened:
        'Funding programmes for critical open-source projects have multiplied, but the share of essential libraries with a paid maintainer has barely moved.',
      whyItMatters:
        'These libraries sit beneath commercial software used by hospitals, banks and governments. Their maintenance is a systemic dependency held by individuals.',
      biggerPicture:
        'The economics resemble other shared infrastructure that markets historically under-provide, and that eventually required a public or collective answer.',
      whatToWatch:
        'Procurement rules that would require buyers to account for the maintenance status of their dependencies.',
      keyTakeaway:
        'Money has arrived. It has not reached the projects that need it, because the projects that need it are the hardest to identify.',
    },
    keyFacts: [
      'Many widely deployed libraries have a single maintainer with commit rights.',
      'Funding tends to flow to projects with visible brands, not to those with the deepest dependency trees.',
      'Maintainer burnout is cited more often than money as the reason projects are abandoned.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The library is four thousand lines long. It parses a date format. It is a dependency of a dependency of most commercial software written in the last decade, which means it runs inside payment systems, hospital scheduling tools and at least two national tax platforms. It is maintained, in evenings, by one person who has never been paid for it.',
      },
      {
        type: 'paragraph',
        text: 'This is not an unusual arrangement. It is close to the median arrangement for the layer of software that everything else is built on, and it has been described as a crisis for long enough that several serious attempts have been made to fix it.',
      },
      { type: 'heading', id: 'models', text: 'Four models, tried at scale' },
      {
        type: 'paragraph',
        text: 'UK MAGAZINE examined the four approaches that have been deployed with meaningful money behind them: corporate foundations, direct sponsorship platforms, commercial support licensing and public funding programmes. Each works for some projects. Each fails at the same juncture.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Foundations — effective for large projects with governance, ill-suited to a single maintainer who wants to keep working alone.',
          'Sponsorship platforms — the money follows visibility, and the most critical libraries are the least visible.',
          'Commercial support — works only where an enterprise buyer wants a support contract, which is rare for a date parser.',
          'Public programmes — well targeted when they run, but funded in cycles that do not match maintenance, which never ends.',
        ],
      },
      {
        type: 'image',
        src: img('photo-1498050108023-c5249f4df085'),
        alt: 'A laptop displaying code on a white desk beside a coffee cup in a bright room.',
        caption: 'The maintenance burden is continuous; most funding arrives in discrete, time-limited grants.',
      },
      { type: 'heading', id: 'visibility', text: 'The visibility trap' },
      {
        type: 'paragraph',
        text: 'The consistent failure mode is that funding is allocated by attention, and criticality is inversely correlated with attention. A framework with a logo and a conference gets sponsors. A parsing library with no website, three hundred million downloads and one maintainer does not, because almost nobody who depends on it knows its name.',
      },
      {
        type: 'quote',
        text: 'If your project is well known enough to be funded, it is usually well known enough to have found other help already.',
        attribution: 'A maintainer of a widely used cryptographic library',
      },
      {
        type: 'paragraph',
        text: 'Several programmes have attempted to correct this by scanning dependency graphs to identify libraries by their position rather than their profile. The scanning works. The follow-through is harder: a maintainer who has spent a decade unpaid and unasked is not always eager to acquire reporting obligations in exchange for a modest grant.',
      },
      { type: 'heading', id: 'burnout', text: 'Money is not the only variable' },
      {
        type: 'paragraph',
        text: 'In interviews with maintainers of projects that were abandoned or handed off, funding was rarely the first reason given. The reasons offered were the volume of low-quality issue reports, demands for support from commercial users who contribute nothing, and the specific exhaustion of being solely responsible for something that cannot be allowed to break.',
      },
      {
        type: 'paragraph',
        text: 'That points toward interventions other than grants — triage assistance, security review, co-maintainer recruitment — which are harder to fund because they are labour rather than transfers.',
      },
      { type: 'heading', id: 'procurement', text: 'The procurement lever' },
      {
        type: 'paragraph',
        text: 'The most promising development is unglamorous. Some large buyers have begun requiring vendors to disclose the maintenance status of significant dependencies as part of a software bill of materials. A vendor who must report that a critical component has one unpaid maintainer acquires a commercial reason to do something about it.',
      },
      {
        type: 'links',
        title: 'Continue reading',
        items: [
          { label: 'Open-weight models are quietly winning enterprise procurement', href: '/article/open-weight-models-enterprise-procurement' },
          { label: 'Passkeys reach consumer banking', href: '/article/passkeys-adoption-consumer-banking' },
          { label: 'Advanced packaging is the bottleneck now', href: '/article/semiconductor-packaging-bottleneck' },
        ],
      },
      {
        type: 'paragraph',
        text: 'It is an indirect mechanism, and it moves slowly. It also runs with the grain of how the money actually flows, which none of the four direct models manage. The date-parsing library still has one maintainer. He has, this year, been asked twice whether he would accept a co-maintainer. He is considering it.',
      },
    ],
    tags: ['Open source', 'Supply chain', 'Security', 'Funding', 'Software'],
    relatedIds: ['tech-03', 'ai-01', 'tech-04'],
  },
  {
    id: 'tech-03',
    slug: 'passkeys-adoption-consumer-banking',
    title: 'Passkeys reach consumer banking, and passwords begin a long retirement',
    subtitle:
      'Adoption is finally moving, driven less by security teams than by the cost of running call centres for password resets.',
    summary:
      'Banks that switched to passkey sign-in report sharp falls in account-takeover attempts and in support calls. The obstacle now is account recovery, which nobody has made simple.',
    category: 'technology',
    authorId: 'a-brenner',
    publishedAt: ago(3 * DAY + 5 * HOUR),
    readingTime: 6,
    image: img('photo-1531297484001-80022131f5a1'),
    imageAlt: 'A partially closed laptop glowing with coloured light in a dark room.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: false,
    editorsPick: false,
    inDepth: false,
    kind: 'report',
    reads: 18900,
    keyFacts: [
      'Phishing-based account takeover falls sharply because there is no shared secret to steal.',
      'Password-reset calls are among the highest-volume contacts at retail banks.',
      'Account recovery remains the weakest link, and is where attackers have moved.',
    ],
    body: [
      {
        type: 'paragraph',
        text: 'The security argument for replacing passwords has been settled for years. The business argument is what finally moved the retail banks, and it came from the call centre.',
      },
      {
        type: 'paragraph',
        text: 'Password resets are among the highest-volume support contacts at consumer banks. Each one costs money, takes minutes and delivers no value to anyone. Institutions that have moved a substantial share of customers to passkey sign-in report those calls falling steeply, alongside the reduction in phishing-based account takeover that security teams had been promising all along.',
      },
      { type: 'heading', id: 'why-it-works', text: 'Why the mechanism helps' },
      {
        type: 'paragraph',
        text: 'A passkey is a key pair bound to a site. The private half never leaves the user’s device, and nothing the user could be tricked into typing is sufficient to sign in elsewhere. That removes the entire category of attack in which a convincing replica of a bank’s login page harvests credentials, because there is no credential to harvest.',
      },
      {
        type: 'quote',
        text: 'We did not make our customers harder to fool. We made being fooled less useful to the person doing it.',
        attribution: 'A fraud prevention lead at a retail bank',
      },
      { type: 'heading', id: 'recovery', text: 'The recovery problem' },
      {
        type: 'paragraph',
        text: 'Attackers have adapted by moving to account recovery. If a customer loses every device holding a passkey, the bank must have a way to restore access — and whatever that way is, it becomes the new target. Several institutions have responded by making recovery deliberately slow, with waiting periods and multiple channels of confirmation.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Synchronised passkeys across a user’s own devices reduce, but do not eliminate, total loss.',
          'In-branch identity verification is secure and unpopular.',
          'Delay periods frustrate legitimate users and deter attackers equally.',
        ],
      },
      {
        type: 'paragraph',
        text: 'No institution contacted for this story described its recovery process as solved. Several described it as the part they expect to redesign twice more. The password, meanwhile, is not gone — it remains as a fallback in most deployments, which means the retirement is real but unhurried.',
      },
    ],
    tags: ['Security', 'Banking', 'Authentication', 'Fraud', 'Consumer'],
    relatedIds: ['tech-02', 'biz-03', 'tech-01'],
  },
  {
    id: 'tech-04',
    slug: 'semiconductor-packaging-bottleneck',
    title: 'Advanced packaging, not lithography, is the bottleneck now',
    subtitle:
      'The industry spent two decades optimising how small a feature can be printed. The current constraint is how many finished dies can be assembled into one part.',
    summary:
      'Capacity for advanced chip packaging is booked out well ahead of demand for the wafers that feed it, moving the industry’s constraint to a step that used to be an afterthought.',
    category: 'technology',
    authorId: 'a-nakamura',
    publishedAt: ago(5 * DAY + 3 * HOUR),
    readingTime: 8,
    image: img('photo-1526628953301-3e589a6a8b74'),
    imageAlt: 'A screen displaying analytics dashboards with line charts and numerical metrics.',
    imageCredit: 'UK MAGAZINE photo illustration',
    featured: false,
    trending: true,
    editorsPick: false,
    inDepth: false,
    kind: 'analysis',
    reads: 24500,
    briefing: {
      whatHappened:
        'Advanced packaging capacity is fully committed further into the future than wafer capacity, inverting the industry’s traditional constraint.',
      whyItMatters:
        'Packaging plants are cheaper and faster to build than fabrication plants, but the specialised equipment inside them has its own long lead times.',
      whatToWatch:
        'Whether new packaging capacity announced this cycle arrives before demand shifts again.',
      keyTakeaway:
        'The scarce step moved downstream, and the industry’s planning models have not fully caught up.',
    },
    body: [
      {
        type: 'paragraph',
        text: 'For most of the industry’s history, the hard question in semiconductors was how small a feature could be reliably printed on silicon. Everything downstream — testing, packaging, assembly into a finished part — was comparatively routine, and planned around the assumption that fabrication would be the constraint.',
      },
      {
        type: 'paragraph',
        text: 'That assumption no longer holds. The step that now determines how many high-end parts reach customers is the one that stacks and connects multiple finished dies into a single package, and its capacity is committed further into the future than the wafer capacity feeding it.',
      },
      { type: 'heading', id: 'why-packaging', text: 'Why packaging became hard' },
      {
        type: 'paragraph',
        text: 'The change follows from design. High-performance parts are increasingly built as several specialised dies joined together rather than one large monolithic die. This improves yield and lets each component be made on the process best suited to it. It also means the assembly step now carries precision requirements that used to belong to fabrication.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Multiple dies must be aligned to tolerances measured in micrometres.',
          'Memory stacked vertically must be bonded without warping the assembly.',
          'A defect at packaging destroys several good dies at once, so the cost of failure rises.',
        ],
      },
      {
        type: 'quote',
        text: 'We used to throw away one bad die. Now a packaging failure throws away six good ones and the memory attached to them.',
        attribution: 'A process engineer at an assembly and test facility',
      },
      { type: 'heading', id: 'the-build-out', text: 'The build-out, and its own lead times' },
      {
        type: 'paragraph',
        text: 'The reassuring part of the picture is that packaging plants are considerably cheaper and quicker to build than leading-edge fabrication plants. The less reassuring part is that the specialised bonding and inspection equipment they require is made by a small number of suppliers with multi-year order books of their own.',
      },
      {
        type: 'paragraph',
        text: 'Capacity announced this cycle will therefore arrive over several years, into a demand picture nobody can forecast confidently. That is the ordinary condition of the industry, and the reason its cycles are as sharp as they are. What is new is only which step everyone is watching.',
      },
    ],
    tags: ['Semiconductors', 'Manufacturing', 'Supply chains', 'Hardware', 'Capacity'],
    relatedIds: ['tech-01', 'ai-03', 'biz-02'],
  },
];
