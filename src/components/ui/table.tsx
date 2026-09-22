import type { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/**
 * Table primitives for dense, structured information.
 *
 * Tables are preferred over cards wherever rows are comparable: architects
 * scan columns, and a grid of cards makes that harder, not easier.
 */
export function Table({
  children,
  className,
  caption,
}: {
  children: ReactNode;
  className?: string;
  /** Describes the table for assistive technology. */
  caption?: string;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn('w-full border-collapse text-sm', className)}>
        {caption ? (
          <caption className="sr-only">{caption}</caption>
        ) : null}
        {children}
      </table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="border-b border-border-default">{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return (
    <tbody className="divide-y divide-border-subtle">{children}</tbody>
  );
}

export function Tr({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <tr
      className={cn(
        interactive && 'transition-colors hover:bg-surface-muted',
        className,
      )}
    >
      {children}
    </tr>
  );
}

interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'right' | 'center';
}

export function Th({ children, className, align = 'left', ...props }: ThProps) {
  return (
    <th
      scope="col"
      className={cn(
        'px-3 py-2.5 text-2xs font-semibold tracking-wide text-ink-muted uppercase',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'right' | 'center';
}

export function Td({ children, className, align = 'left', ...props }: TdProps) {
  return (
    <td
      className={cn(
        'px-3 py-3 align-middle text-ink-secondary',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className,
      )}
      {...props}
    >
      {children}
    </td>
  );
}
