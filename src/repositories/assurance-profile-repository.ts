import type { AssuranceProfile, Id, Page, QueryOptions } from '@/models';

export interface AssuranceProfileQuery extends QueryOptions {
  status?: NonNullable<AssuranceProfile['status']>[];
}

/** Read access to the versioned assurance profiles. */
export interface AssuranceProfileRepository {
  list(query?: AssuranceProfileQuery): Promise<Page<AssuranceProfile>>;
  getById(id: Id): Promise<AssuranceProfile | null>;
}
