import path from 'node:path';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

/**
 * UK MAGAZINE design tokens — luxury editorial plum-and-white system.
 *
 * Editing the brand palette: change the hex values in `theme.extend.colors.brand`
 * and `theme.extend.colors.ink` — every component reads from these tokens, so a
 * single edit re-skins the whole publication.
 */
const config: Config = {
  // Absolute, so class scanning works regardless of the working directory.
  content: [path.join(__dirname, 'src/**/*.{ts,tsx}')],
  theme: {
    extend: {
      screens: {
        // Small-phone breakpoint, so the 320px header can breathe.
        xs: '380px',
      },
      colors: {
        brand: {
          red: '#420B5E',
          deep: '#2A0740',
          wash: '#F5F0F8',
        },
        ink: {
          DEFAULT: '#111111',
          soft: '#6C6C6C',
          strong: '#303030',
          /**
           * The quietest text tier. #8E8E8E read nicer but only reached
           * 3.28:1 on white — below WCAG AA — and it is used for timestamps,
           * counts and placeholders, which are real text.
           */
          faint: '#737373',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#FAFAF8',
          /** Warm-gray page background behind the elevated site canvas. */
          page: '#F5F5F2',
          deep: '#1A1A1A',
          char: '#141414',
        },
        line: {
          DEFAULT: '#E6E6E1',
          strong: '#D5D5CF',
          dark: '#2E2E2E',
        },
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Newsreader', 'Georgia', 'serif'],
        sans: ['var(--font-ui)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        /** Page-level titles (category, About, Newsletter, 404). */
        display: ['clamp(2rem, 1.3rem + 2.2vw, 3rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        /** Homepage lead, sized for the ~520px hero text column. */
        hero: ['clamp(1.875rem, 1.4rem + 1.5vw, 2.5rem)', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        /** Article headline, over a ~768px measure. */
        headline: ['clamp(1.875rem, 1.3rem + 1.9vw, 2.875rem)', { lineHeight: '1.05', letterSpacing: '-0.033em' }],
      },
      maxWidth: {
        frame: '1480px',
        read: '45rem',
      },
      spacing: {
        header: '4.5rem',
        'header-sm': '3.75rem',
      },
      /** Restrained luxury radii — sharp but not brutal. */
      borderRadius: {
        none: '0',
        sm: '5px',
        DEFAULT: '7px',
        md: '9px',
        lg: '14px',
      },
      /** Soft layered shadows: page canvas, editorial cards, floating panels. */
      boxShadow: {
        page: '0 22px 70px rgba(17,17,17,0.08), 0 3px 12px rgba(17,17,17,0.04)',
        card: '0 12px 32px rgba(17,17,17,0.07), 0 2px 7px rgba(17,17,17,0.035)',
        lift: '0 30px 80px rgba(17,17,17,0.12), 0 7px 22px rgba(17,17,17,0.06)',
        header: '0 1px 0 rgba(230,230,225,1), 0 8px 24px -20px rgba(17,17,17,0.35)',
        overlay: '0 30px 80px rgba(17,17,17,0.12), 0 7px 22px rgba(17,17,17,0.06)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        /** Specular highlight sweeping across the brand slash. */
        sheen: {
          '0%': { transform: 'translateX(-160%) skewX(-18deg)' },
          '55%, 100%': { transform: 'translateX(260%) skewX(-18deg)' },
        },
      },
      animation: {
        marquee: 'marquee 48s linear infinite',
        'fade-up': 'fade-up 420ms cubic-bezier(0.22, 1, 0.36, 1) both',
        sheen: 'sheen 3.6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      zIndex: {
        header: '40',
        overlay: '60',
        menu: '70',
        toast: '90',
      },
    },
  },
  plugins: [
    /**
     * `rtl:` / `ltr:` variants. Most mirroring is handled by logical
     * properties (ms/me, ps/pe, start/end, border-s/border-e), but directional
     * icons still need an explicit flip.
     */
    plugin(({ addVariant }) => {
      addVariant('rtl', '[dir="rtl"] &');
      addVariant('ltr', '[dir="ltr"] &');
    }),
  ],
};

export default config;
