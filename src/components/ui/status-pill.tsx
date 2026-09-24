import { Badge } from './badge';
import type { StatusPresentation } from '@/lib/status';

export interface StatusPillProps {
  status: StatusPresentation;
  withDot?: boolean;
  className?: string;
}

/**
 * Renders one of the platform's status terms.
 *
 * Always driven by a `StatusPresentation` from `lib/status`, so the calm
 * vocabulary stays defined in exactly one place.
 */
export function StatusPill({
  status,
  withDot = true,
  className,
}: StatusPillProps) {
  return (
    <Badge
      tone={status.tone}
      withDot={withDot}
      title={status.description}
      className={className}
    >
      {status.label}
    </Badge>
  );
}
