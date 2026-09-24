# Personas (prototype only)

This folder exists so that the three primary experiences can be inspected
without an identity provider:

1. Architect / Submitter
2. ARB Member / Reviewer
3. ARB Chair / Architecture Governance Lead

## Rules

- Nothing outside this folder imports `PERSONAS`, `PersonaId` or the switcher.
- Screens ask `useCapability('record-decision')`, never
  `persona.id === 'chair'`.
- The switcher is rendered only from the user menu, behind
  `prototypeFeatures.personaSwitcher`.

## Replacing it

Swap `PersonaProvider` for a session provider that resolves `capabilities`
from the signed-in user's entitlements, and delete `persona-switcher.tsx`.
Every `useCapability()` call site continues to work unchanged.
