'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_LOCALE,
  getDictionary,
  getDirection,
  type Dictionary,
  type Locale,
} from '@/i18n/dictionaries';

const STORAGE_KEY = 'ukmagazine:locale';

interface LocaleContextValue {
  locale: Locale;
  /** Translated UI copy for the active language. */
  t: Dictionary;
  dir: 'ltr' | 'rtl';
  isRtl: boolean;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStored(): Locale | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === 'en' || raw === 'fa' ? raw : null;
  } catch {
    return null;
  }
}

/**
 * Language state for the interface.
 *
 * The first render always uses the default locale so the server and client
 * markup match; the stored preference is applied in an effect, which also
 * updates `lang` and `dir` on `<html>` so the browser handles bidirectional
 * text and Tailwind's `rtl:` variants take effect.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readStored();
    if (stored) setLocaleState(stored);
  }, []);

  useEffect(() => {
    const dir = getDirection(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable; the choice still applies for this session.
    }
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    const dir = getDirection(locale);
    return { locale, t: getDictionary(locale), dir, isRtl: dir === 'rtl', setLocale };
  }, [locale, setLocale]);

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
