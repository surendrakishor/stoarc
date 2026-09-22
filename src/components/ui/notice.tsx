import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/status';
import { InfoIcon } from './icons';

const TONES: Record<Tone, string> = {
  neutral:
    'border-border-default bg-surface-muted text-ink-secondary',
  info: 'border-status-info-border bg-status-info-bg text-status-info-fg',
  ready: 'border-status-ready-border bg-status-ready-bg text-status-ready-fg',
  attention:
    'border-status-attention-border bg-status-attention-bg text-status-attention-fg',
  needs: 'border-status-needs-border bg-status-needs-bg text-status-needs-fg',
  blocked:
    'border-status-blocked-border bg-status-blocked-bg text-status-blocked-fg',
};

/**
 * An inline, non-modal message.
 *
 * One notice at most per screen: the platform explains things where they
 * happen rather than stacking banners.
 */
export function Notice({
  children,
  tone = 'info',
  icon,
  action,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-2.5 rounded-md border px-3.5 py-2.5 text-[0.8125rem]',
        TONES[tone],
        className,
      )}
    >
      <span className="mt-px shrink-0 opacity-80">
        {icon ?? <InfoIcon size={15} />}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
