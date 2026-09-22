import { Link } from 'react-router-dom';
import { ArrowRightIcon, EmptyState } from '@/components/ui';
import { cn } from '@/lib/cn';
import { toneFromReadiness, type Tone } from '@/lib/status';
import type { AttentionItem } from '@/services';

const DOT: Record<Tone, string> = {
  neutral: 'bg-status-neutral-fg',
  info: 'bg-status-info-fg',
  ready: 'bg-status-ready-fg',
  attention: 'bg-status-attention-fg',
  needs: 'bg-status-needs-fg',
  blocked: 'bg-status-blocked-fg',
};

/**
 * What the current persona should look at, each line carrying the reason it
 * surfaced. Nothing appears here without a stated cause.
 */
export function AttentionList({ items }: { items: AttentionItem[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="Nothing is waiting on you"
        description="Items appear here when evidence is missing, a condition falls due or a session lacks a required role."
      />
    );
  }

  return (
    <ul className="divide-y divide-border-subtle">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            to={item.href}
            className="group flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-surface-muted"
          >
            <span
              aria-hidden="true"
              className={cn(
                'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                DOT[toneFromReadiness(item.tone)],
              )}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.8125rem] font-medium text-ink">
                {item.title}
              </span>
              <span className="mt-0.5 block text-[0.8125rem] text-ink-muted">
                {item.reason}
              </span>
              {item.context ? (
                <span className="mt-1 block text-2xs text-ink-faint">
                  {item.context}
                </span>
              ) : null}
            </span>
            <ArrowRightIcon
              size={15}
              className="mt-1 shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
