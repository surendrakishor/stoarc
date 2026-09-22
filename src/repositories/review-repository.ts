import type {
  Id,
  Page,
  QueryOptions,
  Review,
  ReviewStatus,
} from '@/models';

export interface ReviewQuery extends QueryOptions {
  status?: ReviewStatus[];
  architectureId?: Id;
  /** Reviews a given user is a member of. */
  memberId?: Id;
  /** ISO date-time lower and upper bounds on `scheduledAt`. */
  from?: string;
  to?: string;
}

/** Read access to architecture review board sessions and their membership. */
export interface ReviewRepository {
  list(query?: ReviewQuery): Promise<Page<Review>>;
  getById(id: Id): Promise<Review | null>;
  listByArchitecture(architectureId: Id): Promise<Review[]>;
  /** Next sessions in chronological order, soonest first. */
  listUpcoming(limit?: number): Promise<Review[]>;
}
