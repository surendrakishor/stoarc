/**
 * Date helpers for the mock data set.
 *
 * Fixtures are expressed relative to "now" so the prototype always shows a
 * plausible calendar and review pipeline, whenever it is opened.
 */

function atTime(date: Date, hours: number, minutes = 0): Date {
  const next = new Date(date);
  next.setHours(hours, minutes, 0, 0);
  return next;
}

export function daysFromNow(days: number, hours = 9, minutes = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return atTime(date, hours, minutes).toISOString();
}

export function dateFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Next occurrence of a weekday (1 = Monday … 5 = Friday), `weeks` ahead. */
export function nextWeekday(weekday: number, weeks = 0, hours = 10): string {
  const date = new Date();
  const delta = (weekday - date.getDay() + 7) % 7 || 7;
  date.setDate(date.getDate() + delta + weeks * 7);
  return atTime(date, hours).toISOString();
}

export function addMinutes(iso: string, minutes: number): string {
  return new Date(new Date(iso).getTime() + minutes * 60_000).toISOString();
}
