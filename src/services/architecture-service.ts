import type { Id, Page } from '@/models';
import type { ArchitectureQuery, RepositoryRegistry } from '@/repositories';
import type { ArchitectureSummary } from './types';

/** Reads architectures together with the context a screen needs around them. */
export class ArchitectureService {
  private readonly repositories: RepositoryRegistry;

  constructor(repositories: RepositoryRegistry) {
    this.repositories = repositories;
  }

  async listSummaries(
    query?: ArchitectureQuery,
  ): Promise<Page<ArchitectureSummary>> {
    const page = await this.repositories.architectures.list(query);
    const items = await Promise.all(
      page.items.map((architecture) => this.summarise(architecture.id)),
    );
    return {
      ...page,
      items: items.filter((item): item is ArchitectureSummary => item !== null),
    };
  }

  async summarise(architectureId: Id): Promise<ArchitectureSummary | null> {
    const { architectures, assessments, decisions, directory, reviews } =
      this.repositories;

    const architecture = await architectures.getById(architectureId);
    if (!architecture) return null;

    const [owner, architect, currentVersion, latestAssessment, architectureReviews, architectureDecisions] =
      await Promise.all([
        directory.getUser(architecture.owner),
        directory.getUser(architecture.architect),
        architectures.getCurrentVersion(architectureId),
        assessments.getLatestForArchitecture(architectureId),
        reviews.listByArchitecture(architectureId),
        decisions.listByArchitecture(architectureId),
      ]);

    const now = Date.now();
    const nextReview = architectureReviews.find(
      (review) =>
        new Date(review.scheduledAt).getTime() >= now &&
        review.status !== 'cancelled',
    );

    const openConditions = architectureDecisions
      .flatMap((decision) => decision.conditions)
      .filter(
        (condition) => condition.status !== 'met' && condition.status !== 'waived',
      ).length;

    return {
      architecture,
      owner: owner ?? undefined,
      architect: architect ?? undefined,
      currentVersion: currentVersion ?? undefined,
      latestAssessment: latestAssessment ?? undefined,
      nextReview,
      openConditions,
    };
  }
}
