import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/cn';
import { CheckIcon } from './icons';

/**
 * A keyboard-accessible dropdown menu.
 *
 * Implemented in-repo rather than pulled from a headless UI package: the
 * behaviour needed here is narrow, and owning it keeps the dependency surface
 * of an enterprise application small. Supports arrow-key roving focus, Home /
 * End, Escape, type-ahead-free selection and click-outside dismissal.
 */

export interface MenuProps {
  /** Renders the trigger with the aria wiring it needs. */
  renderTrigger: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & {
      ref: (node: HTMLButtonElement | null) => void;
    },
  ) => ReactNode;
  children: ReactNode;
  align?: 'start' | 'end';
  /** Accessible name for the menu surface itself. */
  label: string;
  className?: string;
}

export function Menu({
  renderTrigger,
  children,
  align = 'end',
  label,
  className,
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const close = useCallback(
    (restoreFocus = true) => {
      setOpen(false);
      if (restoreFocus) triggerRef.current?.focus();
    },
    [],
  );

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLElement>(
      '[role^="menuitem"]:not([disabled])',
    );
    first?.focus();
  }, [open]);

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>(
        '[role^="menuitem"]:not([disabled])',
      ) ?? [],
    );
    if (items.length === 0) return;

    const index = items.indexOf(document.activeElement as HTMLElement);
    const focusAt = (next: number) => {
      event.preventDefault();
      items[(next + items.length) % items.length]?.focus();
    };

    switch (event.key) {
      case 'ArrowDown':
        focusAt(index + 1);
        break;
      case 'ArrowUp':
        focusAt(index - 1);
        break;
      case 'Home':
        focusAt(0);
        break;
      case 'End':
        focusAt(items.length - 1);
        break;
      case 'Tab':
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {renderTrigger({
        ref: (node) => {
          triggerRef.current = node;
        },
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        'aria-controls': open ? menuId : undefined,
        onClick: () => setOpen((value) => !value),
        onKeyDown: (event) => {
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            if (!open) {
              event.preventDefault();
              setOpen(true);
            }
          }
        },
      })}

      {open ? (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          onClick={(event) => {
            // Selecting an item closes the menu; the item's own handler has
            // already run by the time this bubbles.
            const target = event.target as HTMLElement;
            if (target.closest('[role^="menuitem"]')) close();
          }}
          className={cn(
            'absolute z-50 mt-1.5 min-w-60 overflow-hidden rounded-lg border border-border-default bg-surface-raised p-1 shadow-lg',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function MenuLabel({ children }: { children: ReactNode }) {
  return (
    <p className="px-2.5 pt-2 pb-1 text-2xs font-semibold tracking-wide text-ink-faint uppercase">
      {children}
    </p>
  );
}

export function MenuSeparator() {
  return <div role="separator" className="my-1 h-px bg-border-subtle" />;
}

export function MenuItem({
  children,
  onSelect,
  disabled,
  leadingIcon,
  description,
}: {
  children: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  leadingIcon?: ReactNode;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onSelect}
      className="flex w-full items-start gap-2.5 rounded-md px-2.5 py-2 text-left text-[0.8125rem] text-ink-secondary transition-colors hover:bg-surface-muted hover:text-ink focus-visible:bg-surface-muted disabled:pointer-events-none disabled:opacity-50"
    >
      {leadingIcon ? (
        <span className="mt-0.5 text-ink-muted">{leadingIcon}</span>
      ) : null}
      <span className="min-w-0">
        <span className="block">{children}</span>
        {description ? (
          <span className="mt-0.5 block text-2xs text-ink-muted">
            {description}
          </span>
        ) : null}
      </span>
    </button>
  );
}

export function MenuRadioItem({
  children,
  checked,
  onSelect,
  description,
}: {
  children: ReactNode;
  checked: boolean;
  onSelect: () => void;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={checked}
      onClick={onSelect}
      className={cn(
        'flex w-full items-start gap-2.5 rounded-md px-2.5 py-2 text-left text-[0.8125rem] transition-colors hover:bg-surface-muted focus-visible:bg-surface-muted',
        checked ? 'text-ink' : 'text-ink-secondary',
      )}
    >
      <span className="mt-0.5 w-4 shrink-0 text-accent">
        {checked ? <CheckIcon size={14} /> : null}
      </span>
      <span className="min-w-0">
        <span className={cn('block', checked && 'font-medium')}>{children}</span>
        {description ? (
          <span className="mt-0.5 block text-2xs text-ink-muted">
            {description}
          </span>
        ) : null}
      </span>
    </button>
  );
}
