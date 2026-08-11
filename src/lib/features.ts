/**
 * Feature switches read by both server and client components.
 *
 * ⚠️ This module must NOT carry `'use client'`. A plain constant exported from
 * a client module reaches a server component as a client-reference proxy, not
 * as its value — so `if (!FLAG)` is testing an object and is always false. That
 * silently defeated the newsletter switch once already: `/newsletter/` kept
 * exporting its whole marketing page with the forms stripped out of it.
 */

/**
 * The newsletter is switched off, not removed. It is expected back in one to
 * two months, so the form, the card, the route and their styling all stay in
 * the repository and come back together when this flips.
 *
 * It has no backend: the site is a static export and cannot receive a
 * submission. Until this was switched off the form appeared up to four times
 * on a single article page, each one silently discarding whatever a reader
 * typed into it.
 *
 * // Re-enabling this form will connect a third-party provider that sets cookies.
 * // PECR consent will need re-evaluating at that point — see /privacy/.
 */
export const NEWSLETTER_ENABLED = false;
