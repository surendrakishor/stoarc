import type { Architecture, ArchitectureVersion, Id, Page } from '@/models';
import type {
  ArchitectureQuery,
  ArchitectureRepository,
} from '@/repositories';
import { mockArchitectures, mockArchitectureVersions } from '../data';
import {
  byDateDescending,
  clone,
  includedIn,
  latency,
  matchesSearch,
  paginate,
} from './support';

export class MockArchitectureRepository implements ArchitectureRepository {
  async list(query?: ArchitectureQuery): Promise<Page<Architecture>> {
    await latency();
    const filtered = mockArchitectures
      .filter(
        (architecture) =>
          includedIn(query?.status, architecture.status) &&
          includedIn(query?.architectureType, architecture.architectureType) &&
          includedIn(query?.criticality, architecture.criticality) &&
          (!query?.architect || architecture.architect === query.architect) &&
          (!query?.owner || architecture.owner === query.owner) &&
          matchesSearch(
            query?.search,
            architecture.name,
            architecture.description,
            architecture.domain ?? '',
            ...(architecture.tags ?? []),
          ),
      )
      .sort((a, b) => byDateDescending(a.updatedAt ?? '', b.updatedAt ?? ''));

    return paginate(filtered, query);
  }

  async getById(id: Id): Promise<Architecture | null> {
    await latency();
    const match = mockArchitectures.find((item) => item.id === id);
    return match ? clone(match) : null;
  }

  async listVersions(architectureId: Id): Promise<ArchitectureVersion[]> {
    await latency();
    return clone(
      mockArchitectureVersions
        .filter((version) => version.architectureId === architectureId)
        .sort((a, b) => byDateDescending(a.submittedAt, b.submittedAt)),
    );
  }

  async getVersion(versionId: Id): Promise<ArchitectureVersion | null> {
    await latency();
    const match = mockArchitectureVersions.find(
      (version) => version.id === versionId,
    );
    return match ? clone(match) : null;
  }

  async getCurrentVersion(
    architectureId: Id,
  ): Promise<ArchitectureVersion | null> {
    await latency();
    const match = mockArchitectureVersions.find(
      (version) => version.architectureId === architectureId && version.isCurrent,
    );
    return match ? clone(match) : null;
  }
}
