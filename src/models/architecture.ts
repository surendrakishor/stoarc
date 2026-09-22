import type { Id, IsoDate, IsoDateTime } from './common';

/**
 * The kinds of architecture the platform assures. AI and agentic systems are
 * first-class members of this list rather than an exception to it.
 */
export type ArchitectureType =
  | 'conventional'
  | 'cloud'
  | 'integration'
  | 'data'
  | 'ai'
  | 'agentic';

/** Business criticality, which drives the depth of assurance required. */
export type Criticality = 'mission-critical' | 'high' | 'moderate' | 'low';

/** Lifecycle position of an architecture. Wording is intentionally calm. */
export type ArchitectureStatus =
  | 'draft'
  | 'awaiting-review'
  | 'in-review'
  | 'decision-recorded'
  | 'archived';

export interface Architecture {
  id: Id;
  name: string;
  description: string;
  architectureType: ArchitectureType;
  criticality: Criticality;
  /** Accountable business or product owner (user id). */
  owner: Id;
  /** Responsible architect (user id). */
  architect: Id;
  /** Version identifier of the version currently under assurance. */
  currentVersion: string;
  /** Date the architecture is expected at an architecture review board. */
  targetReviewDate?: IsoDate;
  status: ArchitectureStatus;
  organisationId?: Id;
  /** Business domain or capability the architecture belongs to. */
  domain?: string;
  tags?: string[];
  updatedAt?: IsoDateTime;
}

export interface ArchitectureVersion {
  id: Id;
  architectureId: Id;
  /** Human-readable version label, e.g. `v2.1`. */
  version: string;
  submittedAt: IsoDateTime;
  /** User id of the submitter. */
  submittedBy: Id;
  /** What changed relative to the previous version. */
  summary?: string;
  /** Artefacts supplied with this submission. */
  artefactIds?: Id[];
  isCurrent?: boolean;
}
