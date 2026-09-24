import { useServices } from '@/app/providers';
import { ModulePlaceholder } from '@/components/module-placeholder';
import { PageHeader } from '@/components/ui';
import { useAsync } from '@/lib/use-async';
import { useDocumentTitle } from '@/lib/use-document-title';
import { PlaceholderMetrics } from './placeholder-metrics';

export function ReviewsPage() {
  useDocumentTitle('Reviews');
  const { reviews } = useServices();

  const { data, isLoading } = useAsync(() => reviews.listSummaries(), [reviews]);
  const items = data?.items ?? [];

  return (
    <>
      <PageHeader
        title="Reviews"
        description="Review board sessions, who is expected, and how far the pre-reads have progressed."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Reviews' }]}
      />

      <ModulePlaceholder
        summary="The sessions themselves: membership, pre-read progress and the decision being sought."
        capabilities={[
          {
            title: 'Session list',
            description:
              'Sessions grouped by status, with the architecture, readiness and whether a decision is required.',
          },
          {
            title: 'Membership and representation',
            description:
              'Required roles against member availability, so a session short of a role is visible early.',
          },
          {
            title: 'Pre-read workspace',
            description:
              'A reviewer works through the findings for their domain and records a view before the session.',
          },
          {
            title: 'Session record',
            description:
              'What was discussed, what was tabled, and the decision recorded at the end of it.',
          },
        ]}
        aside={
          <PlaceholderMetrics
            title="Review pipeline"
            isLoading={isLoading}
            metrics={[
              { label: 'Sessions', value: data?.total ?? 0 },
              {
                label: 'Awaiting review',
                value: items.filter(
                  (item) => item.review.status === 'awaiting-review',
                ).length,
              },
              {
                label: 'In review',
                value: items.filter((item) => item.review.status === 'in-review')
                  .length,
              },
              {
                label: 'Missing a required role',
                value: items.filter(
                  (item) => item.unrepresentedRoles.length > 0,
                ).length,
              },
            ]}
          />
        }
      />
    </>
  );
}
