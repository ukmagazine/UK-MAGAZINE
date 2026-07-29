import type { CardAuthor } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AuthorAvatarProps {
  author: CardAuthor;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 'h-8 w-8 text-[0.65rem]',
  md: 'h-11 w-11 text-xs',
  lg: 'h-16 w-16 text-base',
} as const;

/**
 * Typographic monogram avatar.
 *
 * The bylines in this template are fictional, so we deliberately use initials
 * rather than photographs of real people.
 */
export function AuthorAvatar({ author, size = 'md', className }: AuthorAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center border border-line bg-surface-soft font-semibold tracking-[0.08em] text-ink',
        SIZES[size],
        className,
      )}
    >
      <span className="relative">
        {author.initials}
        <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-brand-red" />
      </span>
    </span>
  );
}
