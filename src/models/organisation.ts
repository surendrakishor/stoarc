import type { Id } from './common';

/** The tenant an architecture, review and decision belongs to. */
export interface Organisation {
  id: Id;
  name: string;
  /** Short code used in identifiers and dense table cells, e.g. `NRB`. */
  shortCode: string;
  /** Regulated industries drive which assurance profiles are mandatory. */
  industry: string;
  /** Regulatory regimes the organisation operates under, e.g. `APRA CPS 234`. */
  regulatoryRegimes: string[];
  /** Assurance profile applied when an architecture does not specify one. */
  defaultAssuranceProfileId?: Id;
}
