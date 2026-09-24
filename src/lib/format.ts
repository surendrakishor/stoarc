const LOCALE = 'en-GB';

export function formatDate(value?: string): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateShort(value?: string): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(LOCALE, {
    day: 'numeric',
    month: 'short',
  });
}

export function formatDateTime(value?: string): string {
  if (!value) return '—';
  return new Date(value).toLocaleString(LOCALE, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTime(value?: string): string {
  if (!value) return '—';
  return new Date(value).toLocaleTimeString(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Relative day phrasing for calendar and review contexts. Kept factual:
 * "in 3 days", never "hurry".
 */
export function formatRelativeDays(value?: string): string {
  if (!value) return '—';
  const target = new Date(value);
  const startOfDay = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const days = Math.round(
    (startOfDay(target) - startOfDay(new Date())) / 86_400_000,
  );

  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days === -1) return 'yesterday';
  if (days > 1) return `in ${days} days`;
  return `${Math.abs(days)} days ago`;
}

/** Initials fallback for avatars, capped at two characters. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** Turns `ready-with-attention` into `Ready with attention`. */
export function humanise(value: string): string {
  const spaced = value.replace(/[-_]/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function formatPercentage(value?: number): string {
  if (value === undefined || Number.isNaN(value)) return '—';
  return `${Math.round(value)}%`;
}
