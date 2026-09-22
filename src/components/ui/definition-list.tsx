import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface DefinitionItem {
  term: string;
  description: ReactNode;
}

/** Label-and-value pairs, for the summary strip on a detail page. */
export function DefinitionList({
  items,
  columns = 3,
  className,
}: {
  items: DefinitionItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        'grid gap-x-6 gap-y-4',
        columns === 2 && 'sm:grid-cols-2',
        columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.term} className="min-w-0">
          <dt className="text-2xs font-semibold tracking-wide text-ink-faint uppercase">
            {item.term}
          </dt>
          <dd className="mt-1 text-[0.8125rem] text-ink-secondary">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
