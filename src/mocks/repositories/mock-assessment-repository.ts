import type { Assessment, Finding, Id, Page } from '@/models';
import type {
  AssessmentQuery,
  AssessmentRepository,
  FindingQuery,
} from '@/repositories';
import {
  mockArchitectureVersions,
  mockAssessments,
  mockFindings,
} from '../data';
import {
  byDateDescending,
  clone,
  includedIn,
  latency,
  matchesSearch,
  paginate,
} from './support';

export class MockAssessmentRepository implements AssessmentRepository {
  async list(query?: AssessmentQuery): Promise<Page<Assessment>> {
    await latency();
    const filtered = mockAssessments
      .filter(
        (assessment) =>
          includedIn(query?.readinessStatus, assessment.readinessStatus) &&
          (!query?.assuranceProfile ||
            assessment.assuranceProfile === query.assuranceProfile),
      )
      .sort((a, b) => byDateDescending(a.generatedAt ?? '', b.generatedAt ?? ''));

    return paginate(filtered, query);
  }

  async getById(id: Id): Promise<Assessment | null> {
    await latency();
    const match = mockAssessments.find((assessment) => assessment.id === id);
    return match ? clone(match) : null;
  }

  async getByArchitectureVersionId(versionId: Id): Promise<Assessment | null> {
    await latency();
    const match = mockAssessments.find(
      (assessment) => assessment.architectureVersionId === versionId,
    );
    return match ? clone(match) : null;
  }

  async getLatestForArchitecture(
    architectureId: Id,
  ): Promise<Assessment | null> {
    await latency();
    const versionIds = new Set(
      mockArchitectureVersions
        .filter((version) => version.architectureId === architectureId)
        .map((version) => version.id),
    );
    const match = mockAssessments
      .filter((assessment) => versionIds.has(assessment.architectureVersionId))
      .sort((a, b) =>
        byDateDescending(a.generatedAt ?? '', b.generatedAt ?? ''),
      )[0];
    return match ? clone(match) : null;
  }

  async listFindings(query?: FindingQuery): Promise<Page<Finding>> {
    await latency();
    const filtered = mockFindings.filter(
      (finding) =>
        (!query?.assessmentId || finding.assessmentId === query.assessmentId) &&
        includedIn(query?.category, finding.category) &&
        includedIn(query?.severity, finding.severity) &&
        includedIn(query?.disposition, finding.disposition) &&
        matchesSearch(
          query?.search,
          finding.title,
          finding.description,
          finding.profileControl,
        ),
    );
    return paginate(filtered, query);
  }

  async getFinding(id: Id): Promise<Finding | null> {
    await latency();
    const match = mockFindings.find((finding) => finding.id === id);
    return match ? clone(match) : null;
  }
}
