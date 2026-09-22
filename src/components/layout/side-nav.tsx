import { NavLink } from 'react-router-dom';
import {
  PRIMARY_NAVIGATION,
  SECONDARY_NAVIGATION,
  type NavItem,
} from '@/features/navigation';
import { IconButton, PanelLeftIcon } from '@/components/ui';
import { cn } from '@/lib/cn';
import { BrandMark } from './brand-mark';

interface SideNavProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  /** Called after navigating, so the mobile drawer can close itself. */
  onNavigate?: () => void;
  /** Hides the collapse control in the mobile drawer, where it has no meaning. */
  showCollapseControl?: boolean;
}

function NavItemLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  return (
    <li>
      <NavLink
        to={item.to}
        end={item.end}
        onClick={onNavigate}
        title={collapsed ? `${item.label} — ${item.description}` : undefined}
        className={({ isActive }) =>
          cn(
            'group relative flex items-center gap-2.5 rounded-md text-[0.8125rem] transition-colors',
            collapsed ? 'h-9 w-9 justify-center' : 'h-9 px-2.5',
            isActive
              ? 'bg-accent-50 font-medium text-accent-800'
              : 'text-ink-secondary hover:bg-surface-muted hover:text-ink',
          )
        }
      >
        {({ isActive }) => (
          <>
            <span
              aria-hidden="true"
              className={cn(
                'absolute left-0 h-4 w-0.5 rounded-r-full bg-accent transition-opacity',
                collapsed && '-left-1',
                isActive ? 'opacity-100' : 'opacity-0',
              )}
            />
            <Icon
              size={17}
              className={cn(
                'shrink-0',
                isActive ? 'text-accent-700' : 'text-ink-muted',
              )}
            />
            {collapsed ? null : <span className="truncate">{item.label}</span>}
          </>
        )}
      </NavLink>
    </li>
  );
}

/**
 * Left navigation.
 *
 * Collapses to icons so that dense screens can reclaim the width, and keeps
 * the same order in both states: navigation position is a memory aid.
 */
export function SideNav({
  collapsed,
  onToggleCollapsed,
  onNavigate,
  showCollapseControl = true,
}: SideNavProps) {
  return (
    <div className="flex h-full flex-col bg-surface">
      <div
        className={cn(
          'flex h-14 shrink-0 items-center border-b border-border-subtle',
          collapsed ? 'justify-center px-2' : 'justify-between gap-2 px-3',
        )}
      >
        <BrandMark showWordmark={!collapsed} />
        {showCollapseControl && !collapsed ? (
          <IconButton
            label="Collapse navigation"
            size="sm"
            onClick={onToggleCollapsed}
          >
            <PanelLeftIcon size={16} />
          </IconButton>
        ) : null}
      </div>

      <nav
        aria-label="Primary"
        className={cn('flex-1 overflow-y-auto py-3', collapsed ? 'px-2' : 'px-3')}
      >
        <ul className="space-y-0.5">
          {PRIMARY_NAVIGATION.map((item) => (
            <NavItemLink
              key={item.id}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </nav>

      <div
        className={cn(
          'shrink-0 border-t border-border-subtle py-3',
          collapsed ? 'px-2' : 'px-3',
        )}
      >
        <ul className="space-y-0.5">
          {SECONDARY_NAVIGATION.map((item) => (
            <NavItemLink
              key={item.id}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
        {showCollapseControl && collapsed ? (
          <div className="mt-2 flex justify-center">
            <IconButton
              label="Expand navigation"
              size="sm"
              onClick={onToggleCollapsed}
            >
              <PanelLeftIcon size={16} />
            </IconButton>
          </div>
        ) : null}
      </div>
    </div>
  );
}
