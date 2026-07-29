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

const STORAGE_KEY = 'ukmagazine:bookmarks';

interface BookmarksContextValue {
  /** Article ids the reader has saved. */
  ids: string[];
  /** False until localStorage has been read, so the UI can avoid flicker. */
  hydrated: boolean;
  isBookmarked: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

/**
 * Saved-stories state, persisted to localStorage.
 *
 * The initial render is always empty so server and client markup agree; the
 * stored list is loaded in an effect and `hydrated` flips to true afterwards.
 */
export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(read());
    setHydrated(true);
  }, []);

  // Persist after hydration only, so we never overwrite storage with the
  // empty initial state.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Storage unavailable (private mode, quota). Bookmarks stay in memory.
    }
  }, [ids, hydrated]);

  // Keep multiple open tabs consistent.
  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) setIds(read());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [id, ...current],
    );
  }, []);

  const remove = useCallback((id: string) => {
    setIds((current) => current.filter((entry) => entry !== id));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo<BookmarksContextValue>(
    () => ({
      ids,
      hydrated,
      isBookmarked: (id: string) => ids.includes(id),
      toggle,
      remove,
      clear,
    }),
    [ids, hydrated, toggle, remove, clear],
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks(): BookmarksContextValue {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used inside <BookmarksProvider>');
  }
  return context;
}
