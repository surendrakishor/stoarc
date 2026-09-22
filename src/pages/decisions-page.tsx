import { useServices } from '@/app/providers';
import { ModulePlaceholder } from '@/components/module-placeholder';
import { PageHeader } from '@/components/ui';
import { useAsync } from '@/lib/use-async';
import { useDocumentTitle } from '@/lib/use-document-title';
import { PlaceholderMetrics } from './placeholder-metrics';

export function DecisionsPage() {
  useDocumentTitle('Decisions');
  const { decisions } = useServices();

  const { data, isLoading } = useAsync(
    () =>
      Promise.all([
        decisions.listSummaries(),
        decisions.listConditionSummaries(),
      ]),
    [decisions],
  );

  const [decisionPage, conditionPage] = data ?? [];
  const conditions = conditionPage?.items ?? [];

  return (
    <>
      <PageHeader
        title="Decisions"
        description="What the board decided, the rationale it recorded, and the conditions attached to each outcome."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Decisions' }]}
      />

      <ModulePlaceholder
        summary="The decision record, and the conditions that follow from it."
        capabilities={[
          {
            title: 'Decision record',
            description:
              'Outcome, rationale in the board’s own words, who endorsed it and against which version.',
          },
          {
            title: 'Conditions',
            description:
              'Owner, due date and the evidence required, tracked through to met or waived.',
          },
          {
            title: 'Evidence submission',
            description:
              'A condition owner supplies evidence, which a reviewer confirms against what was asked for.',
          },
          {
            title: 'Decision history',
            description:
              'Every decision taken against an architecture, including deferrals and why they happened.',
          },
        ]}
        aside={
          <PlaceholderMetrics
            title="Decision record"
            isLoading={isLoading}
            metrics={[
              { label: 'Decisions recorded', value: decisionPage?.total ?? 0 },
              { label: 'Conditions', value: conditions.length },
              {
                label: 'Open conditions',
                value: conditions.filter(
                  (item) =>
                    item.condition.status !== 'met' &&
                    item.condition.status !== 'waived',
                ).length,
              },
              {
                label: 'Past due',
                value: conditions.filter(
                  (item) => item.condition.status === 'overdue',
                ).length,
              },
            ]}
          />
        }
      />
    </>
  );
}
