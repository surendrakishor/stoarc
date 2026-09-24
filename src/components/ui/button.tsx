import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-contrast border border-transparent hover:bg-accent-700 active:bg-accent-800 shadow-xs',
  secondary:
    'bg-surface text-ink border border-border-default hover:bg-surface-muted active:bg-surface-sunken shadow-xs',
  ghost:
    'bg-transparent text-ink-secondary border border-transparent hover:bg-surface-muted hover:text-ink',
  link: 'bg-transparent text-accent border border-transparent underline-offset-4 hover:underline px-0',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[0.8125rem]',
  md: 'h-9 px-3.5 text-sm',
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon rendered before the label. Decorative; the label carries meaning. */
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'secondary',
      size = 'md',
      leadingIcon,
      trailingIcon,
      className,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          BASE,
          VARIANTS[variant],
          variant === 'link' ? 'h-auto' : SIZES[size],
          className,
        )}
        {...props}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </button>
    );
  },
);

export interface LinkButtonProps extends CommonProps {
  to: string;
  'aria-label'?: string;
}

/** A button-shaped router link, for navigation rather than action. */
export function LinkButton({
  to,
  variant = 'secondary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={cn(
        BASE,
        VARIANTS[variant],
        variant === 'link' ? 'h-auto' : SIZES[size],
        className,
      )}
      {...props}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </Link>
  );
}

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: icon-only controls must name themselves. */
  label: string;
  variant?: Exclude<ButtonVariant, 'link'>;
  size?: ButtonSize;
  children: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { label, variant = 'ghost', size = 'md', className, children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        className={cn(
          BASE,
          VARIANTS[variant],
          size === 'sm' ? 'h-8 w-8' : 'h-9 w-9',
          'px-0',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
