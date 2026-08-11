/** Join class names, dropping falsy values. Keeps JSX readable. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

/**
 * Whether `pathname` points at `href`, ignoring the trailing slash.
 *
 * `next.config.ts` sets `trailingSlash: true`, so `usePathname()` returns
 * "/category/world/" while call sites naturally write "/category/world". The
 * mismatch is silent: the comparison simply never matches, and the active-desk
 * indicator never appears. Normalise both ends instead of relying on every
 * author to remember.
 */
export function isActivePath(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  const trim = (value: string) => (value.length > 1 ? value.replace(/\/+$/, '') : value);
  return trim(pathname) === trim(href);
}
