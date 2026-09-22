import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface CardProps {
  children: ReactNode;
  className?: string;
  /** `muted` sits back into the page; `raised` lifts a primary surface. */
  variant?: 'default' | 'muted' | 'raised';
  as?: 'div' | 'section' | 'article' | 'li';
}

/**
 * A bounded surface.
 *
 * Used where content genuinely groups — not as decoration around every block.
 * Dense, structured information belongs in a table instead.
 */
export function Card({
  children,
  className,
  variant = 'default',
  as: Component = 'div',
}: CardProps) {
  return (
    <Component
      className={cn(
        'rounded-lg border border-border-subtle',
        variant === 'muted' && 'bg-surface-muted',
        variant === 'default' && 'bg-surface',
        variant === 'raised' && 'bg-surface-raised shadow-sm',
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function CardHeader({
  title,
  description,
  actions,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 border-b border-border-subtle px-5 py-3.5',
        className,
      )}
    >
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-[0.8125rem] text-ink-muted">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function CardBody({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div className={cn(padded && 'px-5 py-4', className)}>{children}</div>
  );
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 border-t border-border-subtle px-5 py-3',
        className,
      )}
    >
      {children}
    </div>
  );
}
