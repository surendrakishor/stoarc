import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { AppShell } from '@/components/layout';
import {
  ArbCalendarPage,
  ArchitecturesPage,
  AssessmentsPage,
  AssuranceProfilesPage,
  DecisionsPage,
  DetailPlaceholderPage,
  HomePage,
  NotFoundPage,
  ReviewsPage,
  SettingsPage,
} from '@/pages';
import { RouteErrorBoundary } from './error-boundary';

/**
 * Application routes.
 *
 * Every primary navigation destination has a route, and the detail routes the
 * overview surfaces link to exist as placeholders, so no link in the shell is
 * a dead end.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'architectures', element: <ArchitecturesPage /> },
      {
        path: 'architectures/:architectureId',
        element: (
          <DetailPlaceholderPage
            title="Architecture"
            parentLabel="Architectures"
            parentTo="/architectures"
          />
        ),
      },
      { path: 'assessments', element: <AssessmentsPage /> },
      {
        path: 'assessments/:assessmentId',
        element: (
          <DetailPlaceholderPage
            title="Assessment"
            parentLabel="Assessments"
            parentTo="/assessments"
          />
        ),
      },
      { path: 'reviews', element: <ReviewsPage /> },
      {
        path: 'reviews/:reviewId',
        element: (
          <DetailPlaceholderPage
            title="Review session"
            parentLabel="Reviews"
            parentTo="/reviews"
          />
        ),
      },
      { path: 'arb-calendar', element: <ArbCalendarPage /> },
      { path: 'decisions', element: <DecisionsPage /> },
      {
        path: 'decisions/:decisionId',
        element: (
          <DetailPlaceholderPage
            title="Decision"
            parentLabel="Decisions"
            parentTo="/decisions"
          />
        ),
      },
      { path: 'assurance-profiles', element: <AssuranceProfilesPage /> },
      {
        path: 'assurance-profiles/:profileId',
        element: (
          <DetailPlaceholderPage
            title="Assurance profile"
            parentLabel="Assurance Profiles"
            parentTo="/assurance-profiles"
          />
        ),
      },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
