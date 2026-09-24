import type { Id, IsoDate, IsoDateTime } from './common';

/**
 * The outcome a review board records. Humans decide; the platform records the
 * decision, its rationale and the conditions attached to it.
 */
export type DecisionOutcome =
  | 'approved'
  | 'approved-with-conditions'
  | 'deferred'
  | 'not-approved'
  | 'noted';

/** Status of a condition attached to a decision. */
export type ConditionStatus =
  | 'open'
  | 'in-progress'
  | 'evidence-submitted'
  | 'met'
  | 'overdue'
  | 'waived';

export interface Condition {
  id: Id;
  title: string;
  /** User id accountable for satisfying the condition. */
  owner: Id;
  /** Date the condition is due. */
  due: IsoDate;
  /** What must be produced for the condition to be considered met. */
  evidenceRequired: string;
  status: ConditionStatus;
  decisionId?: Id;
  notes?: string;
}

export interface Decision {
  id: Id;
  architectureId: Id;
  outcome: DecisionOutcome;
  /** Why the board decided as it did. Recorded in the board's own words. */
  rationale: string;
  conditions: Condition[];
  reviewId?: Id;
  architectureVersionId?: Id;
  decidedAt?: IsoDateTime;
  /** User id of the chair who recorded the decision. */
  recordedBy?: Id;
  /** Board members who endorsed the outcome. */
  endorsedBy?: Id[];
  /** Date the decision should be revisited, where one applies. */
  reviewBy?: IsoDate;
}
