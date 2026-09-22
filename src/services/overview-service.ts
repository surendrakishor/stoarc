import { formatDate } from '@/lib/format';
import { USER_ROLE_LABEL } from '@/lib/status';
import type { Condition, ReadinessStatus } from '@/models';
import type { RepositoryRegistry } from '@/repositories';
import { ReviewService } from './review-service';
import type {
  AttentionItem,
  OverviewData,
  OverviewMetric,
  OverviewRequest,
} from './types';

function toneForReadiness(status?: ReadinessStatus): ReadinessStatus | 'neutral' {
  return status ?? 'neutral';
}

function isConditionOpen(condition: Condition): boolean {
  return condition.status !== 'met' && condition.status !== 'waived';
}

/**
 * Composes the home overview for a given audience.
 *
 * Each audience gets the same underlying facts, arranged around the decision
 * they are accountable for: submitters see their own submissions, reviewers see
 * what is waiting on them, governance sees the board pipeline.
 */
export class OverviewService {
  private readonly repositories: RepositoryRegistry;
  private readonly reviewService: ReviewService;

  constructor(repositories: RepositoryRegistry) {
    this.repositories = repositories;
    this.reviewService = new ReviewService(repositories);
  }

  async getOverview(request: OverviewRequest): Promise<OverviewData> {
    switch (request.audience) {
      case 'submitter':
        return this.submitterOverview(request);
      case 'reviewer':
        return this.reviewerOverview(request);
      case 'governance':
        return this.governanceOverview();
    }
  }

  private async submitterOverview({
    userId,
  }: OverviewRequest): Promise<OverviewData> {
    const { architectures, assessments, decisions } = this.repositories;

    const [mine, conditions] = await Promise.all([
      architectures.list({ architect: userId }),
      decisions.listConditions({ owner: userId }),
    ]);

    const withAssessments = await Promise.all(
      mine.items.map(async (architecture) => ({
        architecture,
        assessment: await assessments.getLatestForArchitecture(architecture.id),
      })),
    );

    const needingWork = withAssessments.filter(
      ({ assessment }) =>
        assessment?.readinessStatus === 'needs-attention' ||
        assessment?.readinessStatus === 'blocked',
    );

    const openConditions = conditions.items.filter(isConditionOpen);

    const metrics: OverviewMetric[] = [
      {
        id: 'my-architectures',
        label: 'My architectures',
        value: mine.total,
        caption: 'Where you are the responsible architect',
        href: '/architectures',
      },
      {
        id: 'awaiting-review',
        label: 'Awaiting review',
        value: mine.items.filter((item) => item.status === 'awaiting-review')
          .length,
        caption: 'Submitted and scheduled',
        href: '/reviews',
      },
      {
        id: 'needs-attention',
        label: 'Needs attention before review',
        value: needingWork.length,
        caption: 'Findings to resolve or evidence to supply',
        tone: needingWork.length > 0 ? 'needs-attention' : 'ready',
        href: '/assessments',
      },
      {
        id: 'my-conditions',
        label: 'Conditions you own',
        value: openConditions.length,
        caption: 'From recorded decisions',
        tone: openConditions.some((condition) => condition.status === 'overdue')
          ? 'needs-attention'
          : 'neutral',
        href: '/decisions',
      },
    ];

    const attention: AttentionItem[] = [
      ...needingWork.map(({ architecture, assessment }) => ({
        id: `attention-${architecture.id}`,
        title: architecture.name,
        reason: `${assessment?.findingsCount ?? 0} findings open against ${
          assessment?.readinessPercentage ?? 0
        }% readiness`,
        href: `/architectures/${architecture.id}`,
        tone: toneForReadiness(assessment?.readinessStatus),
        context: architecture.currentVersion,
      })),
      ...openConditions.map((condition) => ({
        id: `attention-${condition.id}`,
        title: condition.title,
        reason:
          condition.status === 'overdue'
            ? `Evidence was due ${formatDate(condition.due)}`
            : `Evidence required by ${formatDate(condition.due)}`,
        href: '/decisions',
        tone:
          condition.status === 'overdue'
            ? ('needs-attention' as const)
            : ('neutral' as const),
        context: 'Decision condition',
      })),
    ];

    const upcomingReviews = await this.reviewService.listUpcomingSummaries(4);

    return { metrics, attention, upcomingReviews };
  }

