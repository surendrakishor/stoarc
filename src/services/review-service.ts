import type { Page, Review } from '@/models';
import type { RepositoryRegistry, ReviewQuery } from '@/repositories';
import type { ReviewSummary } from './types';

/** Roles that count as having covered a required role when unavailable. */
const AVAILABLE_STATES = new Set(['available', 'tentative']);

export class ReviewService {
  private readonly repositories: RepositoryRegistry;

  constructor(repositories: RepositoryRegistry) {
    this.repositories = repositories;
  }

  async listSummaries(query?: ReviewQuery): Promise<Page<ReviewSummary>> {
    const page = await this.repositories.reviews.list(query);
    const items = await Promise.all(
      page.items.map((review) => this.summarise(review)),
    );
    return { ...page, items };
  }

  async listUpcomingSummaries(limit = 5): Promise<ReviewSummary[]> {
    const reviews = await this.repositories.reviews.listUpcoming(limit);
    return Promise.all(reviews.map((review) => this.summarise(review)));
  }

  async summarise(review: Review): Promise<ReviewSummary> {
    const { architectures, assessments } = this.repositories;
    const [architecture, assessment] = await Promise.all([
      architectures.getById(review.architectureId),
      review.assessmentId
        ? assessments.getById(review.assessmentId)
        : Promise.resolve(null),
    ]);

    const unrepresentedRoles = review.requiredRoles.filter(
      (role) =>
        !review.members.some(
          (member) =>
            member.role === role && AVAILABLE_STATES.has(member.availability),
        ),
    );

    const expectedMembers = review.members.filter(
      (member) => member.required || member.reviewStatus !== 'not-started',
    );
    const prereadComplete = review.members.filter(
      (member) =>
        member.reviewStatus === 'complete' || member.reviewStatus === 'delegated',
    ).length;

    return {
      review,
      architecture: architecture ?? undefined,
      assessment: assessment ?? undefined,
      unrepresentedRoles,
      prereadComplete,
      prereadExpected: Math.max(expectedMembers.length, prereadComplete),
    };
  }
}
