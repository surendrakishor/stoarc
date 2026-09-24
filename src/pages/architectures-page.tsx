import { useServices } from '@/app/providers';
import { ModulePlaceholder } from '@/components/module-placeholder';
import { Button, PageHeader, PlusIcon } from '@/components/ui';
import { useCapability } from '@/features/personas';
import { useAsync } from '@/lib/use-async';
import { useDocumentTitle } from '@/lib/use-document-title';
import { PlaceholderMetrics } from './placeholder-metrics';

export function ArchitecturesPage() {
  useDocumentTitle('Architectures');
  const { architectures } = useServices();
  const canSubmit = useCapability('submit-architecture');

  const { data, isLoading } = useAsync(
    () => architectures.listSummaries(),
    [architectures],
  );

  const items = data?.items ?? [];

  return (
    <>
      <PageHeader
        title="Architectures"
        description="Every architecture under assurance, with its current version, criticality and where it sits in the review pipeline."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Architectures' }]}
        actions={
          canSubmit ? (
            <Button
              variant="primary"
              leadingIcon={<PlusIcon size={15} />}
              disabled
              title="The submission flow is built in a later increment"
            >
              Submit architecture
            </Button>
          ) : null
        }
      />

      <ModulePlaceholder
        summary="A filterable register of architectures, and the detail view behind each one."
        capabilities={[
          {
            title: 'Register',
            description:
              'Dense table of architectures with type, criticality, owner, architect, current version and readiness.',
          },
          {
            title: 'Filtering',
            description:
              'By architecture type, criticality, status and responsible architect, driven by ArchitectureRepository queries.',
          },
          {
            title: 'Architecture detail',
            description:
              'Version history, the current assessment, scheduled reviews and any recorded decisions in one place.',
          },
          {
            title: 'Submission',
            description:
              'Submit a new version with its artefacts, and see what the assurance profile expects before submitting.',
          },
        ]}
        aside={
          <PlaceholderMetrics
            title="In this workspace"
            isLoading={isLoading}
            metrics={[
              { label: 'Architectures', value: data?.total ?? 0 },
              {
                label: 'Awaiting review',
                value: items.filter(
                  (item) => item.architecture.status === 'awaiting-review',
                ).length,
              },
              {
                label: 'In review',
                value: items.filter(
                  (item) => item.architecture.status === 'in-review',
                ).length,
              },
              {
                label: 'AI or agentic',
                value: items.filter((item) =>
                  ['ai', 'agentic'].includes(item.architecture.architectureType),
                ).length,
              },
            ]}
          />
        }
      />
    </>
  );
}
