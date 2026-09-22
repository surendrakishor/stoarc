import type { ReactNode } from 'react';
import { PersonaProvider } from '@/features/personas';
import { ServicesProvider } from './services-provider';
import { ThemeProvider } from './theme-provider';

/**
 * Application-wide providers, composed once.
 *
 * `PersonaProvider` is the prototype stand-in for a session provider and sits
 * innermost deliberately: it is the piece expected to be replaced, and it
 * depends on nothing above it but the data layer.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ServicesProvider>
        <PersonaProvider>{children}</PersonaProvider>
      </ServicesProvider>
    </ThemeProvider>
  );
}
