import { cn } from '@/lib/cn';
import type { ReadinessStatus } from '@/models';
import { READINESS_STATUS } from '@/lib/status';

const FILL: Record<ReadinessStatus, string> = {
  ready: 'bg-status-ready-fg',
  'ready-with-attention': 'bg-status-attention-fg',
  'needs-attention': 'bg-status-needs-fg',
  blocked: 'bg-status-blocked-fg',
};

export interface ReadinessMeterProps {
  value: number;
  status: ReadinessStatus;
  /** Shows the percentage alongside the bar. */
  showValue?: boolean;
  className?: string;
  label?: string;
}

/**
 * A single readiness figure.
 *
 * A bar rather than a chart: one number, read at a glance, with the status
 * term carrying the meaning. It is not a score and is never shown alone.
 */
export function ReadinessMeter({
  value,
  status,
  showValue = true,
  className,
  label,
}: ReadinessMeterProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `Readiness: ${READINESS_STATUS[status].label}`}
        className="h-1.5 w-full min-w-16 overflow-hidden rounded-full bg-surface-sunken"
      >
        <div
          className={cn('h-full rounded-full', FILL[status])}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showValue ? (
        <span className="w-9 shrink-0 text-right text-[0.8125rem] tabular-nums text-ink-secondary">
          {clamped}%
        </span>
      ) : null}
    </div>
  );
}
