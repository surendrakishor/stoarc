import type { Id } from './common';
import type { Evidence } from './evidence';

/** Assurance domain a finding belongs to. */
export type FindingCategory =
  | 'security'
  | 'data'
  | 'integration'
  | 'operability'
  | 'resilience'
  | 'cost'
  | 'ai-assurance'
  | 'agentic-control'
  | 'compliance';

/**
 * Severity of a finding. Phrased as consequence for a decision rather than as
 * an alarm: `blocking` means a decision cannot safely be taken yet.
 */
export type FindingSeverity = 'blocking' | 'significant' | 'moderate' | 'minor';

/** How much the platform trusts its own reading of the evidence. */
export type FindingConfidence = 'high' | 'medium' | 'low';

/**
 * Human disposition of a finding. The platform advises; a person decides what
 * the finding means, so disposition is always recorded by a user.
 */
export type FindingDisposition =
  | 'open'
  | 'accepted'
  | 'mitigated'
  | 'risk-accepted'
  | 'not-applicable'
  | 'disputed';

export interface Finding {
  id: Id;
  title: string;
  category: FindingCategory;
  severity: FindingSeverity;
  description: string;
  /** Why the finding matters to the decision at hand, in plain language. */
  whyItMatters: string;
  /** Citations supporting the finding. A finding without evidence is a draft. */
  evidence: Evidence[];
  /** Reference of the assurance profile control that raised the finding. */
  profileControl: string;
  confidence: FindingConfidence;
  disposition: FindingDisposition;
  assessmentId?: Id;
  /** Who recorded the current disposition. */
  dispositionBy?: Id;
  dispositionNote?: string;
}
