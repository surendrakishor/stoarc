import { useServices } from '@/app/providers';
import { appConfig, prototypeFeatures } from '@/app/config/app.config';
import {
  Card,
  CardBody,
  CardHeader,
  LinkButton,
  Notice,
  PageHeader,
  Section,
  Skeleton,
  SkeletonText,
} from '@/components/ui';
import { AttentionList, MetricTile, UpcomingReviews } from '@/features/overview';
import { usePersona } from '@/features/personas';
import { useAsync } from '@/lib/use-async';
import { useDocumentTitle } from '@/lib/use-document-title';

const PRINCIPLES = [
  'AI advises. The platform controls. Humans decide.',
  'Evidence before assertion.',
  'Authorisation before retrieval.',
  'AI systems are architecture, not an exception to architecture.',
];

export function HomePage() {
  useDocumentTitle('Home');
  const { overview } = useServices();
  const { persona } = usePersona();

  const { data, isLoading } = useAsync(
    () =>
      overview.getOverview({
        audience: persona.audience,
        userId: persona.userId,
      }),
    [overview, persona.audience, persona.userId],
  );

  return (
    <>
      <PageHeader
        title="Home"
        description={`${appConfig.tagline}. This view is composed for the ${persona.name} experience.`}
        actions={
          <LinkButton to="/architectures" variant="secondary">
            View architectures
          </LinkButton>
        }
      />

      {prototypeFeatures.syntheticDataNotice ? (
        <Notice tone="neutral" className="mb-6">
          Prototype workspace. All architectures, assessments and decisions
          shown are synthetic, and are served through the same repository
          interfaces a real backend will implement.
        </Notice>
      ) : null}

      <Section>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-[6.5rem] rounded-lg" />
              ))
            : data?.metrics.map((metric) => (
                <MetricTile key={metric.id} metric={metric} />
              ))}
        </div>
      </Section>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Needs your attention"
            description="Each line states why it surfaced."
          />
          {isLoading ? (
            <CardBody>
              <SkeletonText lines={4} />
            </CardBody>
          ) : (
            <AttentionList items={data?.attention ?? []} />
          )}
        </Card>

        <Card>
          <CardHeader title="How this platform works" />
          <CardBody>
            <ul className="space-y-3">
              {PRINCIPLES.map((principle) => (
                <li
                  key={principle}
                  className="border-l-2 border-border-default pl-3 text-[0.8125rem] leading-relaxed text-ink-secondary"
                >
                  {principle}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      <Section
        title="Upcoming review board sessions"
        description="Readiness and representation before the board sits."
        className="mt-8"
        actions={
          <LinkButton to="/arb-calendar" variant="ghost" size="sm">
            Open calendar
          </LinkButton>
        }
      >
        <Card>
          {isLoading ? (
            <CardBody>
              <SkeletonText lines={4} />
            </CardBody>
          ) : (
            <UpcomingReviews reviews={data?.upcomingReviews ?? []} />
          )}
        </Card>
      </Section>
    </>
  );
}
