import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * A titled block within a page.
 *
 * Used instead of a card when the content does not need a surface of its own —
 * which is most of the time.
 */
export function Section({
  title,
  description,
  actions,
  children,
  className,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('mb-8', className)}>
      {title || actions ? (
        <div className="mb-3 flex items-end justify-between gap-4">
          <div className="min-w-0">
            {title ? (
              <h2 className="text-sm font-semibold text-ink">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-0.5 text-[0.8125rem] text-ink-muted">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
