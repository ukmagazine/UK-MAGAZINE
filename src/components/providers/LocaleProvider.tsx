'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import {
  DEFAULT_LOCALE,
  getDictionary,
  getDirection,
  type Dictionary,
  type Locale,
} from '@/i18n/dictionaries';

interface LocaleContextValue {
  locale: Locale;
  /** Translated UI copy for the active language. */
  t: Dictionary;
  dir: 'ltr' | 'rtl';
  isRtl: boolean;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Language context for the interface.
 *
 * The publication ships in Persian only, so the locale is fixed rather than
 * chosen: `lang` and `dir` are rendered on `<html>` by the server, which means
 * the correct language reaches crawlers and screen readers in the first byte
 * and there is no direction flip after hydration.
 *
 * The English dictionary is still compiled in. Restoring a second language is
 * a matter of lifting `locale` back into state and reinstating a switcher —
 * every consumer already reads its copy through this context.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const value = useMemo<LocaleContextValue>(() => {
    const dir = getDirection(DEFAULT_LOCALE);
    return {
      locale: DEFAULT_LOCALE,
      t: getDictionary(DEFAULT_LOCALE),
      dir,
      isRtl: dir === 'rtl',
    };
  }, []);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used inside <LocaleProvider>');
  }
  return context;
}

/** Shorthand for components that only need the copy. */
export function useT(): Dictionary {
  return useLocale().t;
}
