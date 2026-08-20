/**
 * Publication-wide configuration.
 *
 * Canonical URLs, Open Graph, sitemap and shared footer metadata read from this
 * single object. Values that have not been supplied by the publisher stay
 * empty/null and the UI omits them instead of inventing placeholder data.
 */
export const site = {
  name: 'UK MAGAZINE',
  wordmark: { lead: 'UK', trail: 'Magazine' },
  tagline: 'زندگی در بریتانیا، به زبان فارسی.',
  description:
    'یو‌کی مگزین نشریهٔ فارسی‌زبان ایرانیان بریتانیاست؛ از زندگی ایرانیان لندن تا خبرها و راهنماهای موردنیاز ایرانیان انگلستان را پوشش می‌دهد.',
  shortDescription:
    'خبرها و راهنماهای فارسی برای ایرانیان بریتانیا؛ از نیازهای روزمرهٔ جامعه در لندن تا زندگی در سراسر انگلستان.',
  url: 'https://theukmag.com',
  locale: 'fa_IR',
  founded: null as number | null,
  established: '',

  features: {
    bookmarks: false,
  },

  /**
   * Contact details. Every place these are shown as text wraps them in `Ltr`
   * — a Latin run inside Persian is reordered by the bidi algorithm otherwise,
   * and a reversed phone number gets dialled wrong.
   */
  email: 'info@theukmag.com',
  phone: '+44 7342 183060',
  instagramHandle: '@uk.mag',

  /**
   * Social channels.
   *
   * Filling in a URL is all that is required to make the icon appear.
   * An empty string renders nothing at all — no icon, no gap, no placeholder.
   *
   * ⚠️ Link to social platforms. Never embed them. An embedded Instagram feed
   * or YouTube player sets third-party cookies, which would immediately
   * require a consent banner under PECR. Plain links set no cookies, and that
   * is why this site needs no cookie banner — see /privacy/.
   */
  social: {
    instagram: 'https://instagram.com/uk.mag',
    telegram: '',
    whatsapp: '',
  },

  /**
   * Provisional contractual hosting credit. Keep the three fields here so the
   * final wording/URL/rel requested by Krystal can be changed in one place.
   */
  hostingCredit: {
    label: 'میزبانی توسط Krystal',
    href: 'https://krystal.io',
    rel: 'noopener',
  },

  footer: {
    company: [
      { label: 'درباره ما', href: '/about/' },
      { label: 'ارتباط با ما', href: '/contact/' },
      { label: 'خدمات ما', href: '/services/' },
    ],
    legal: [
      { label: 'شرایط و مقررات', href: '/terms/' },
      { label: 'حریم خصوصی', href: '/privacy/' },
    ],
  },
} as const;

export type Site = typeof site;

/** The social channels that actually have a URL, in display order. */
export const activeSocial = (
  [
    { key: 'instagram', label: 'اینستاگرام', href: site.social.instagram },
    { key: 'telegram', label: 'تلگرام', href: site.social.telegram },
    { key: 'whatsapp', label: 'واتس‌اپ', href: site.social.whatsapp },
  ] as const
).filter((entry) => entry.href.length > 0);
