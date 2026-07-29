import type { Category, CategorySlug } from '@/lib/types';

/**
 * The ten desks UK MAGAZINE reports on.
 *
 * To add a desk: append an entry here, set `inPrimaryNav` to control whether it
 * appears in the header, and tag articles with the new slug. Routes, sitemap
 * entries and filters are all generated from this list.
 */
export const categories: Category[] = [
  {
    slug: 'ai',
    name: 'Artificial Intelligence',
    shortName: 'AI',
    nameFa: 'هوش مصنوعی',
    shortNameFa: 'هوش مصنوعی',
    description: 'Model releases, research, regulation and the economics of machine intelligence.',
    standfirst:
      'We cover artificial intelligence as an industry and an institution — what the systems can actually do, who controls them, and what changes when they arrive in ordinary workplaces.',
    tint: '#D3122A',
    topics: ['Research', 'Policy', 'Chips', 'Safety', 'Labour', 'Open source'],
    inPrimaryNav: false,
  },
  {
    slug: 'education',
    name: 'Education',
    shortName: 'Education',
    nameFa: 'آموزش',
    shortNameFa: 'آموزش',
    description: 'Schools, universities, learning technology and the policy that shapes them.',
    standfirst:
      'From primary classrooms to research universities: how education systems are funded, measured and reformed, and what the evidence says about whether it works.',
    tint: '#B4552A',
    topics: ['Schools', 'Universities', 'Ed-tech', 'Funding', 'Assessment', 'Access'],
    inPrimaryNav: false,
  },
  {
    slug: 'technology',
    name: 'Technology',
    shortName: 'Technology',
    nameFa: 'فناوری',
    shortNameFa: 'فناوری',
    description: 'Platforms, semiconductors, security and the infrastructure beneath modern life.',
    standfirst:
      'The systems that carry everything else — networks, chips, software supply chains and the companies that operate them at planetary scale.',
    tint: '#2E5AAC',
    topics: ['Platforms', 'Security', 'Semiconductors', 'Networks', 'Privacy', 'Devices'],
    inPrimaryNav: true,
  },
  {
    slug: 'politics',
    name: 'Politics',
    shortName: 'Politics',
    nameFa: 'سیاست',
    shortNameFa: 'سیاست',
    description: 'Legislatures, elections, courts and the machinery of government.',
    standfirst:
      'Process over posture. We report what was decided, who decided it, what it costs and what happens next — without telling you how to feel about it.',
    tint: '#4A4A52',
    topics: ['Legislation', 'Elections', 'Courts', 'Budgets', 'Regulation', 'Local'],
    inPrimaryNav: true,
  },
  {
    slug: 'world',
    name: 'World',
    shortName: 'World',
    nameFa: 'جهان',
    shortNameFa: 'جهان',
    description: 'Diplomacy, trade, migration and conflict, reported from the ground.',
    standfirst:
      'Correspondents across four continents on the negotiations, borders and supply lines that connect national stories into a single global one.',
    tint: '#1F6F6B',
    topics: ['Diplomacy', 'Trade', 'Migration', 'Security', 'Development', 'Energy'],
    inPrimaryNav: true,
  },
  {
    slug: 'business',
    name: 'Business',
    shortName: 'Business',
    nameFa: 'اقتصاد',
    shortNameFa: 'اقتصاد',
    description: 'Markets, companies, labour and the flow of capital.',
    standfirst:
      'Earnings and indices matter, but so do the decisions behind them. We follow capital from the boardroom to the shop floor.',
    tint: '#1D6B3F',
    topics: ['Markets', 'Companies', 'Labour', 'Startups', 'Supply chains', 'Central banks'],
    inPrimaryNav: true,
  },
  {
    slug: 'science',
    name: 'Science',
    shortName: 'Science',
    nameFa: 'علم',
    shortNameFa: 'علم',
    description: 'Discovery, method and the institutions that fund research.',
    standfirst:
      'Careful reporting on new findings — what a study actually shows, how confident its authors are, and why the result matters beyond the lab.',
    tint: '#5A3E9B',
    topics: ['Space', 'Physics', 'Biology', 'Materials', 'Funding', 'Method'],
    inPrimaryNav: true,
  },
  {
    slug: 'culture',
    name: 'Culture',
    shortName: 'Culture',
    nameFa: 'فرهنگ',
    shortNameFa: 'فرهنگ',
    description: 'Film, music, design, literature and the business of attention.',
    standfirst:
      'What people are making, what they are paying for it, and what those choices say about the moment we are living through.',
    tint: '#A32D6B',
    topics: ['Film', 'Music', 'Design', 'Books', 'Museums', 'Media'],
    inPrimaryNav: true,
  },
  {
    slug: 'health',
    name: 'Health',
    shortName: 'Health',
    nameFa: 'سلامت',
    shortNameFa: 'سلامت',
    description: 'Medicine, public health systems and the economics of care.',
    standfirst:
      'Evidence-led reporting on treatment, prevention and the systems that deliver both — including who they reach and who they miss.',
    tint: '#0F6E8C',
    topics: ['Public health', 'Clinical', 'Systems', 'Mental health', 'Pharma', 'Ageing'],
    inPrimaryNav: false,
  },
  {
    slug: 'environment',
    name: 'Environment',
    shortName: 'Environment',
    nameFa: 'محیط زیست',
    shortNameFa: 'محیط زیست',
    description: 'Climate, energy transition, ecosystems and adaptation.',
    standfirst:
      'The long story told at human scale: what is changing, what is being built in response, and what it costs the communities living through it.',
    tint: '#3F7A34',
    topics: ['Climate', 'Energy', 'Oceans', 'Cities', 'Biodiversity', 'Adaptation'],
    inPrimaryNav: false,
  },
];

const categoryIndex: Record<string, Category> = Object.fromEntries(
  categories.map((category) => [category.slug, category]),
);

export function getCategory(slug: CategorySlug | string): Category | undefined {
  return categoryIndex[slug];
}

/**
 * Order the desks appear in the sticky header. Edit this list to change the
 * navigation — anything omitted stays reachable via "More", the footer and
 * search. Slugs not marked `inPrimaryNav` are ignored.
 */
const NAV_ORDER: CategorySlug[] = [
  'world',
  'politics',
  'business',
  'technology',
  'science',
  'culture',
];

/** Categories rendered in the sticky header, in NAV_ORDER. */
export const primaryNavCategories: Category[] = NAV_ORDER.map((slug) =>
  categories.find((category) => category.slug === slug),
).filter((category): category is Category => Boolean(category?.inPrimaryNav));

export const categorySlugs: CategorySlug[] = categories.map((c) => c.slug);
