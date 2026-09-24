import { Link } from 'react-router-dom';
import {
  Badge,
  EmptyState,
  StatusPill,
  TBody,
  THead,
  Table,
  Td,
  Th,
  Tr,
} from '@/components/ui';
import { formatDateTime, formatRelativeDays } from '@/lib/format';
import { REVIEW_STATUS } from '@/lib/status';
import type { ReviewSummary } from '@/services';

/**
 * The next board sessions.
 *
 * A table, not cards: the reader is comparing dates, readiness and pre-read
 * progress across rows, which is exactly what columns are for.
 */
export function UpcomingReviews({ reviews }: { reviews: ReviewSummary[] }) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        title="No sessions scheduled"
        description="Scheduled review board sessions appear here with their readiness and pre-read progress."
      />
    );
  }

  return (
    <Table caption="Upcoming architecture review board sessions">
      <THead>
        <Tr>
          <Th className="pl-5">Architecture</Th>
          <Th>Scheduled</Th>
          <Th>Status</Th>
          <Th align="right">Pre-reads</Th>
          <Th align="right" className="pr-5">
            Representation
          </Th>
        </Tr>
      </THead>
      <TBody>
        {reviews.map((summary) => (
          <Tr key={summary.review.id} interactive>
            <Td className="pl-5">
              <Link
                to={`/reviews/${summary.review.id}`}
                className="font-medium text-ink hover:text-accent-700"
              >
                {summary.architecture?.name ?? 'Review session'}
              </Link>
              {summary.review.decisionRequired ? (
                <span className="mt-0.5 block text-2xs text-ink-faint">
                  Decision required
                </span>
              ) : null}
            </Td>
            <Td>
              <span className="block text-ink-secondary">
                {formatDateTime(summary.review.scheduledAt)}
              </span>
              <span className="block text-2xs text-ink-faint">
                {formatRelativeDays(summary.review.scheduledAt)}
              </span>
            </Td>
            <Td>
              <StatusPill status={REVIEW_STATUS[summary.review.status]} />
            </Td>
            <Td align="right" className="tabular-nums">
              {summary.prereadComplete} of {summary.prereadExpected}
            </Td>
            <Td align="right" className="pr-5">
              {summary.unrepresentedRoles.length === 0 ? (
                <Badge tone="ready" withDot>
                  Complete
                </Badge>
              ) : (
                <Badge
                  tone="needs"
                  withDot
                  title={`No available member for: ${summary.unrepresentedRoles.join(', ')}`}
                >
                  {summary.unrepresentedRoles.length} role
                  {summary.unrepresentedRoles.length === 1 ? '' : 's'} open
                </Badge>
              )}
            </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
}
