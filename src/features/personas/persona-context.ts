import { createContext, useContext } from 'react';
import type { Capability, PersonaDefinition, PersonaId } from './persona.types';

export interface PersonaContextValue {
  persona: PersonaDefinition;
  personas: readonly PersonaDefinition[];
  setPersona: (id: PersonaId) => void;
  hasCapability: (capability: Capability) => boolean;
}

export const PersonaContext = createContext<PersonaContextValue | null>(null);

export function usePersona(): PersonaContextValue {
  const value = useContext(PersonaContext);
  if (!value) {
    throw new Error('usePersona must be used within a PersonaProvider.');
  }
  return value;
}

/**
 * Capability check for the UI.
 *
 * Call sites read as authorisation and will keep reading that way once the
 * prototype persona source is swapped for real entitlements — which is the
 * point of routing every check through here.
 */
export function useCapability(capability: Capability): boolean {
  return usePersona().hasCapability(capability);
}
