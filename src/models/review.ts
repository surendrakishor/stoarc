import type { Id, IsoDateTime } from './common';
import type { UserRole } from './user';

/** Lifecycle of an architecture review board session. */
export type ReviewStatus =
  | 'awaiting-review'
  | 'in-review'
  | 'decision-recorded'
  | 'deferred'
  | 'cancelled';

/** Whether a member is able to attend the scheduled session. */
export type MemberAvailability =
  | 'available'
  | 'tentative'
  | 'unavailable'
  | 'awaiting-response';

/** Whether a member has completed their pre-read of the submission. */
export type MemberReviewStatus =
  | 'not-started'
  | 'in-progress'
  | 'complete'
  | 'delegated';

export interface ReviewMember {
  id: Id;
  name: string;
  role: UserRole;
  availability: MemberAvailability;
  reviewStatus: MemberReviewStatus;
  /** Member whose attendance is required for the review to be quorate. */
  required?: boolean;
  avatar?: string;
}

export interface Review {
  id: Id;
  architectureId: Id;
  scheduledAt: IsoDateTime;
  status: ReviewStatus;
  /** Roles that must be represented for the review to be quorate. */
  requiredRoles: UserRole[];
  members: ReviewMember[];
  /** Whether the session is expected to conclude with a recorded decision. */
  decisionRequired: boolean;
  /** Session length in minutes. */
  durationMinutes?: number;
  architectureVersionId?: Id;
  assessmentId?: Id;
  chair?: Id;
  location?: string;
  agenda?: string[];
}
