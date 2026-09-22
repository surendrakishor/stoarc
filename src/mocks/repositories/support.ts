import type { Page, QueryOptions } from '@/models';

/**
 * Simulated network latency, so the UI is built against asynchronous data from
 * the outset rather than discovering loading states when a real API arrives.
 */
const MIN_LATENCY_MS = 90;
const MAX_LATENCY_MS = 220;

export function latency(): Promise<void> {
  const ms =
    MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Deep clone, so callers cannot mutate the fixture set by accident. */
export function clone<T>(value: T): T {
  return structuredClone(value);
}

export function matchesSearch(term: string | undefined, ...fields: string[]) {
  if (!term?.trim()) return true;
  const needle = term.trim().toLowerCase();
  return fields.some((field) => field?.toLowerCase().includes(needle));
}

export function includedIn<T>(filter: T[] | undefined, value: T): boolean {
  return !filter || filter.length === 0 || filter.includes(value);
}

export function paginate<T>(items: T[], options?: QueryOptions): Page<T> {
  const offset = options?.offset ?? 0;
  const limit = options?.limit ?? items.length;
  return {
    items: clone(items.slice(offset, offset + limit)),
    total: items.length,
    offset,
    limit,
  };
}

export function byDateAscending(a: string, b: string): number {
  return new Date(a).getTime() - new Date(b).getTime();
}

export function byDateDescending(a: string, b: string): number {
  return new Date(b).getTime() - new Date(a).getTime();
}
