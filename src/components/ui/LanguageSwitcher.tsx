'use client';

import { Globe } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { locales, type Locale } from '@/i18n/dictionaries';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  /** Light-on-dark, for the footer. */
  inverted?: boolean;
  /**
   * `segmented` shows both languages side by side, `select` is a dropdown, and
   * `toggle` is a single button showing the language you would switch *to* —
   * used in the header, where a two-item control crowds the navigation.
   */
  variant?: 'segmented' | 'select' | 'toggle';
  className?: string;
}

/**
 * Switches the interface language. The choice persists to localStorage and
 * flips `lang`/`dir` on the document, so Persian renders right-to-left.
 */
export function LanguageSwitcher({
  inverted = false,
  variant = 'segmented',
  className,
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLocale();

  if (variant === 'toggle') {
    const next = locales.find((entry) => entry.code !== locale) ?? locales[0];
    return (
      <button
        type="button"
        lang={next.code}
        onClick={() => setLocale(next.code)}
        aria-label={`${t.nav.language}: ${next.label}`}
        className={cn(
          'inline-flex min-h-[40px] items-center rounded-sm border border-line px-2.5 text-xs font-semibold text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink',
          className,
        )}
      >
        {next.label}
      </button>
    );
  }

  if (variant === 'select') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Globe aria-hidden="true" className={cn('h-4 w-4', inverted ? 'text-white/50' : 'text-ink-soft')} />
        <label htmlFor="language-select" className="sr-only">
          {t.nav.language}
        </label>
        <select
          id="language-select"
          value={locale}
          onChange={(event) => setLocale(event.target.value as Locale)}
          className={cn(
            'min-h-[44px] rounded-sm border bg-transparent px-3 text-sm outline-none transition-colors',
            inverted
              ? 'border-line-dark text-white/80 hover:border-white/40 focus:border-brand-red'
              : 'border-line text-ink hover:border-ink focus:border-brand-red',
          )}
        >
          {locales.map((entry) => (
            <option
              key={entry.code}
              value={entry.code}
              className={inverted ? 'bg-surface-char text-white' : 'bg-surface text-ink'}
            >
              {entry.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn(
        'inline-flex items-center rounded-sm border p-0.5',
        inverted ? 'border-line-dark' : 'border-line',
        className,
      )}
    >
      {locales.map((entry) => {
        const active = entry.code === locale;
        return (
          <button
            key={entry.code}
            type="button"
            lang={entry.code}
            onClick={() => setLocale(entry.code)}
            aria-pressed={active}
            className={cn(
              'inline-flex min-h-[36px] items-center rounded-[3px] px-2.5 text-xs font-semibold transition-colors duration-200',
              active
                ? 'bg-brand-red text-white'
                : inverted
                  ? 'text-white/70 hover:text-white'
                  : 'text-ink-soft hover:text-ink',
            )}
          >
            {entry.label}
          </button>
        );
      })}
    </div>
  );
}
