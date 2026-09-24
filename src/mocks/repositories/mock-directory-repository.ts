import type { Id, Organisation, User } from '@/models';
import type { DirectoryRepository } from '@/repositories';
import {
  mockCurrentOrganisationId,
  mockOrganisations,
  mockUsers,
} from '../data';
import { clone, latency } from './support';

/**
 * The signed-in user in the prototype. Real deployments resolve this from the
 * identity provider; the persona switcher overlays a different lens on top of
 * it without changing who the user actually is.
 */
export const MOCK_SIGNED_IN_USER_ID = 'usr-hale';

export class MockDirectoryRepository implements DirectoryRepository {
  async listUsers(): Promise<User[]> {
    await latency();
    return clone(mockUsers);
  }

  async getUser(id: Id): Promise<User | null> {
    await latency();
    const match = mockUsers.find((user) => user.id === id);
    return match ? clone(match) : null;
  }

  async getUsers(ids: Id[]): Promise<User[]> {
    await latency();
    const wanted = new Set(ids);
    return clone(mockUsers.filter((user) => wanted.has(user.id)));
  }

  async getOrganisation(id?: Id): Promise<Organisation | null> {
    await latency();
    const target = id ?? mockCurrentOrganisationId;
    const match = mockOrganisations.find(
      (organisation) => organisation.id === target,
    );
    return match ? clone(match) : null;
  }

  async getCurrentUser(): Promise<User> {
    await latency();
    const match = mockUsers.find((user) => user.id === MOCK_SIGNED_IN_USER_ID);
    if (!match) {
      throw new Error('Mock directory is missing the signed-in user fixture.');
    }
    return clone(match);
  }
}
