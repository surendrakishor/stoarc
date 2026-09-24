import type {
  ArchitectureStatus,
  ArchitectureType,
  ConditionStatus,
  Criticality,
  DecisionOutcome,
  FindingDisposition,
  FindingSeverity,
  MemberAvailability,
  MemberReviewStatus,
  ReadinessStatus,
  ReviewStatus,
  UserRole,
} from '@/models';

/**
 * Presentation tones.
 *
 * Tones are intentionally few and calm. There is no "danger" tone: `blocked`
 * means a decision cannot safely be taken yet, which is a statement of fact
 * rather than an alarm.
 */
export type Tone =
  | 'neutral'
  | 'info'
  | 'ready'
  | 'attention'
  | 'needs'
  | 'blocked';

export interface StatusPresentation {
  label: string;
  tone: Tone;
  /** One-line explanation, surfaced as a title attribute or helper text. */
  description?: string;
}

export const READINESS_STATUS: Record<ReadinessStatus, StatusPresentation> = {
  ready: {
    label: 'Ready',
    tone: 'ready',
    description: 'The evidence supports taking the decision.',
  },
  'ready-with-attention': {
    label: 'Ready with Attention',
    tone: 'attention',
    description: 'The decision can proceed, with points to note on the record.',
  },
  'needs-attention': {
    label: 'Needs Attention',
    tone: 'needs',
    description: 'Evidence is missing or unresolved for this decision.',
  },
  blocked: {
    label: 'Blocked',
    tone: 'blocked',
    description: 'A decision cannot safely be taken until this is addressed.',
  },
};

export const ARCHITECTURE_STATUS: Record<
  ArchitectureStatus,
  StatusPresentation
> = {
  draft: { label: 'Draft', tone: 'neutral' },
  'awaiting-review': { label: 'Awaiting Review', tone: 'info' },
  'in-review': { label: 'In Review', tone: 'info' },
  'decision-recorded': { label: 'Decision Recorded', tone: 'ready' },
  archived: { label: 'Archived', tone: 'neutral' },
};

export const REVIEW_STATUS: Record<ReviewStatus, StatusPresentation> = {
  'awaiting-review': { label: 'Awaiting Review', tone: 'info' },
  'in-review': { label: 'In Review', tone: 'info' },
  'decision-recorded': { label: 'Decision Recorded', tone: 'ready' },
  deferred: { label: 'Deferred', tone: 'attention' },
  cancelled: { label: 'Cancelled', tone: 'neutral' },
};

export const DECISION_OUTCOME: Record<DecisionOutcome, StatusPresentation> = {
  approved: { label: 'Approved', tone: 'ready' },
  'approved-with-conditions': {
    label: 'Approved with Conditions',
    tone: 'attention',
  },
  deferred: { label: 'Deferred', tone: 'needs' },
  'not-approved': { label: 'Not Approved', tone: 'blocked' },
  noted: { label: 'Noted', tone: 'neutral' },
};

export const CONDITION_STATUS: Record<ConditionStatus, StatusPresentation> = {
  open: { label: 'Open', tone: 'neutral' },
  'in-progress': { label: 'In Progress', tone: 'info' },
  'evidence-submitted': { label: 'Evidence Submitted', tone: 'info' },
  met: { label: 'Met', tone: 'ready' },
  overdue: { label: 'Past Due', tone: 'needs' },
  waived: { label: 'Waived', tone: 'neutral' },
};

export const FINDING_SEVERITY: Record<FindingSeverity, StatusPresentation> = {
  blocking: {
    label: 'Blocking',
    tone: 'blocked',
    description: 'Prevents a decision being taken on this version.',
  },
  significant: { label: 'Significant', tone: 'needs' },
  moderate: { label: 'Moderate', tone: 'attention' },
  minor: { label: 'Minor', tone: 'neutral' },
};

export const FINDING_DISPOSITION: Record<
  FindingDisposition,
  StatusPresentation
> = {
  open: { label: 'Open', tone: 'neutral' },
  accepted: { label: 'Accepted', tone: 'info' },
  mitigated: { label: 'Mitigated', tone: 'ready' },
  'risk-accepted': { label: 'Risk Accepted', tone: 'attention' },
  'not-applicable': { label: 'Not Applicable', tone: 'neutral' },
  disputed: { label: 'Disputed', tone: 'needs' },
};

export const MEMBER_AVAILABILITY: Record<
  MemberAvailability,
  StatusPresentation
> = {
  available: { label: 'Available', tone: 'ready' },
  tentative: { label: 'Tentative', tone: 'attention' },
  unavailable: { label: 'Unavailable', tone: 'needs' },
  'awaiting-response': { label: 'Awaiting Response', tone: 'neutral' },
};

export const MEMBER_REVIEW_STATUS: Record<
  MemberReviewStatus,
  StatusPresentation
> = {
  'not-started': { label: 'Not Started', tone: 'neutral' },
  'in-progress': { label: 'In Progress', tone: 'info' },
  complete: { label: 'Complete', tone: 'ready' },
  delegated: { label: 'Delegated', tone: 'info' },
};

export const ARCHITECTURE_TYPE_LABEL: Record<ArchitectureType, string> = {
  conventional: 'Conventional',
  cloud: 'Cloud',
  integration: 'Integration',
  data: 'Data',
  ai: 'AI',
  agentic: 'Agentic',
};

export const CRITICALITY: Record<Criticality, StatusPresentation> = {
  'mission-critical': { label: 'Mission critical', tone: 'needs' },
  high: { label: 'High', tone: 'attention' },
  moderate: { label: 'Moderate', tone: 'neutral' },
  low: { label: 'Low', tone: 'neutral' },
};

export const USER_ROLE_LABEL: Record<UserRole, string> = {
  architect: 'Architect',
  reviewer: 'Reviewer',
  chair: 'ARB Chair',
  'security-lead': 'Security Lead',
  'data-lead': 'Data Lead',
  'ai-assurance-lead': 'AI Assurance Lead',
  observer: 'Observer',
};

/** Maps the overview metric tone vocabulary onto presentation tones. */
export function toneFromReadiness(
  status: ReadinessStatus | 'neutral' | undefined,
): Tone {
  if (!status || status === 'neutral') return 'neutral';
  return READINESS_STATUS[status].tone;
}
