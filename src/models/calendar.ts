import type { Id, IsoDateTime } from './common';

/** Kinds of entry shown on the architecture review board calendar. */
export type CalendarEntryKind =
  | 'review-board'
  | 'pre-read'
  | 'submission-deadline'
  | 'decision-checkpoint';

/**
 * A scheduled item on the ARB calendar. Calendar entries are derived from
 * reviews and submission deadlines but are modelled separately so that the
 * calendar can later be backed by an enterprise scheduling system.
 */
export interface CalendarEntry {
  id: Id;
  title: string;
  kind: CalendarEntryKind;
  startsAt: IsoDateTime;
  endsAt: IsoDateTime;
  reviewId?: Id;
  architectureId?: Id;
  /** Board slot capacity, where the entry is a review board session. */
  capacity?: number;
  /** Number of architectures already scheduled into the slot. */
  booked?: number;
  location?: string;
}
