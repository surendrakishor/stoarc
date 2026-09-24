import type { CalendarEntry } from '@/models';
import { addMinutes, daysFromNow, nextWeekday } from './clock';

/**
 * The board sits weekly on a Wednesday. Submission deadlines fall two working
 * days earlier, and pre-read windows sit between the two.
 */
function boardSlot(
  weeksAhead: number,
  hour: number,
): { startsAt: string; endsAt: string } {
  const startsAt = nextWeekday(3, weeksAhead, hour);
  return { startsAt, endsAt: addMinutes(startsAt, 120) };
}

const thisWeek = boardSlot(0, 10);
const nextWeek = boardSlot(1, 10);
const weekAfter = boardSlot(2, 10);
const inFourWeeks = boardSlot(4, 10);

export const mockCalendarEntries: CalendarEntry[] = [
  {
    id: 'cal-board-w0',
    title: 'Architecture Review Board',
    kind: 'review-board',
    startsAt: thisWeek.startsAt,
    endsAt: thisWeek.endsAt,
    location: 'Board Room 2 · Hybrid',
    capacity: 4,
    booked: 2,
    reviewId: 'rev-claims-board',
  },
  {
    id: 'cal-preread-w0',
    title: 'Pre-read window closes',
    kind: 'pre-read',
    startsAt: daysFromNow(-1, 17, 0),
    endsAt: daysFromNow(-1, 17, 30),
    reviewId: 'rev-claims-board',
    architectureId: 'arc-claims-copilot',
  },
  {
    id: 'cal-board-w1',
    title: 'Architecture Review Board',
    kind: 'review-board',
    startsAt: nextWeek.startsAt,
    endsAt: nextWeek.endsAt,
    location: 'Board Room 2 · Hybrid',
    capacity: 4,
    booked: 1,
    reviewId: 'rev-member-board',
  },
  {
    id: 'cal-submission-w1',
    title: 'Submission deadline — next board',
    kind: 'submission-deadline',
    startsAt: nextWeekday(1, 1, 17),
    endsAt: nextWeekday(1, 1, 17),
  },
  {
    id: 'cal-board-w2',
    title: 'Architecture Review Board',
    kind: 'review-board',
    startsAt: weekAfter.startsAt,
    endsAt: weekAfter.endsAt,
    location: 'Board Room 2 · Hybrid',
    capacity: 4,
    booked: 1,
    reviewId: 'rev-lakehouse-board',
  },
  {
    id: 'cal-board-w4',
    title: 'Architecture Review Board',
    kind: 'review-board',
    startsAt: inFourWeeks.startsAt,
    endsAt: inFourWeeks.endsAt,
    location: 'Board Room 1',
    capacity: 4,
    booked: 1,
    reviewId: 'rev-payments-board',
  },
  {
    id: 'cal-checkpoint-partner',
    title: 'Condition checkpoint — Broker Partner API Gateway',
    kind: 'decision-checkpoint',
    startsAt: daysFromNow(17, 9, 0),
    endsAt: daysFromNow(17, 9, 30),
    architectureId: 'arc-partner-gateway',
  },
  {
    id: 'cal-board-past-1',
    title: 'Architecture Review Board',
    kind: 'review-board',
    startsAt: daysFromNow(-1, 14, 0),
    endsAt: daysFromNow(-1, 16, 0),
    location: 'Board Room 1',
    capacity: 4,
    booked: 3,
    reviewId: 'rev-policy-board',
  },
  {
    id: 'cal-board-past-2',
    title: 'Architecture Review Board',
    kind: 'review-board',
    startsAt: daysFromNow(-4, 10, 0),
    endsAt: daysFromNow(-4, 12, 0),
    location: 'Board Room 1',
    capacity: 4,
    booked: 2,
    reviewId: 'rev-partner-board',
  },
];
