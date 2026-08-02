import type { Metadata } from 'next';
import { site } from '@/data/site';
import type { Category, ResolvedArticle } from '@/lib/types';

/**
 * Metadata and structured-data builders.
 *
 * `site.url` is the single place to set the production origin; canonical URLs,
 * Open Graph tags, the sitemap and every JSON-LD block read from it.
 */

export function absoluteUrl(path = '/'): string {
  return new URL(path, site.url).toString();
}

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

/** Build a complete Metadata object, including Open Graph and Twitter cards. */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  noIndex = false,
}: PageMetaOptions): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image, width: 1800, height: 1200, alt: title }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images,
      ...(type === 'article'
        ? { publishedTime, modifiedTime, authors, section, tags }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

// ------------------------------------------------------------------ //
// JSON-LD
// ------------------------------------------------------------------ //

export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: site.name,
    url: site.url,
    description: site.description,
    foundingDate: String(site.founded),
    email: site.email,
    sameAs: site.social.map((entry) => entry.href),
    publishingPrinciples: absoluteUrl('/about#standards'),
    diversityPolicy: absoluteUrl('/about#standards'),
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    inLanguage: 'fa-IR',
    name: site.name,
    url: site.url,
    description: site.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl('/search')}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function articleJsonLd(article: ResolvedArticle): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    inLanguage: 'fa-IR',
    headline: article.title,
    description: article.summary,
    image: [article.image],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    articleSection: article.categoryRef.name,
    keywords: article.tags.join(', '),
    wordCount: article.body.reduce(
      (total, block) => (block.type === 'paragraph' ? total + block.text.split(/\s+/).length : total),
      0,
    ),
    // Publication-authored: the stories are produced by the newsroom's own
    // automation, so the author is the organisation itself. Naming a Person
    // here would assert that an individual wrote copy they did not.
    author: {
      '@type': 'NewsMediaOrganization',
      name: site.name,
      url: site.url,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/article/${article.slug}`),
    },
    isAccessibleForFree: true,
  };
}

export function breadcrumbJsonLd(
  trail: ReadonlyArray<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

export function collectionJsonLd(
  category: Category,
  articles: ResolvedArticle[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    inLanguage: 'fa-IR',
    name: `${category.name} — ${site.name}`,
    description: category.description,
    url: absoluteUrl(`/category/${category.slug}`),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.slice(0, 10).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(`/article/${article.slug}`),
        name: article.title,
      })),
    },
  };
}

/** Renders a JSON-LD payload as a script tag. */
export function jsonLdProps(data: Record<string, unknown>) {
  return {
    type: 'application/ld+json' as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}
