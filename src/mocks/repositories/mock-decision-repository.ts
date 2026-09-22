import type { Condition, Decision, Id, Page } from '@/models';
import type {
  ConditionQuery,
  DecisionQuery,
  DecisionRepository,
} from '@/repositories';
import { mockDecisions } from '../data';
import {
  byDateDescending,
  clone,
  includedIn,
  latency,
  matchesSearch,
  paginate,
} from './support';

export class MockDecisionRepository implements DecisionRepository {
  async list(query?: DecisionQuery): Promise<Page<Decision>> {
    await latency();
    const filtered = mockDecisions
      .filter(
        (decision) =>
          includedIn(query?.outcome, decision.outcome) &&
          (!query?.architectureId ||
            decision.architectureId === query.architectureId) &&
          matchesSearch(query?.search, decision.rationale),
      )
      .sort((a, b) => byDateDescending(a.decidedAt ?? '', b.decidedAt ?? ''));

    return paginate(filtered, query);
  }

  async getById(id: Id): Promise<Decision | null> {
    await latency();
    const match = mockDecisions.find((decision) => decision.id === id);
    return match ? clone(match) : null;
  }

  async listByArchitecture(architectureId: Id): Promise<Decision[]> {
    await latency();
    return clone(
      mockDecisions
        .filter((decision) => decision.architectureId === architectureId)
        .sort((a, b) => byDateDescending(a.decidedAt ?? '', b.decidedAt ?? '')),
    );
  }

  async listConditions(query?: ConditionQuery): Promise<Page<Condition>> {
    await latency();
    const conditions: Condition[] = mockDecisions.flatMap((decision) =>
      decision.conditions.map((condition) => ({
        ...condition,
        decisionId: condition.decisionId ?? decision.id,
      })),
    );

    const filtered = conditions.filter(
      (condition) =>
        includedIn(query?.status, condition.status) &&
        (!query?.owner || condition.owner === query.owner) &&
        (!query?.decisionId || condition.decisionId === query.decisionId) &&
        matchesSearch(query?.search, condition.title, condition.evidenceRequired),
    );

    return paginate(filtered, query);
  }
}
