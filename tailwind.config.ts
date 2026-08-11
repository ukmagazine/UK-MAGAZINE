import path from 'node:path';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

/**
 * UK MAGAZINE design tokens — editorial purple-and-white system.
 *
 * Editing the brand palette: change the hex values in `theme.extend.colors.brand`
 * and `theme.extend.colors.ink` — every component reads from these tokens, so a
 * single edit re-skins the whole publication. Keep globals.css in step; it
 * mirrors the same values for plain CSS.
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
          /**
           * ⚠️ The token name `red` is historical and now inaccurate. It is
           * kept deliberately: renaming it means touching dozens of
           * components for no functional gain.
           *
           * #8E1B9C is sampled from the logo, which predates the site and
           * will not change — the site matches the mark, not the reverse.
           * White text on it measures 7.54:1 (AA and AAA). Black text
           * measures 2.79:1 and fails; never pair them.
           */
          red: '#8E1B9C',
          /** 10.59:1 against white. */
          deep: '#6B1475',
          /** Tint. Gives 6.7:1 with `brand.red` text on it. */
          wash: '#F7EFF9',
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
        /* The upper bounds were tuned for a 1480px canvas and left headlines
           looking undersized once it grew to 1720px. The lower bounds are
           untouched, so nothing changes on a phone. */
        /** Page-level titles (category, About, 404). */
        display: ['clamp(2rem, 1.3rem + 2.2vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        /** Homepage lead. */
        hero: ['clamp(1.875rem, 1.4rem + 1.5vw, 3rem)', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        /** Article headline, over a ~768px measure. */
        headline: ['clamp(1.875rem, 1.3rem + 1.9vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.033em' }],
      },
      maxWidth: {
        /* Must track the canvas width in layout.tsx, or the grid stays narrow
           inside a wider sheet. */
        frame: '1720px',
        /* Reading measure for body copy — deliberately unchanged by the
           canvas widening. */
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
        /**
         * The masthead logo turns once, then rests for two minutes.
         *
         * The whole cycle is 120s and the movement occupies only the first 1%
         * of it — 1.2s of turn, then 118.8s holding still. Doing it this way
         * means no JavaScript at all: no interval, no client component, and
         * nothing for the browser to schedule. The compositor handles a
         * transform-only animation, and browsers throttle it while the tab is
         * in the background.
         *
         * The hold has to end on 360deg, not 0deg. If the last keyframe were
         * 0deg the browser would interpolate back from 360 to 0 across the
         * remaining 99% — a barely-visible reverse creep for two minutes.
         * Ending on 360 and restarting at 0 lands on the same picture, so the
         * loop point is invisible.
         *
         * Timing is set per keyframe because the animation itself is `linear`;
         * a single easing spread over 120s would flatten the turn.
         */
        'logo-turn': {
          '0%': {
            transform: 'perspective(420px) rotateY(0deg) scale(1)',
            animationTimingFunction: 'cubic-bezier(0.45, 0, 0.55, 1)',
          },
          '0.5%': {
            transform: 'perspective(420px) rotateY(180deg) scale(1.06)',
            animationTimingFunction: 'cubic-bezier(0.45, 0, 0.55, 1)',
          },
          '1%, 100%': {
            transform: 'perspective(420px) rotateY(360deg) scale(1)',
          },
        },
      },
      animation: {
        marquee: 'marquee 48s linear infinite',
        'fade-up': 'fade-up 420ms cubic-bezier(0.22, 1, 0.36, 1) both',
        /* Change 120s to change how often the mark turns. */
        'logo-turn': 'logo-turn 120s linear infinite',
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
