import type { Id, Organisation, User } from '@/models';

/**
 * People and tenant lookups.
 *
 * Named "directory" rather than "user" because a real deployment will resolve
 * these against an enterprise identity provider, not an application table.
 */
export interface DirectoryRepository {
  listUsers(): Promise<User[]>;
  getUser(id: Id): Promise<User | null>;
  getUsers(ids: Id[]): Promise<User[]>;
  getOrganisation(id?: Id): Promise<Organisation | null>;
  /** The signed-in user. Replaced by the identity provider's subject later. */
  getCurrentUser(): Promise<User>;
}
