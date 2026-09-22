/** Shared primitives used across the domain model. */

/** Opaque identifier. Kept as a string so that a real backend can supply
 *  UUIDs, ULIDs or slugs without changing the model. */
export type Id = string;

/** ISO-8601 timestamp, e.g. `2026-03-14T09:30:00.000Z`. */
export type IsoDateTime = string;

/** ISO-8601 calendar date, e.g. `2026-03-14`. */
export type IsoDate = string;

/** A reference to an entity that has been summarised rather than embedded. */
export interface EntityRef {
  id: Id;
  name: string;
}

/** Cursor-free pagination envelope. Repositories return this for list reads so
 *  that swapping a mock for a paged HTTP API does not change call sites. */
export interface Page<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
}

/** Options accepted by every list-style repository method. */
export interface QueryOptions {
  offset?: number;
  limit?: number;
  /** Free-text search across the entity's principal display fields. */
  search?: string;
}
