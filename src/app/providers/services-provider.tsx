import { useMemo, type ReactNode } from 'react';
import { createMockRepositories } from '@/mocks/repositories';
import type { RepositoryRegistry } from '@/repositories';
import { createServices } from '@/services';
import { ServicesContext, type ServicesContextValue } from './services-context';

interface ServicesProviderProps {
  children: ReactNode;
  /**
   * Repositories to use. Defaults to the in-memory mocks; tests and, later, the
   * real application pass HTTP-backed implementations here instead.
   */
  repositories?: RepositoryRegistry;
}

/**
 * Injects the data layer at the application root.
 *
 * Screens never construct a repository and never import a mock: they ask for a
 * service through `useServices()`, which is what keeps the mock-to-API swap a
 * one-line change.
 */
export function ServicesProvider({
  children,
  repositories,
}: ServicesProviderProps) {
  const value = useMemo<ServicesContextValue>(() => {
    const registry = repositories ?? createMockRepositories();
    return { repositories: registry, services: createServices(registry) };
  }, [repositories]);

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
}
