import { Card, CardBody, CardHeader, Skeleton } from '@/components/ui';

export interface PlaceholderMetric {
  label: string;
  value: number | string;
}

/**
 * A small, honest figure panel for placeholder screens: proof that the
 * repository layer is wired, without pretending the screen exists.
 */
export function PlaceholderMetrics({
  title,
  metrics,
  isLoading,
}: {
  title: string;
  metrics: PlaceholderMetric[];
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardBody>
        <dl className="space-y-2.5">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-3.5 w-8" />
                </div>
              ))
            : metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-baseline justify-between gap-4"
                >
                  <dt className="text-[0.8125rem] text-ink-muted">
                    {metric.label}
                  </dt>
                  <dd className="text-sm font-medium tabular-nums text-ink">
                    {metric.value}
                  </dd>
                </div>
              ))}
        </dl>
      </CardBody>
    </Card>
  );
}
