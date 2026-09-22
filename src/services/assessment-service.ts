import type { Page } from '@/models';
import type {
  AssessmentQuery,
  FindingQuery,
  RepositoryRegistry,
} from '@/repositories';
import type { AssessmentSummary } from './types';

export class AssessmentService {
  private readonly repositories: RepositoryRegistry;

  constructor(repositories: RepositoryRegistry) {
    this.repositories = repositories;
  }

  async listSummaries(
    query?: AssessmentQuery,
  ): Promise<Page<AssessmentSummary>> {
    const { architectures, assessments, assuranceProfiles } = this.repositories;
    const page = await assessments.list(query);

    const items = await Promise.all(
      page.items.map(async (assessment) => {
        const version = await architectures.getVersion(
          assessment.architectureVersionId,
        );
        const [architecture, profile] = await Promise.all([
          version ? architectures.getById(version.architectureId) : null,
          assuranceProfiles.getById(assessment.assuranceProfile),
        ]);
        return {
          assessment,
          architecture: architecture ?? undefined,
          version: version ?? undefined,
          profileName: profile ? `${profile.name} v${profile.version}` : undefined,
        } satisfies AssessmentSummary;
      }),
    );

    return { ...page, items };
  }

  listFindings(query?: FindingQuery) {
    return this.repositories.assessments.listFindings(query);
  }
}
