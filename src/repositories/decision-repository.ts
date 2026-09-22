import type {
  Condition,
  ConditionStatus,
  Decision,
  DecisionOutcome,
  Id,
  Page,
  QueryOptions,
} from '@/models';

export interface DecisionQuery extends QueryOptions {
  outcome?: DecisionOutcome[];
  architectureId?: Id;
}

export interface ConditionQuery extends QueryOptions {
  status?: ConditionStatus[];
  owner?: Id;
  decisionId?: Id;
}

/** Read access to recorded decisions and the conditions attached to them. */
export interface DecisionRepository {
  list(query?: DecisionQuery): Promise<Page<Decision>>;
  getById(id: Id): Promise<Decision | null>;
  listByArchitecture(architectureId: Id): Promise<Decision[]>;
  listConditions(query?: ConditionQuery): Promise<Page<Condition>>;
}
