import { useServices } from '@/app/providers';
import { ModulePlaceholder } from '@/components/module-placeholder';
import { PageHeader } from '@/components/ui';
import { useAsync } from '@/lib/use-async';
import { useDocumentTitle } from '@/lib/use-document-title';
import { PlaceholderMetrics } from './placeholder-metrics';

export function AssessmentsPage() {
  useDocumentTitle('Assessments');
  const { assessments } = useServices();

  const { data, isLoading } = useAsync(
    () => assessments.listSummaries(),
    [assessments],
  );

  const items = data?.items ?? [];
  const countByStatus = (status: string) =>
    items.filter((item) => item.assessment.readinessStatus === status).length;

  return (
    <>
      <PageHeader
        title="Assessments"
        description="Readiness against an assurance profile, and the findings behind it. Every finding cites the artefact it came from."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Assessments' }]}
      />

      <ModulePlaceholder
        summary="Readiness per architecture version, the findings beneath it and the evidence behind each finding."
        capabilities={[
          {
            title: 'Readiness by domain',
            description:
              'Per-domain readiness with the controls satisfied out of those assessed — not a score.',
          },
          {
            title: 'Findings',
            description:
              'Each finding states what it is, why it matters to the decision, and the confidence behind it.',
          },
          {
            title: 'Evidence',
            description:
              'Verbatim excerpts with artefact, section and location, so any assertion can be checked at source.',
          },
          {
            title: 'Disposition',
            description:
              'A person records whether a finding is accepted, mitigated, risk-accepted or disputed, and why.',
          },
        ]}
        aside={
          <PlaceholderMetrics
            title="Current assessments"
            isLoading={isLoading}
            metrics={[
              { label: 'Assessments', value: data?.total ?? 0 },
              { label: 'Ready', value: countByStatus('ready') },
              {
                label: 'Ready with attention',
                value: countByStatus('ready-with-attention'),
              },
              { label: 'Needs attention', value: countByStatus('needs-attention') },
              { label: 'Blocked', value: countByStatus('blocked') },
            ]}
          />
        }
      />
    </>
  );
}
