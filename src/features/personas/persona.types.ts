import type { Id } from '@/models';
import type { OverviewAudience } from '@/services';

/**
 * PROTOTYPE ONLY.
 *
 * Personas are a demonstration device: they let us inspect the three primary
 * experiences without an identity provider. They are NOT an authorisation
 * mechanism, and nothing outside this folder may assume they are.
 *
 * When real role-based authorisation arrives, `PersonaProvider` is replaced by
 * a session provider that resolves the same `capabilities` from the signed-in
 * user's entitlements. Consumers calling `useCapability()` keep working.
 */
export type PersonaId = 'architect' | 'reviewer' | 'chair';

/** Coarse-grained abilities the UI keys off. Replaced by real entitlements. */
export type Capability =
  | 'submit-architecture'
  | 'request-assessment'
  | 'record-finding-disposition'
  | 'schedule-review'
  | 'complete-pre-read'
  | 'record-decision'
  | 'manage-assurance-profiles';

export interface PersonaDefinition {
  id: PersonaId;
  /** Name as shown in the prototype switcher. */
  name: string;
  /** What this persona is accountable for, in one line. */
  summary: string;
  /** The audience lens the overview service composes for. */
  audience: OverviewAudience;
  /** The mock user this persona is acted out as. */
  userId: Id;
  capabilities: readonly Capability[];
}
