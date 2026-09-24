import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  /** Accessible name for the group. */
  label: string;
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Hides labels and shows icons only, with the label as the accessible name. */
  iconOnly?: boolean;
  className?: string;
}

/** A small set of mutually exclusive choices, rendered as a radio group. */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  iconOnly = false,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-md border border-border-subtle bg-surface-muted p-0.5',
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={iconOnly ? option.label : undefined}
            title={iconOnly ? option.label : undefined}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-sm text-[0.8125rem] transition-colors',
              iconOnly ? 'h-7 w-7' : 'h-7 px-2.5',
              selected
                ? 'bg-surface text-ink shadow-xs'
                : 'text-ink-muted hover:text-ink-secondary',
            )}
          >
            {option.icon}
            {iconOnly ? null : option.label}
          </button>
        );
      })}
    </div>
  );
}
