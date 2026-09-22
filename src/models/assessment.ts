import type { Id, IsoDateTime } from './common';

/**
 * Readiness of an architecture for a decision. The wording is deliberately
 * calm: nothing here is phrased as a failure.
 */
export type ReadinessStatus =
  | 'ready'
  | 'ready-with-attention'
  | 'needs-attention'
  | 'blocked';

/** Per-domain readiness roll-up within an assessment. */
export interface AssessmentDomain {
  id: Id;
  /** Assurance domain name, e.g. `Security`, `Data`, `Agentic Control`. */
  name: string;
  readinessStatus: ReadinessStatus;
  readinessPercentage: number;
  /** Controls satisfied out of controls assessed. */
  controlsSatisfied: number;
  controlsAssessed: number;
  findingsCount: number;
}

export interface Assessment {
  id: Id;
  architectureVersionId: Id;
  /** Assurance profile the version was assessed against. */
  assuranceProfile: Id;
  readinessStatus: ReadinessStatus;
  /** 0–100. A roll-up of the domain percentages, not a score or a grade. */
  readinessPercentage: number;
  domains: AssessmentDomain[];
  findingsCount: number;
  generatedAt?: IsoDateTime;
  /** Set once a human has reviewed the machine-produced assessment. */
  reviewedBy?: Id;
  reviewedAt?: IsoDateTime;
  /** Evidence coverage across the profile, 0–100. */
  evidenceCoverage?: number;
}
