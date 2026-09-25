import { SocialLinks } from '@/components/ui/SocialLinks';
import { activeSocial } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * A single line and the social icons (Instagram large, with its handle), at the end of the article body below the
 * source line.
 *
 * Renders only for channels that have a URL in `site.social`, and nothing at
 * all when none do — so the publisher adds Telegram or WhatsApp later by
 * filling in one string on GitHub, with no developer involved and no empty
 * heading in the meantime.
 *
 * ⚠️ Links, never embeds. An embedded feed sets third-party cookies as soon as
 * the page loads, before the reader has chosen anything; plain links set none.
 * The only cookies on this site are Google Analytics', set only after «قبول»
 * in the consent banner — see site.analytics and /privacy/.
 */
export function FollowRow({ className }: { className?: string }) {
  if (activeSocial.length === 0) return null;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-5',
        className,
      )}
    >
      <p className="text-base text-ink">
        خبرهای کاربردی بریتانیا را هر روز در Instagram دنبال کنید.
      </p>
      <SocialLinks prominent className="-ms-3" />
    </div>
  );
}
