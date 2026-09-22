import { appConfig } from '@/app/config/app.config';
import { cn } from '@/lib/cn';

/**
 * The product mark.
 *
 * Takes its text from `appConfig`, so renaming the product is a one-constant
 * change. The glyph is geometric rather than illustrative — this sits next to
 * enterprise navigation, not on a marketing page.
 */
export function BrandMark({
  showWordmark = true,
  className,
}: {
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn('flex min-w-0 items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-accent-contrast"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round">
          <path d="M5 17V9.5L12 5.5l7 4V17" />
          <path d="M9 17v-4.5h6V17" />
        </svg>
      </span>
      {showWordmark ? (
        <span className="min-w-0">
          <span className="block truncate text-[0.9375rem] leading-tight font-semibold tracking-tight text-ink">
            {appConfig.name}
          </span>
          <span className="block truncate text-2xs leading-tight text-ink-faint">
            {appConfig.shortTagline}
          </span>
        </span>
      ) : null}
    </span>
  );
}
