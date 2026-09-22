import type { Id } from './common';

/**
 * Functional roles recognised by the platform.
 *
 * Roles are domain facts about a person. The prototype persona switcher is a
 * separate, deliberately isolated concept — see `features/personas`.
 */
export type UserRole =
  | 'architect'
  | 'reviewer'
  | 'chair'
  | 'security-lead'
  | 'data-lead'
  | 'ai-assurance-lead'
  | 'observer';

export interface User {
  id: Id;
  name: string;
  role: UserRole;
  /** Avatar image URL. When absent the UI falls back to initials. */
  avatar?: string;
  email?: string;
  jobTitle?: string;
  organisationId?: Id;
}
