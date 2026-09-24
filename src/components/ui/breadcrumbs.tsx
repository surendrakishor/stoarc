import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { ChevronRightIcon } from './icons';

export interface Crumb {
  label: string;
  /** Omitted on the final crumb, which is the current page. */
  to?: string;
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('min-w-0', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-[0.8125rem] text-ink-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li className="min-w-0">
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="rounded-xs transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined} className="text-ink-secondary">
                    {item.label}
                  </span>
                )}
              </li>
              {isLast ? null : (
                <li aria-hidden="true" className="text-ink-faint">
                  <ChevronRightIcon size={13} />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
