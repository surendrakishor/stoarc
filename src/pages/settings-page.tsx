import { useRepositories } from '@/app/providers';
import { appConfig, prototypeFeatures } from '@/app/config/app.config';
import { ThemeToggle } from '@/components/layout';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  DefinitionList,
  Notice,
  PageHeader,
  Section,
  SkeletonText,
} from '@/components/ui';
import { usePersona } from '@/features/personas';
import { useAsync } from '@/lib/use-async';
import { useDocumentTitle } from '@/lib/use-document-title';

export function SettingsPage() {
  useDocumentTitle('Settings');
  // Workspace metadata is a direct lookup with no composition to do, so this
  // reads from the repository rather than through a service.
  const { assuranceProfiles, directory } = useRepositories();
  const { persona } = usePersona();

  const { data, isLoading } = useAsync(async () => {
    const organisation = await directory.getOrganisation();
    const defaultProfile = organisation?.defaultAssuranceProfileId
      ? await assuranceProfiles.getById(organisation.defaultAssuranceProfileId)
      : null;
    return { organisation, defaultProfile };
  }, [assuranceProfiles, directory]);

  const organisation = data?.organisation;
  const defaultProfile = data?.defaultProfile;

  return (
    <>
      <PageHeader
        title="Settings"
        description="Workspace details and how this application presents itself."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Settings' }]}
      />

      <Section title="Appearance">
        <Card>
          <CardBody className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[0.8125rem] font-medium text-ink">Theme</p>
              <p className="mt-0.5 text-[0.8125rem] text-ink-muted">
                Light, dark, or follow the operating system.
              </p>
            </div>
            <ThemeToggle iconOnly={false} />
          </CardBody>
        </Card>
      </Section>

      <Section title="Workspace">
        <Card>
          <CardHeader
            title={organisation?.name ?? 'Workspace'}
            description={organisation?.industry}
          />
          <CardBody>
            {isLoading ? (
              <SkeletonText lines={3} />
            ) : (
              <DefinitionList
                columns={3}
                items={[
                  {
                    term: 'Short code',
                    description: organisation?.shortCode ?? '—',
                  },
                  {
                    term: 'Default assurance profile',
                    description: defaultProfile
                      ? `${defaultProfile.name} v${defaultProfile.version}`
                      : 'Not set',
                  },
                  {
                    term: 'Regulatory regimes',
                    description: (
                      <span className="flex flex-wrap gap-1.5">
                        {(organisation?.regulatoryRegimes ?? []).map((regime) => (
                          <Badge key={regime}>{regime}</Badge>
                        ))}
                      </span>
                    ),
                  },
                ]}
              />
            )}
          </CardBody>
        </Card>
      </Section>

      <Section title="Product">
        <Card>
          <CardBody>
            <DefinitionList
              columns={3}
              items={[
                { term: 'Product name', description: appConfig.name },
                { term: 'Version', description: appConfig.version },
                {
                  term: 'Release stage',
                  description: <Badge tone="info">{appConfig.releaseStage}</Badge>,
                },
              ]}
            />
            <p className="mt-4 text-[0.8125rem] text-ink-muted">
              The product name is held in a single application constant. Changing
              it there changes every surface, including the browser title and the
              navigation mark.
            </p>
          </CardBody>
        </Card>
      </Section>

      {prototypeFeatures.personaSwitcher ? (
        <Section title="Prototype">
          <Notice tone="neutral">
            <p className="font-medium">
              Persona switching is enabled for demonstration.
            </p>
            <p className="mt-1">
              You are currently viewing the application as{' '}
              <strong className="font-medium text-ink">{persona.name}</strong>.
              Switch personas from the account menu. This is not an
              authorisation mechanism and is isolated so it can be replaced by
              role-based authorisation without changing the screens.
            </p>
          </Notice>
        </Section>
      ) : null}
    </>
  );
}
