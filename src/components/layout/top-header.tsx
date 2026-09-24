import { useLocation } from 'react-router-dom';
import {
  IconButton,
  MenuIcon,
  SearchInput,
} from '@/components/ui';
import { findNavItem } from '@/features/navigation';
import { ThemeToggle } from './theme-toggle';
import { UserMenu } from './user-menu';

interface TopHeaderProps {
  onOpenNavigation: () => void;
}

/**
 * The top bar.
 *
 * Holds orientation (where am I) and account controls, and nothing else:
 * page-level actions live in the page header, next to the content they act on.
 */
export function TopHeader({ onOpenNavigation }: TopHeaderProps) {
  const { pathname } = useLocation();
  const current = findNavItem(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle bg-surface/85 backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
        <IconButton
          label="Open navigation"
          className="lg:hidden"
          onClick={onOpenNavigation}
        >
          <MenuIcon size={18} />
        </IconButton>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink lg:hidden">
            {current?.label ?? 'Home'}
          </p>
          <div className="hidden max-w-md lg:block">
            <SearchInput
              label="Search architectures, reviews and decisions"
              placeholder="Search architectures, reviews, decisions…"
              disabled
              title="Search arrives with the detailed screens"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
