import { SocialLinks } from '@/components/ui/SocialLinks';
import { activeSocial } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * A single line and the social icons, at the end of the article body below the
 * source line.
 *
 * Renders only for channels that have a URL in `site.social`, and nothing at
 * all when none do — so the publisher adds Telegram or WhatsApp later by
 * filling in one string on GitHub, with no developer involved and no empty
 * heading in the meantime.
 *
 * ⚠️ Links, never embeds. An embedded feed sets third-party cookies and would
 * immediately require a PECR consent banner; plain links set none. That is why
 * this site has no cookie banner — see /privacy/.
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
      <p className="text-sm text-ink-soft">
        برای دریافت گزارش‌های تازه، ما را دنبال کنید.
      </p>
      <SocialLinks className="-ms-3" />
    </div>
  );
}
