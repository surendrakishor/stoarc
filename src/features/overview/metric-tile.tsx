import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { toneFromReadiness, type Tone } from '@/lib/status';
import type { OverviewMetric } from '@/services';

const VALUE_TONE: Record<Tone, string> = {
  neutral: 'text-ink',
  info: 'text-ink',
  ready: 'text-status-ready-fg',
  attention: 'text-status-attention-fg',
  needs: 'text-status-needs-fg',
  blocked: 'text-status-blocked-fg',
};

/**
 * A single headline figure.
 *
 * Deliberately plain: a number, what it counts and why it is there. No
 * sparkline, no delta, no celebration.
 */
export function MetricTile({ metric }: { metric: OverviewMetric }) {
  const tone = toneFromReadiness(metric.tone);

  const content = (
    <>
      <p className="text-[0.8125rem] text-ink-muted">{metric.label}</p>
      <p
        className={cn(
          'mt-1.5 text-2xl font-semibold tracking-tight tabular-nums',
          VALUE_TONE[tone],
        )}
      >
        {metric.value}
      </p>
      {metric.caption ? (
        <p className="mt-1 text-2xs leading-relaxed text-ink-faint">
          {metric.caption}
        </p>
      ) : null}
    </>
  );

  const className =
    'block rounded-lg border border-border-subtle bg-surface px-4 py-3.5 transition-colors';

  return metric.href ? (
    <Link to={metric.href} className={cn(className, 'hover:border-border-strong')}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
