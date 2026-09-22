import type { AssuranceProfileQuery, RepositoryRegistry } from '@/repositories';

export class AssuranceProfileService {
  private readonly repositories: RepositoryRegistry;

  constructor(repositories: RepositoryRegistry) {
    this.repositories = repositories;
  }

  list(query?: AssuranceProfileQuery) {
    return this.repositories.assuranceProfiles.list(query);
  }

  getById(id: string) {
    return this.repositories.assuranceProfiles.getById(id);
  }

  /** Total controls across every category, used for profile summaries. */
  async countControls(id: string): Promise<number> {
    const profile = await this.repositories.assuranceProfiles.getById(id);
    if (!profile) return 0;
    return profile.categories.reduce(
      (total, category) => total + category.controls.length,
      0,
    );
  }
}
