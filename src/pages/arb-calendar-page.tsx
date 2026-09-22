import { useServices } from '@/app/providers';
import { ModulePlaceholder } from '@/components/module-placeholder';
import { PageHeader } from '@/components/ui';
import { useAsync } from '@/lib/use-async';
import { useDocumentTitle } from '@/lib/use-document-title';
import { PlaceholderMetrics } from './placeholder-metrics';

export function ArbCalendarPage() {
  useDocumentTitle('ARB Calendar');
  const { calendar } = useServices();

  const { data, isLoading } = useAsync(
    () => calendar.listEntrySummaries(),
    [calendar],
  );

  const entries = data ?? [];
  const now = Date.now();
  const upcoming = entries.filter(
    (item) => new Date(item.entry.startsAt).getTime() >= now,
  );
  const boardSlots = upcoming.filter(
    (item) => item.entry.kind === 'review-board',
  );
  const remainingCapacity = boardSlots.reduce(
    (total, item) =>
      total + Math.max(0, (item.entry.capacity ?? 0) - (item.entry.booked ?? 0)),
    0,
  );

  return (
    <>
      <PageHeader
        title="ARB Calendar"
        description="When the board sits, how much capacity each session has, and the deadlines that lead into it."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'ARB Calendar' }]}
      />

      <ModulePlaceholder
        summary="The board schedule, with capacity and the submission deadlines that feed it."
        capabilities={[
          {
            title: 'Schedule',
            description:
              'Month and list views of board sessions, pre-read windows and submission deadlines.',
          },
          {
            title: 'Capacity',
            description:
              'Slots booked against slots available, so a session is not overloaded in the week before it sits.',
          },
          {
            title: 'Scheduling an architecture',
            description:
              'Place an architecture into a session, with the required roles checked at the point of booking.',
          },
          {
            title: 'Condition checkpoints',
            description:
              'Dates on which evidence for a decision condition falls due.',
          },
        ]}
        aside={
          <PlaceholderMetrics
            title="Next four weeks"
            isLoading={isLoading}
            metrics={[
              { label: 'Board sessions', value: boardSlots.length },
              { label: 'Entries scheduled', value: upcoming.length },
              { label: 'Slots still available', value: remainingCapacity },
            ]}
          />
        }
      />
    </>
  );
}
