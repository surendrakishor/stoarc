import { useServices } from '@/app/providers';
import { ModulePlaceholder } from '@/components/module-placeholder';
import { Button, PageHeader, PlusIcon } from '@/components/ui';
import { useCapability } from '@/features/personas';
import { useAsync } from '@/lib/use-async';
import { useDocumentTitle } from '@/lib/use-document-title';
import { PlaceholderMetrics } from './placeholder-metrics';

export function AssuranceProfilesPage() {
  useDocumentTitle('Assurance Profiles');
  const { assuranceProfiles } = useServices();
  const canManage = useCapability('manage-assurance-profiles');

  const { data, isLoading } = useAsync(
    () => assuranceProfiles.list(),
    [assuranceProfiles],
  );

  const profiles = data?.items ?? [];
  const controlCount = profiles.reduce(
    (total, profile) =>
      total +
      profile.categories.reduce(
        (sum, category) => sum + category.controls.length,
        0,
      ),
    0,
  );

  return (
    <>
      <PageHeader
        title="Assurance Profiles"
        description="What architectures are assessed against. Profiles are versioned data, so assurance can evolve without the architecture core changing."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Assurance Profiles' },
        ]}
        actions={
          canManage ? (
            <Button variant="primary" leadingIcon={<PlusIcon size={15} />} disabled>
              New profile
            </Button>
          ) : null
        }
      />

      <ModulePlaceholder
        summary="The profile library, and the editor behind each version."
        capabilities={[
          {
            title: 'Profile library',
            description:
              'Active, draft and superseded profiles, with what each one applies to.',
          },
          {
            title: 'Categories and controls',
            description:
              'Each control states what it expects and what evidence satisfies it.',
          },
          {
            title: 'Versioning',
            description:
              'A profile version is fixed once assessments cite it, so a past decision stays interpretable.',
          },
          {
            title: 'Applicability',
            description:
              'Which architecture types and criticality levels draw in which profile, including AI and agentic.',
          },
        ]}
        aside={
          <PlaceholderMetrics
            title="Profile library"
            isLoading={isLoading}
            metrics={[
              { label: 'Profiles', value: data?.total ?? 0 },
              {
                label: 'Active',
                value: profiles.filter((profile) => profile.status === 'active')
                  .length,
              },
              {
                label: 'Draft',
                value: profiles.filter((profile) => profile.status === 'draft')
                  .length,
              },
              { label: 'Controls defined', value: controlCount },
            ]}
          />
        }
      />
    </>
  );
}
