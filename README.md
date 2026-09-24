# STOARC

Architecture Assurance and Decision Intelligence Platform.

> **Working name.** `STOARC` is a placeholder. The product name lives in one
> constant — `appConfig.name` in `src/app/config/app.config.ts` — and every
> surface, including the browser title and the navigation mark, reads it from
> there.

This repository currently contains the **frontend foundation**: design tokens,
the application shell, routing, reusable accessible components, the typed
domain model, the repository abstraction and its mock implementations. The
detailed screens are built in later increments.

## Purpose

The platform helps architects and architecture reviewers understand whether
conventional, cloud, integration, data, AI and agentic architectures are ready
for important architectural decisions.

Its principles shape the code as much as the interface:

- AI advises. The platform controls. Humans decide.
- Evidence before assertion.
- Authorisation before retrieval.
- Stable architecture core, evolvable assurance intelligence.
- AI systems are architecture, not an exception to architecture.
- Simple enough for one architect, governable enough for an enterprise.
- Reduce governance bureaucracy rather than digitising more bureaucracy.

## Getting started

```bash
npm install
npm run dev        # development server
npm run build      # typecheck and production build
npm run typecheck  # types only
npm run lint       # ESLint
npm run preview    # serve the production build
```

Requires Node 20.19+ or 22.12+.

### Static preview build

To produce a bundle that runs from any static host or subpath — no server-side
URL rewriting required:

```bash
VITE_ROUTER=hash VITE_BASE=./ npm run build -- --outDir dist-preview
```

`VITE_ROUTER=hash` switches the router to hash URLs (`/#/architectures`) so
deep links resolve without a rewrite rule. The application's own build is
unaffected and keeps ordinary paths.

## Architecture

```
src/
  app/            application composition: config, providers, router
  models/         domain types — no behaviour, no framework
  repositories/   data access interfaces (the seam a real API plugs into)
  mocks/          synthetic fixtures and in-memory repository implementations
  services/       use-case reads that compose repositories for screens
  components/     reusable presentation — ui/ primitives, layout/ shell
  features/       domain-facing composites (navigation, overview, personas)
  pages/          route-level screens
  lib/            formatting, status vocabulary, small hooks
  styles/         design tokens and global styles
```

### The rules that matter

**Screens never touch mock data.** A page asks for a service through
`useServices()`; the service reads through repository interfaces; the mock
implementations are injected once, at the root, by `ServicesProvider`. Nothing
under `pages/` or `features/` imports from `mocks/`.

**Replacing the mocks is a one-file change.** Implement the interfaces in
`src/repositories/` against your API and pass the registry in:

```tsx
<ServicesProvider repositories={createHttpRepositories(apiClient)}>
```

`createMockRepositories()` in `src/mocks/repositories/index.ts` is the only
place the fixtures are wired together.

**Status vocabulary lives in one place.** `src/lib/status.ts` maps every domain
status onto its label and tone — Ready, Ready with Attention, Needs Attention,
Blocked, Awaiting Review, In Review, Decision Recorded. The wording is
deliberately calm; `blocked` states that a decision cannot safely be taken yet,
which is a fact rather than an alarm.

**Design tokens are the only source of colour.** `src/styles/tokens.css`
declares semantic variables (surface, border, ink, accent, status-\*) for light
and dark, and `src/styles/index.css` exposes them to Tailwind. Components use
the semantic utilities (`bg-surface`, `text-ink-muted`, `border-border-subtle`)
and never raw hex values.

### Repositories

| Interface                    | Covers                                     |
| ---------------------------- | ------------------------------------------ |
| `ArchitectureRepository`     | Architectures and their submitted versions |
| `AssessmentRepository`       | Readiness assessments and findings         |
| `ReviewRepository`           | Review board sessions and membership       |
| `CalendarRepository`         | The ARB calendar                           |
| `DecisionRepository`         | Decisions and their conditions             |
| `AssuranceProfileRepository` | Versioned assurance profiles               |
| `DirectoryRepository`        | People and tenant lookups                  |

All reads are asynchronous and the mocks add realistic latency, so screens are
written against loading states from the outset.

## Personas (prototype only)

Three experiences are supported: Architect / Submitter, ARB Member / Reviewer,
and ARB Chair / Architecture Governance Lead. A persona switcher in the account
menu exists **for demonstration only** and is isolated in
`src/features/personas/` — see the README there. Screens ask
`useCapability('record-decision')`, never `persona.id === 'chair'`, so
replacing the switcher with real role-based authorisation does not touch them.

## Navigation

Home, Architectures, Assessments, Reviews, ARB Calendar, Decisions, Assurance
Profiles, Settings. Future modules such as Portfolio Intelligence and
Architecture Memory are deliberately absent until they exist.

## Data

All data in this prototype is synthetic. It describes a fictional regulated
insurer and is served through the same interfaces a real backend will
implement. No backend exists yet.
