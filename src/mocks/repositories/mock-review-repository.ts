import type { Id, Page, Review } from '@/models';
import type { ReviewQuery, ReviewRepository } from '@/repositories';
import { mockReviews } from '../data';
import {
  byDateAscending,
  clone,
  includedIn,
  latency,
  paginate,
} from './support';

export class MockReviewRepository implements ReviewRepository {
  async list(query?: ReviewQuery): Promise<Page<Review>> {
    await latency();
    const filtered = mockReviews
      .filter((review) => {
        const scheduled = new Date(review.scheduledAt).getTime();
        const afterFrom = !query?.from || scheduled >= new Date(query.from).getTime();
        const beforeTo = !query?.to || scheduled < new Date(query.to).getTime();
        const hasMember =
          !query?.memberId ||
          review.members.some((member) => member.id === query.memberId);
        return (
          includedIn(query?.status, review.status) &&
          (!query?.architectureId ||
            review.architectureId === query.architectureId) &&
          afterFrom &&
          beforeTo &&
          hasMember
        );
      })
      .sort((a, b) => byDateAscending(a.scheduledAt, b.scheduledAt));

    return paginate(filtered, query);
  }

  async getById(id: Id): Promise<Review | null> {
    await latency();
    const match = mockReviews.find((review) => review.id === id);
    return match ? clone(match) : null;
  }

  async listByArchitecture(architectureId: Id): Promise<Review[]> {
    await latency();
    return clone(
      mockReviews
        .filter((review) => review.architectureId === architectureId)
        .sort((a, b) => byDateAscending(a.scheduledAt, b.scheduledAt)),
    );
  }

  async listUpcoming(limit = 5): Promise<Review[]> {
    await latency();
    const now = Date.now();
    return clone(
      mockReviews
        .filter((review) => new Date(review.scheduledAt).getTime() >= now)
        .sort((a, b) => byDateAscending(a.scheduledAt, b.scheduledAt))
        .slice(0, limit),
    );
  }
}
