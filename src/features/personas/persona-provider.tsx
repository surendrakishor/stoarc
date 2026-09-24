import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { PersonaContext, type PersonaContextValue } from './persona-context';
import type { Capability, PersonaId } from './persona.types';
import { DEFAULT_PERSONA_ID, PERSONAS, getPersona } from './personas';

/** Prototype-only storage key, namespaced so it is easy to find and remove. */
const STORAGE_KEY = 'prototype.persona';

function readStoredPersona(): PersonaId {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && PERSONAS.some((persona) => persona.id === stored)) {
      return stored as PersonaId;
    }
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). The default
    // persona is a perfectly good answer.
  }
  return DEFAULT_PERSONA_ID;
}

/**
 * PROTOTYPE ONLY — see `persona.types.ts`.
 *
 * Holds the persona currently being inspected. Replacing this provider with a
 * real session provider is the whole of the work to move to authorisation.
 */
export function PersonaProvider({ children }: { children: ReactNode }) {
  const [personaId, setPersonaId] = useState<PersonaId>(readStoredPersona);

  const setPersona = useCallback((id: PersonaId) => {
    setPersonaId(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Persistence is a convenience, not a requirement.
    }
  }, []);

  const value = useMemo<PersonaContextValue>(() => {
    const persona = getPersona(personaId);
    return {
      persona,
      personas: PERSONAS,
      setPersona,
      hasCapability: (capability: Capability) =>
        persona.capabilities.includes(capability),
    };
  }, [personaId, setPersona]);

  return (
    <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>
  );
}
