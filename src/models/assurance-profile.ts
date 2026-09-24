import type { Id } from './common';

/** A single checkable control within an assurance profile category. */
export interface ProfileControl {
  id: Id;
  /** Stable reference used in findings and reports, e.g. `SEC-04`. */
  reference: string;
  title: string;
  description: string;
  /** What a reviewer should see before considering the control satisfied. */
  expectedEvidence?: string;
  /** Controls that must hold before a decision can be recorded. */
  mandatory?: boolean;
}

/** A grouping of controls, typically aligned to an assurance domain. */
export interface ProfileCategory {
  id: Id;
  name: string;
  description?: string;
  controls: ProfileControl[];
}

/**
 * A versioned set of expectations an architecture is assessed against.
 * Profiles are data, not code, so an organisation can evolve its assurance
 * intelligence without changing the architecture core.
 */
export interface AssuranceProfile {
  id: Id;
  name: string;
  version: string;
  description: string;
  categories: ProfileCategory[];
  /** Architecture types the profile is intended for. */
  appliesTo?: string[];
  status?: 'draft' | 'active' | 'superseded';
  owner?: Id;
}
