import type { ReactNode } from 'react';
import { Card, CardBody, CardHeader, Notice } from '@/components/ui';

export interface PlannedCapability {
  title: string;
  description: string;
}

/**
 * Stands in for a screen that has not been built yet.
 *
 * States plainly what the screen will do rather than showing an empty frame,
 * so the shell can be reviewed without the detail being mistaken for missing.
 */
export function ModulePlaceholder({
  summary,
  capabilities,
  aside,
}: {
  summary: string;
  capabilities: PlannedCapability[];
  /** Live figures from the data layer, where they help orient the reader. */
  aside?: ReactNode;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader
          title="Planned for this screen"
          description={summary}
        />
        <CardBody>
          <ul className="divide-y divide-border-subtle">
            {capabilities.map((capability) => (
              <li key={capability.title} className="py-3 first:pt-0 last:pb-0">
                <p className="text-[0.8125rem] font-medium text-ink">
                  {capability.title}
                </p>
                <p className="mt-0.5 text-[0.8125rem] text-ink-muted">
                  {capability.description}
                </p>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <div className="space-y-5">
        {aside}
        <Notice tone="neutral">
          This is the application shell. The screen itself is built in a later
          increment; the data it will use is already reachable through the
          repository layer.
        </Notice>
      </div>
    </div>
  );
}
