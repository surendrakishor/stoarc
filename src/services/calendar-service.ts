import type { CalendarQuery, RepositoryRegistry } from '@/repositories';
import type { CalendarEntrySummary } from './types';

export class CalendarService {
  private readonly repositories: RepositoryRegistry;

  constructor(repositories: RepositoryRegistry) {
    this.repositories = repositories;
  }

  async listEntrySummaries(
    query?: CalendarQuery,
  ): Promise<CalendarEntrySummary[]> {
    const { architectures, calendar, reviews } = this.repositories;
    const entries = await calendar.listEntries(query);

    return Promise.all(
      entries.map(async (entry) => {
        const review = entry.reviewId ? await reviews.getById(entry.reviewId) : null;
        const architectureId = entry.architectureId ?? review?.architectureId;
        const architecture = architectureId
          ? await architectures.getById(architectureId)
          : null;
        return {
          entry,
          review: review ?? undefined,
          architecture: architecture ?? undefined,
        } satisfies CalendarEntrySummary;
      }),
    );
  }

  listUpcoming(limit = 5) {
    return this.repositories.calendar.listUpcoming(limit);
  }
}
