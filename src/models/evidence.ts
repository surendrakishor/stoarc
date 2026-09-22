import type { Id } from './common';

/**
 * A traceable citation back into a submitted artefact.
 *
 * Evidence exists so that every assertion the platform surfaces can be checked
 * against the source material. Assertions without evidence are not shown.
 */
export interface Evidence {
  id: Id;
  /** Artefact the excerpt was drawn from, e.g. `Solution Overview v2.1.pdf`. */
  artefactName: string;
  /** Section or heading within the artefact. */
  section: string;
  /** Verbatim extract. Never paraphrased. */
  excerpt: string;
  /** Where in the artefact the excerpt sits, e.g. `p. 14` or `slide 7`. */
  location: string;
  /** Optional deep link into the artefact viewer. */
  href?: string;
}
