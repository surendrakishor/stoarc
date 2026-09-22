/**
 * Application-level configuration.
 *
 * The product name is deliberately held in a single constant: the working name
 * "STOARC" is expected to change before launch, and nothing in the UI should
 * hard-code it. Read it via `APP_NAME` (or `appConfig.name`) everywhere —
 * including page titles, the navigation mark and any document metadata.
 */
export interface AppConfig {
  /** Product name as shown to users. */
  readonly name: string;
  /** Short form used where horizontal space is tight (e.g. collapsed nav). */
  readonly shortName: string;
  /** One-line positioning statement shown in the shell and on the home page. */
  readonly tagline: string;
  /** Used where width is constrained, such as beneath the navigation mark. */
  readonly shortTagline: string;
  /** Longer descriptor for meta tags and about surfaces. */
  readonly description: string;
  /** Displayed next to the product name in non-production builds. */
  readonly releaseStage: 'prototype' | 'preview' | 'general-availability';
  readonly version: string;
  /** Pattern used to compose the browser document title. */
  readonly documentTitleTemplate: string;
}

export const appConfig: AppConfig = {
  name: 'STOARC',
  shortName: 'ST',
  tagline: 'Architecture Assurance and Decision Intelligence',
  shortTagline: 'Architecture Assurance',
  description:
    'Understand whether conventional, cloud, integration, data, AI and agentic architectures are ready for important architectural decisions.',
  releaseStage: 'prototype',
  version: '0.1.0',
  documentTitleTemplate: '{page} · {app}',
};

export const APP_NAME = appConfig.name;

/** Composes the browser document title for a page. */
export function formatDocumentTitle(pageTitle?: string): string {
  if (!pageTitle) return appConfig.name;
  return appConfig.documentTitleTemplate
    .replace('{page}', pageTitle)
    .replace('{app}', appConfig.name);
}

/**
 * Flags for scaffolding that exists only while this is a prototype.
 *
 * Everything listed here is expected to be deleted rather than configured:
 * keeping the flags together makes the temporary surface easy to find.
 */
export const prototypeFeatures = {
  /** Persona switcher in the user menu. Replaced by real authorisation. */
  personaSwitcher: true,
  /** Banner explaining that data is synthetic. */
  syntheticDataNotice: true,
} as const;
