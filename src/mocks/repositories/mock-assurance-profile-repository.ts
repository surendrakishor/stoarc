import type { AssuranceProfile, Id, Page } from '@/models';
import type {
  AssuranceProfileQuery,
  AssuranceProfileRepository,
} from '@/repositories';
import { mockAssuranceProfiles } from '../data';
import { clone, latency, matchesSearch, paginate } from './support';

export class MockAssuranceProfileRepository
  implements AssuranceProfileRepository
{
  async list(query?: AssuranceProfileQuery): Promise<Page<AssuranceProfile>> {
    await latency();
    const filtered = mockAssuranceProfiles.filter(
      (profile) =>
        (!query?.status ||
          query.status.length === 0 ||
          (profile.status !== undefined &&
            query.status.includes(profile.status))) &&
        matchesSearch(query?.search, profile.name, profile.description),
    );
    return paginate(filtered, query);
  }

  async getById(id: Id): Promise<AssuranceProfile | null> {
    await latency();
    const match = mockAssuranceProfiles.find((profile) => profile.id === id);
    return match ? clone(match) : null;
  }
}
