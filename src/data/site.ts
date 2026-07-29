/**
 * Publication-wide configuration.
 *
 * Change the brand name, tagline, canonical URL and footer link groups here —
 * the header wordmark, metadata, structured data and sitemap all read from it.
 */
export const site = {
  name: 'UK MAGAZINE',
  /** Rendered as two weighted halves: bold lead, lighter trail. */
  wordmark: { lead: 'UK', trail: 'MAGAZINE' },
  tagline: 'The world, in focus.',
  description:
    'UK MAGAZINE is an independent international publication covering artificial intelligence, education, technology, politics, world affairs, business, science, culture, health and the environment — reported clearly and without noise.',
  shortDescription: 'Clear, unhurried reporting on the forces reshaping the world.',
  /** Replace with the production origin before deploying. */
  url: 'https://ukmagazine.example.com',
  locale: 'en_GB',
  founded: 2019,
  established: 'Established 2019 · Reporting from 34 countries',
  email: 'newsroom@ukmagazine.example.com',
  social: [
    { label: 'UK MAGAZINE on X', handle: '@ukmagazine', href: 'https://example.com/ukmagazine', icon: 'x' },
    { label: 'UK MAGAZINE on LinkedIn', handle: 'UK MAGAZINE', href: 'https://example.com/ukmagazine', icon: 'linkedin' },
    { label: 'UK MAGAZINE on YouTube', handle: 'UK MAGAZINE', href: 'https://example.com/ukmagazine', icon: 'youtube' },
    { label: 'UK MAGAZINE RSS feed', handle: 'RSS', href: 'https://example.com/ukmagazine', icon: 'rss' },
  ],
  footer: {
    company: [
      { label: 'About UK MAGAZINE', href: '/about' },
      { label: 'Newsroom', href: '/about#newsroom' },
      { label: 'Standards & ethics', href: '/about#standards' },
      { label: 'Careers', href: '/about#careers' },
      { label: 'Contact', href: '/about#contact' },
    ],
    legal: [
      { label: 'Terms of service', href: '/about#terms' },
      { label: 'Privacy policy', href: '/about#privacy' },
      { label: 'Cookie preferences', href: '/about#cookies' },
      { label: 'Corrections', href: '/about#corrections' },
      { label: 'Accessibility', href: '/about#accessibility' },
    ],
  },
} as const;

export type Site = typeof site;
