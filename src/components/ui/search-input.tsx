import { useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { SearchIcon } from './icons';

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  /** Shows the label above the field rather than only to screen readers. */
  showLabel?: boolean;
  containerClassName?: string;
}

export function SearchInput({
  label,
  showLabel = false,
  className,
  containerClassName,
  ...props
}: SearchInputProps) {
  const id = useId();
  return (
    <div className={cn('w-full', containerClassName)}>
      <label
        htmlFor={id}
        className={cn(
          showLabel
            ? 'mb-1 block text-[0.8125rem] font-medium text-ink-secondary'
            : 'sr-only',
        )}
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-ink-faint">
          <SearchIcon size={15} />
        </span>
        <input
          id={id}
          type="search"
          className={cn(
            'h-9 w-full rounded-md border border-border-default bg-surface pl-8 pr-3 text-sm text-ink placeholder:text-ink-faint',
            'transition-colors hover:border-border-strong focus:border-accent-400',
            '[&::-webkit-search-cancel-button]:appearance-none',
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}
