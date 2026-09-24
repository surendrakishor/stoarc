import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CloseIcon, IconButton } from '@/components/ui';
import { useMediaQuery } from '@/lib/use-media-query';
import { cn } from '@/lib/cn';
import { SideNav } from './side-nav';
import { TopHeader } from './top-header';

const COLLAPSED_STORAGE_KEY = 'ui.navigation.collapsed';

function readCollapsed(): boolean {
  try {
    return window.localStorage.getItem(COLLAPSED_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * The application frame: left navigation, top header and the content column.
 *
 * The content column is width-capped so that long-form reading and dense
 * tables both sit within a predictable measure, whatever the display.
 */
export function AppShell() {
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { pathname } = useLocation();

  const toggleCollapsed = useCallback(() => {
    setCollapsed((value) => {
      const next = !value;
      try {
        window.localStorage.setItem(COLLAPSED_STORAGE_KEY, String(next));
      } catch {
        // Persistence is a convenience, not a requirement.
      }
      return next;
    });
  }, []);

  // The drawer is a mobile affordance; a route change or a widened viewport
  // should never leave it hanging open.
  useEffect(() => setDrawerOpen(false), [pathname]);
  useEffect(() => {
    if (isDesktop) setDrawerOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  return (
    <div className="flex min-h-screen bg-canvas">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:border focus:border-border-default focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <aside
        className={cn(
          'sticky top-0 hidden h-screen shrink-0 border-r border-border-subtle lg:block',
          collapsed ? 'w-16' : 'w-62',
        )}
      >
        <SideNav collapsed={collapsed} onToggleCollapsed={toggleCollapsed} />
      </aside>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-surface-inverse/30"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="absolute inset-y-0 left-0 w-68 border-r border-border-subtle shadow-lg"
          >
            <div className="absolute top-3 right-3 z-10">
              <IconButton
                label="Close navigation"
                size="sm"
                onClick={() => setDrawerOpen(false)}
              >
                <CloseIcon size={16} />
              </IconButton>
            </div>
            <SideNav
              collapsed={false}
              onToggleCollapsed={toggleCollapsed}
              onNavigate={() => setDrawerOpen(false)}
              showCollapseControl={false}
            />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader onOpenNavigation={() => setDrawerOpen(true)} />
        <main id="main-content" className="flex-1">
          <div className="content-container py-7">
            <Outlet />
          </div>
        </main>
        <footer className="border-t border-border-subtle">
          <div className="content-container flex flex-wrap items-center justify-between gap-2 py-4 text-2xs text-ink-faint">
            <span>
              AI advises · The platform controls · Humans decide
            </span>
            <span>Evidence before assertion</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
