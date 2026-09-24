import type {
  Assessment,
  Finding,
  FindingCategory,
  FindingDisposition,
  FindingSeverity,
  Id,
  Page,
  QueryOptions,
  ReadinessStatus,
} from '@/models';

export interface AssessmentQuery extends QueryOptions {
  readinessStatus?: ReadinessStatus[];
  assuranceProfile?: Id;
}

export interface FindingQuery extends QueryOptions {
  assessmentId?: Id;
  category?: FindingCategory[];
  severity?: FindingSeverity[];
  disposition?: FindingDisposition[];
}

/** Read access to readiness assessments and the findings beneath them. */
export interface AssessmentRepository {
  list(query?: AssessmentQuery): Promise<Page<Assessment>>;
  getById(id: Id): Promise<Assessment | null>;
  getByArchitectureVersionId(versionId: Id): Promise<Assessment | null>;
  /** Latest assessment across all versions of an architecture. */
  getLatestForArchitecture(architectureId: Id): Promise<Assessment | null>;
  listFindings(query?: FindingQuery): Promise<Page<Finding>>;
  getFinding(id: Id): Promise<Finding | null>;
}
