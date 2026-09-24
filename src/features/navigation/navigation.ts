import type { ComponentType, SVGProps } from 'react';
import {
  ArchitectureIcon,
  AssessmentIcon,
  CalendarIcon,
  DecisionsIcon,
  HomeIcon,
  ProfilesIcon,
  ReviewsIcon,
  SettingsIcon,
} from '@/components/ui/icons';

export interface NavItem {
  id: string;
  label: string;
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  /** Shown in the collapsed navigation tooltip and in search later. */
  description: string;
  /** Matches the route exactly rather than by prefix. */
  end?: boolean;
}

/**
 * Primary navigation.
 *
 * Kept to eight destinations on purpose. Future modules — Portfolio
 * Intelligence, Architecture Memory — are deliberately absent: they arrive
 * as their own surfaces once the core is settled, rather than crowding the
 * navigation before they exist.
 */
export const PRIMARY_NAVIGATION: readonly NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    to: '/',
    icon: HomeIcon,
    description: 'What needs your attention',
    end: true,
  },
  {
    id: 'architectures',
    label: 'Architectures',
    to: '/architectures',
    icon: ArchitectureIcon,
    description: 'Everything under assurance',
  },
  {
    id: 'assessments',
    label: 'Assessments',
    to: '/assessments',
    icon: AssessmentIcon,
    description: 'Readiness and findings',
  },
  {
    id: 'reviews',
    label: 'Reviews',
    to: '/reviews',
    icon: ReviewsIcon,
    description: 'Board sessions and pre-reads',
  },
  {
    id: 'arb-calendar',
    label: 'ARB Calendar',
    to: '/arb-calendar',
    icon: CalendarIcon,
    description: 'Board schedule and capacity',
  },
  {
    id: 'decisions',
    label: 'Decisions',
    to: '/decisions',
    icon: DecisionsIcon,
    description: 'Recorded outcomes and conditions',
  },
  {
    id: 'assurance-profiles',
    label: 'Assurance Profiles',
    to: '/assurance-profiles',
    icon: ProfilesIcon,
    description: 'What architectures are assessed against',
  },
];

/** Sits apart from the primary destinations, at the foot of the navigation. */
export const SECONDARY_NAVIGATION: readonly NavItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    to: '/settings',
    icon: SettingsIcon,
    description: 'Workspace and appearance',
  },
];

export const ALL_NAVIGATION: readonly NavItem[] = [
  ...PRIMARY_NAVIGATION,
  ...SECONDARY_NAVIGATION,
];

/** Finds the navigation item a pathname belongs to, for breadcrumb roots. */
export function findNavItem(pathname: string): NavItem | undefined {
  if (pathname === '/') {
    return ALL_NAVIGATION.find((item) => item.to === '/');
  }
  return ALL_NAVIGATION.filter((item) => item.to !== '/').find(
    (item) => pathname === item.to || pathname.startsWith(`${item.to}/`),
  );
}
