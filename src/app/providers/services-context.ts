import { createContext, useContext } from 'react';
import type { RepositoryRegistry } from '@/repositories';
import type { ServiceRegistry } from '@/services';

export interface ServicesContextValue {
  services: ServiceRegistry;
  repositories: RepositoryRegistry;
}

export const ServicesContext = createContext<ServicesContextValue | null>(null);

/** The services a screen is allowed to reach for. */
export function useServices(): ServiceRegistry {
  const value = useContext(ServicesContext);
  if (!value) {
    throw new Error('useServices must be used within a ServicesProvider.');
  }
  return value.services;
}

/** Escape hatch for the rare screen that needs a repository directly. */
export function useRepositories(): RepositoryRegistry {
  const value = useContext(ServicesContext);
  if (!value) {
    throw new Error('useRepositories must be used within a ServicesProvider.');
  }
  return value.repositories;
}
