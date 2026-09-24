import type { PersonaDefinition, PersonaId } from './persona.types';

/**
 * The three personas the platform is designed around. Kept deliberately small:
 * more roles exist in the domain model, but these are the three experiences.
 */
export const PERSONAS: readonly PersonaDefinition[] = [
  {
    id: 'architect',
    name: 'Architect / Submitter',
    summary: 'Prepares architectures and evidence for a decision.',
    audience: 'submitter',
    userId: 'usr-hale',
    capabilities: [
      'submit-architecture',
      'request-assessment',
      'record-finding-disposition',
    ],
  },
  {
    id: 'reviewer',
    name: 'ARB Member / Reviewer',
    summary: 'Reads submissions ahead of the board and forms a view.',
    audience: 'reviewer',
    userId: 'usr-mensah',
    capabilities: ['complete-pre-read', 'record-finding-disposition'],
  },
  {
    id: 'chair',
    name: 'ARB Chair / Governance Lead',
    summary: 'Runs the board, records decisions and owns the profiles.',
    audience: 'governance',
    userId: 'usr-lindqvist',
    capabilities: [
      'schedule-review',
      'complete-pre-read',
      'record-finding-disposition',
      'record-decision',
      'manage-assurance-profiles',
    ],
  },
];

export const DEFAULT_PERSONA_ID: PersonaId = 'architect';

export function getPersona(id: PersonaId): PersonaDefinition {
  return PERSONAS.find((persona) => persona.id === id) ?? PERSONAS[0];
}
