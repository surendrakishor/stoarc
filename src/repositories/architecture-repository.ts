import type {
  Architecture,
  ArchitectureStatus,
  ArchitectureType,
  ArchitectureVersion,
  Criticality,
  Id,
  Page,
  QueryOptions,
} from '@/models';

export interface ArchitectureQuery extends QueryOptions {
  status?: ArchitectureStatus[];
  architectureType?: ArchitectureType[];
  criticality?: Criticality[];
  /** Restrict to architectures owned or authored by a user. */
  architect?: Id;
  owner?: Id;
}

/**
 * Read access to architectures and their submitted versions.
 *
 * Implementations must not leak their storage mechanism: the UI depends on
 * this interface only, so the mock implementation can be replaced by an HTTP
 * client without any screen being redesigned.
 */
export interface ArchitectureRepository {
  list(query?: ArchitectureQuery): Promise<Page<Architecture>>;
  getById(id: Id): Promise<Architecture | null>;
  listVersions(architectureId: Id): Promise<ArchitectureVersion[]>;
  getVersion(versionId: Id): Promise<ArchitectureVersion | null>;
  getCurrentVersion(architectureId: Id): Promise<ArchitectureVersion | null>;
}
