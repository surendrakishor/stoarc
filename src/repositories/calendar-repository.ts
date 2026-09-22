import type { CalendarEntry, CalendarEntryKind, Id } from '@/models';

export interface CalendarQuery {
  /** Inclusive ISO date-time lower bound. */
  from?: string;
  /** Exclusive ISO date-time upper bound. */
  to?: string;
  kind?: CalendarEntryKind[];
  architectureId?: Id;
}

/** Read access to the architecture review board calendar. */
export interface CalendarRepository {
  listEntries(query?: CalendarQuery): Promise<CalendarEntry[]>;
  getEntry(id: Id): Promise<CalendarEntry | null>;
  /** Entries starting after now, soonest first. */
  listUpcoming(limit?: number): Promise<CalendarEntry[]>;
}
