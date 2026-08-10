import { Instagram } from 'lucide-react';
import type { ComponentType } from 'react';
import { activeSocial } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * Telegram and WhatsApp are brand marks; Lucide carries neither, so they are
 * drawn here in the same 24-unit box as the Lucide icons beside them.
 */
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21.94 4.3 18.63 19.9c-.25 1.1-.9 1.38-1.83.86l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1.02.5l.36-5.14 9.35-8.45c.4-.36-.09-.56-.63-.2L6.81 13.38l-4.98-1.56c-1.08-.34-1.1-1.08.23-1.6l19.47-7.5c.9-.34 1.69.2 1.4 1.58z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.42 5.83c0 4.55-3.71 8.25-8.26 8.25a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.55 3.7-8.25 8.25-8.25zm-3.4 4.4c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.19 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46z" />
    </svg>
  );
}

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
};

interface SocialLinksProps {
  /** Light-on-dark, for the footer. */
  inverted?: boolean;
  className?: string;
}

/**
 * Row of social channel links.
 *
 * Renders only channels with a URL in `site.social`, so the publisher adds
 * Telegram or WhatsApp later by filling in one string on GitHub — no icon, no
 * gap and no placeholder appears for an empty one. If every channel is empty
 * the component renders nothing at all rather than an empty row under a
 * heading.
 */
export function SocialLinks({ inverted = false, className }: SocialLinksProps) {
  if (activeSocial.length === 0) return null;

  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {activeSocial.map((entry) => {
        const Icon = ICONS[entry.key];
        return (
          <li key={entry.key}>
            <a
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${entry.label} — UK Magazine`}
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center transition-colors',
                inverted
                  ? 'text-white/70 hover:text-white'
                  : 'text-ink-soft hover:text-brand-red',
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
