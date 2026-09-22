import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Breadcrumbs, type Crumb } from './breadcrumbs';

export interface PageHeaderProps {
  title: string;
  /** One or two sentences of orientation. Not marketing copy. */
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  /** Contextual actions for this page, right-aligned on wide viewports. */
  actions?: ReactNode;
  /** Status pills or counts shown beside the title. */
  meta?: ReactNode;
  className?: string;
}

/**
 * The standard page opening: breadcrumb, title, description and the actions
 * that belong to this page. Every route uses it, so the eye lands in the same
 * place on every screen.
 */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  meta,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('mb-6', className)}>
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <Breadcrumbs items={breadcrumbs} className="mb-2.5" />
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h1 className="text-xl font-semibold tracking-tight text-ink">
              {title}
            </h1>
            {meta}
          </div>
          {description ? (
            <p className="mt-1.5 max-w-3xl text-[0.8125rem] leading-relaxed text-ink-muted">
              {description}
            </p>
          ) : null}
        </div>

        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}
