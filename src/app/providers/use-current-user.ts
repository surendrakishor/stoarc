import { usePersona } from '@/features/personas';
import { useAsync } from '@/lib/use-async';
import type { User } from '@/models';
import { useRepositories } from './services-context';

/**
 * The user the application is currently acting as.
 *
 * While the prototype persona switcher is in place this follows the selected
 * persona. Once real authorisation lands, this hook resolves the signed-in
 * user from the session instead, and its consumers are unaffected.
 */
export function useCurrentUser(): {
  user: User | undefined;
  isLoading: boolean;
} {
  const { persona } = usePersona();
  const { directory } = useRepositories();
  const { data, isLoading } = useAsync(
    () => directory.getUser(persona.userId),
    [directory, persona.userId],
  );

  return { user: data ?? undefined, isLoading };
}
