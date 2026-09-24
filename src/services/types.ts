import type {
  Architecture,
  ArchitectureVersion,
  Assessment,
  CalendarEntry,
  Condition,
  Decision,
  Id,
  ReadinessStatus,
  Review,
  User,
  UserRole,
} from '@/models';

/**
 * View-shaped types returned by services.
 *
 * Services exist so that screens never have to stitch repositories together
 * themselves: a screen asks for what it needs, in the shape it needs it.
 */

export interface ArchitectureSummary {
  architecture: Architecture;
  owner?: User;
  architect?: User;
  currentVersion?: ArchitectureVersion;
  latestAssessment?: Assessment;
  nextReview?: Review;
  openConditions: number;
}

export interface AssessmentSummary {
  assessment: Assessment;
  architecture?: Architecture;
  version?: ArchitectureVersion;
  profileName?: string;
}

export interface ReviewSummary {
  review: Review;
  architecture?: Architecture;
  assessment?: Assessment;
  /** Required roles with no available member holding them. */
  unrepresentedRoles: UserRole[];
  /** Members who have finished their pre-read, over members expected to. */
  prereadComplete: number;
  prereadExpected: number;
}

export interface DecisionSummary {
  decision: Decision;
  architecture?: Architecture;
  recordedByUser?: User;
  openConditions: number;
}

export interface ConditionSummary {
  condition: Condition;
  decision?: Decision;
  architecture?: Architecture;
  ownerUser?: User;
}

export interface CalendarEntrySummary {
  entry: CalendarEntry;
  review?: Review;
  architecture?: Architecture;
}

/** A single headline figure on an overview surface. */
export interface OverviewMetric {
  id: string;
  label: string;
  value: number | string;
  /** Short clarifying phrase shown beneath the value. */
  caption?: string;
  /** Status tone used to colour the figure, where one applies. */
  tone?: ReadinessStatus | 'neutral';
  /** Route the metric links to. */
  href?: string;
}

/** Something a persona should look at, with the reason it surfaced. */
export interface AttentionItem {
  id: Id;
  title: string;
  /** Why this is being shown, in plain language. */
  reason: string;
  href: string;
  tone: ReadinessStatus | 'neutral';
  /** Secondary line, e.g. the architecture the item belongs to. */
  context?: string;
}

export interface OverviewData {
  metrics: OverviewMetric[];
  attention: AttentionItem[];
  upcomingReviews: ReviewSummary[];
}

/**
 * The lens an overview is composed for.
 *
 * Deliberately not the persona type from `features/personas`: services describe
 * an audience in domain terms, so replacing the prototype persona switcher with
 * real role-based authorisation does not touch this layer.
 */
export type OverviewAudience = 'submitter' | 'reviewer' | 'governance';

export interface OverviewRequest {
  audience: OverviewAudience;
  /** The person the overview is composed for. */
  userId: Id;
}
