import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/status';

const TONES: Record<Tone, string> = {
  neutral:
    'bg-status-neutral-bg text-status-neutral-fg border-status-neutral-border',
  info: 'bg-status-info-bg text-status-info-fg border-status-info-border',
  ready: 'bg-status-ready-bg text-status-ready-fg border-status-ready-border',
  attention:
    'bg-status-attention-bg text-status-attention-fg border-status-attention-border',
  needs:
    'bg-status-needs-bg text-status-needs-fg border-status-needs-border',
  blocked:
    'bg-status-blocked-bg text-status-blocked-fg border-status-blocked-border',
};

export interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  /** Adds a small dot, which helps when many badges sit in one column. */
  withDot?: boolean;
  title?: string;
  className?: string;
}

/** A quiet label. Used for status, type and count, never for emphasis. */
export function Badge({
  children,
  tone = 'neutral',
  withDot = false,
  title,
  className,
}: BadgeProps) {
  return (
    <span
      title={title}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 text-2xs font-medium',
        TONES[tone],
        className,
      )}
    >
      {withDot ? (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70"
        />
      ) : null}
      {children}
    </span>
  );
}
