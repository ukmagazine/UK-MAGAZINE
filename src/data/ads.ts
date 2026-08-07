export interface Ad {
  id: string;
  /** Absolute image URL or a path under public/. */
  image: string;
  imageAlt: string;
  /** Destination URL. Paid outbound links are rendered as sponsored. */
  href: string;
  advertiser: string;
  placement: 'homepage' | 'feed' | 'article-end';
  active: boolean;
  /** Optional ISO 8601 display window. */
  startsAt?: string;
  endsAt?: string;
}

/**
 * Advertising is deliberately outside `content/articles/` so it can never be
 * included in NewsArticle JSON-LD, sitemap, search, related stories or category
 * counts. Add records here only after the creative/campaign is approved.
 */
export const ads: readonly Ad[] = [];

export const FEED_AD_INTERVAL = 4;

export function getActiveAd(
  placement: Ad['placement'],
  now = new Date(),
): Ad | undefined {
  const timestamp = now.getTime();

  return ads.find((ad) => {
    if (!ad.active || ad.placement !== placement) return false;

    const starts = ad.startsAt ? Date.parse(ad.startsAt) : Number.NEGATIVE_INFINITY;
    const ends = ad.endsAt ? Date.parse(ad.endsAt) : Number.POSITIVE_INFINITY;
    if (Number.isNaN(starts) || Number.isNaN(ends)) return false;

    return starts <= timestamp && timestamp <= ends;
  });
}
