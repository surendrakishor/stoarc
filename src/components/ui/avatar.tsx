import { cn } from '@/lib/cn';
import { initials } from '@/lib/format';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 'h-6 w-6 text-[0.625rem]',
  md: 'h-8 w-8 text-[0.6875rem]',
  lg: 'h-10 w-10 text-xs',
};

/** Avatar with an initials fallback, which is what most directories give us. */
export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  return src ? (
    <img
      src={src}
      alt=""
      className={cn(
        'shrink-0 rounded-full object-cover',
        SIZES[size],
        className,
      )}
    />
  ) : (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface-muted font-semibold tracking-wide text-ink-secondary',
        SIZES[size],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
