import type { CalendarEntry, Id } from '@/models';
import type { CalendarQuery, CalendarRepository } from '@/repositories';
import { mockCalendarEntries } from '../data';
import { byDateAscending, clone, includedIn, latency } from './support';

export class MockCalendarRepository implements CalendarRepository {
  async listEntries(query?: CalendarQuery): Promise<CalendarEntry[]> {
    await latency();
    return clone(
      mockCalendarEntries
        .filter((entry) => {
          const startsAt = new Date(entry.startsAt).getTime();
          const afterFrom =
            !query?.from || startsAt >= new Date(query.from).getTime();
          const beforeTo =
            !query?.to || startsAt < new Date(query.to).getTime();
          return (
            includedIn(query?.kind, entry.kind) &&
            (!query?.architectureId ||
              entry.architectureId === query.architectureId) &&
            afterFrom &&
            beforeTo
          );
        })
        .sort((a, b) => byDateAscending(a.startsAt, b.startsAt)),
    );
  }

  async getEntry(id: Id): Promise<CalendarEntry | null> {
    await latency();
    const match = mockCalendarEntries.find((entry) => entry.id === id);
    return match ? clone(match) : null;
  }

  async listUpcoming(limit = 5): Promise<CalendarEntry[]> {
    await latency();
    const now = Date.now();
    return clone(
      mockCalendarEntries
        .filter((entry) => new Date(entry.startsAt).getTime() >= now)
        .sort((a, b) => byDateAscending(a.startsAt, b.startsAt))
        .slice(0, limit),
    );
  }
}