  private async reviewerOverview({
    userId,
  }: OverviewRequest): Promise<OverviewData> {
    const assigned = await this.repositories.reviews.list({ memberId: userId });
    const now = Date.now();

    const upcoming = assigned.items.filter(
      (review) => new Date(review.scheduledAt).getTime() >= now,
    );
    const outstandingPreReads = upcoming.filter((review) =>
      review.members.some(
        (member) =>
          member.id === userId &&
          (member.reviewStatus === 'not-started' ||
            member.reviewStatus === 'in-progress'),
      ),
    );

    const summaries = await Promise.all(
      upcoming.map((review) => this.reviewService.summarise(review)),
    );

    const metrics: OverviewMetric[] = [
      {
        id: 'assigned-reviews',
        label: 'Reviews assigned to you',
        value: upcoming.length,
        caption: 'Scheduled sessions where you are a member',
        href: '/reviews',
      },
      {
        id: 'outstanding-prereads',
        label: 'Pre-reads outstanding',
        value: outstandingPreReads.length,
        caption: 'Due before the session',
        tone: outstandingPreReads.length > 0 ? 'needs-attention' : 'ready',
        href: '/reviews',
      },
      {
        id: 'blocking-findings',
        label: 'Blocking findings to consider',
        value: summaries.reduce(
          (total, summary) =>
            total +
            (summary.assessment?.domains.filter(
              (domain) => domain.readinessStatus === 'blocked',
            ).length ?? 0),
          0,
        ),
        caption: 'Across the architectures you are reviewing',
        href: '/assessments',
      },
      {
        id: 'next-board',
        label: 'Next board',
        value: summaries[0]
          ? new Date(summaries[0].review.scheduledAt).toLocaleDateString(
              'en-GB',
              { day: 'numeric', month: 'short' },
            )
          : '—',
        caption: summaries[0]?.architecture?.name ?? 'Nothing scheduled',
        href: '/arb-calendar',
      },
    ];

    const attention: AttentionItem[] = summaries
      .filter((summary) =>
        summary.review.members.some(
          (member) => member.id === userId && member.reviewStatus !== 'complete',
        ),
      )
      .map((summary) => ({
        id: `attention-${summary.review.id}`,
        title: summary.architecture?.name ?? 'Review',
        reason: `Pre-read outstanding · board on ${new Date(
          summary.review.scheduledAt,
        ).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`,
        href: `/reviews/${summary.review.id}`,
        tone: toneForReadiness(summary.assessment?.readinessStatus),
        context: summary.assessment
          ? `${summary.assessment.findingsCount} findings`
          : undefined,
      }));

    return { metrics, attention, upcomingReviews: summaries.slice(0, 4) };
  }

  private async governanceOverview(): Promise<OverviewData> {
    const { architectures, assessments, decisions } = this.repositories;

    const [allArchitectures, allAssessments, conditions, upcomingReviews] =
      await Promise.all([
        architectures.list(),
        assessments.list(),
        decisions.listConditions(),
        this.reviewService.listUpcomingSummaries(6),
      ]);

    const openConditions = conditions.items.filter(isConditionOpen);
    const overdueConditions = openConditions.filter(
      (condition) => condition.status === 'overdue',
    );
    const quorumRisks = upcomingReviews.filter(
      (summary) => summary.unrepresentedRoles.length > 0,
    );
    const readyForDecision = allAssessments.items.filter(
      (assessment) =>
        assessment.readinessStatus === 'ready' ||
        assessment.readinessStatus === 'ready-with-attention',
    );

    const metrics: OverviewMetric[] = [
      {
        id: 'in-pipeline',
        label: 'In the review pipeline',
        value: allArchitectures.items.filter(
          (architecture) =>
            architecture.status === 'awaiting-review' ||
            architecture.status === 'in-review',
        ).length,
        caption: 'Awaiting or in review',
        href: '/architectures',
      },
      {
        id: 'ready-for-decision',
        label: 'Ready for a decision',
        value: readyForDecision.length,
        caption: 'Assessed as ready, with or without attention',
        tone: 'ready',
        href: '/assessments',
      },
      {
        id: 'quorum-risk',
        label: 'Sessions missing a required role',
        value: quorumRisks.length,
        caption: 'Upcoming boards without full representation',
        tone: quorumRisks.length > 0 ? 'needs-attention' : 'ready',
        href: '/arb-calendar',
      },
      {
        id: 'overdue-conditions',
        label: 'Conditions past due',
        value: overdueConditions.length,
        caption: `${openConditions.length} open in total`,
        tone: overdueConditions.length > 0 ? 'needs-attention' : 'ready',
        href: '/decisions',
      },
    ];

    const attention: AttentionItem[] = [
      ...quorumRisks.map((summary) => ({
        id: `attention-quorum-${summary.review.id}`,
        title: summary.architecture?.name ?? 'Review board session',
        reason: `No available member for: ${summary.unrepresentedRoles
          .map((role) => USER_ROLE_LABEL[role])
          .join(', ')}`,
        href: `/reviews/${summary.review.id}`,
        tone: 'needs-attention' as const,
        context: new Date(summary.review.scheduledAt).toLocaleDateString(
          'en-GB',
          { day: 'numeric', month: 'long' },
        ),
      })),
      ...overdueConditions.map((condition) => ({
        id: `attention-condition-${condition.id}`,
        title: condition.title,
        reason: `Evidence was due ${formatDate(condition.due)}`,
        href: '/decisions',
        tone: 'needs-attention' as const,
        context: 'Decision condition',
      })),
    ];

    return { metrics, attention, upcomingReviews: upcomingReviews.slice(0, 4) };
  }
}
