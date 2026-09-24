import type { Page } from '@/models';
import type {
  ConditionQuery,
  DecisionQuery,
  RepositoryRegistry,
} from '@/repositories';
import type { ConditionSummary, DecisionSummary } from './types';

export class DecisionService {
  private readonly repositories: RepositoryRegistry;

  constructor(repositories: RepositoryRegistry) {
    this.repositories = repositories;
  }

  async listSummaries(query?: DecisionQuery): Promise<Page<DecisionSummary>> {
    const { architectures, decisions, directory } = this.repositories;
    const page = await decisions.list(query);

    const items = await Promise.all(
      page.items.map(async (decision) => {
        const [architecture, recordedByUser] = await Promise.all([
          architectures.getById(decision.architectureId),
          decision.recordedBy
            ? directory.getUser(decision.recordedBy)
            : Promise.resolve(null),
        ]);
        return {
          decision,
          architecture: architecture ?? undefined,
          recordedByUser: recordedByUser ?? undefined,
          openConditions: decision.conditions.filter(
            (condition) =>
              condition.status !== 'met' && condition.status !== 'waived',
          ).length,
        } satisfies DecisionSummary;
      }),
    );

    return { ...page, items };
  }

  async listConditionSummaries(
    query?: ConditionQuery,
  ): Promise<Page<ConditionSummary>> {
    const { architectures, decisions, directory } = this.repositories;
    const page = await decisions.listConditions(query);

    const items = await Promise.all(
      page.items.map(async (condition) => {
        const decision = condition.decisionId
          ? await decisions.getById(condition.decisionId)
          : null;
        const [architecture, ownerUser] = await Promise.all([
          decision
            ? architectures.getById(decision.architectureId)
            : Promise.resolve(null),
          directory.getUser(condition.owner),
        ]);
        return {
          condition,
          decision: decision ?? undefined,
          architecture: architecture ?? undefined,
          ownerUser: ownerUser ?? undefined,
        } satisfies ConditionSummary;
      }),
    );

    return { ...page, items };
  }
}
