import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { EmptyState, LinkButton } from '@/components/ui';
import { appConfig } from '@/app/config/app.config';

/**
 * Last-resort error surface.
 *
 * Says what happened and offers a way back. It does not show a stack trace or
 * an apology: an architect needs to know whether to retry or report it.
 */
export function RouteErrorBoundary() {
  const error = useRouteError();

  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred.';

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-lg rounded-lg border border-border-subtle bg-surface">
        <EmptyState
          title={`${appConfig.name} could not load this page`}
          description={detail}
          action={
            <LinkButton to="/" variant="primary">
              Return home
            </LinkButton>
          }
        />
      </div>
    </div>
  );
}
