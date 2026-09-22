import type { Decision } from '@/models';
import { dateFromNow, daysFromNow } from './clock';

export const mockDecisions: Decision[] = [
  {
    id: 'dec-partner-16',
    architectureId: 'arc-partner-gateway',
    architectureVersionId: 'ver-partner-16',
    reviewId: 'rev-partner-board',
    outcome: 'approved-with-conditions',
    rationale:
      'The board is satisfied that partner exposure is bounded and that the authorisation model holds at the edge. Approval is conditional on the shared quota counter being evidenced in production and on a partner offboarding runbook being lodged.',
    decidedAt: daysFromNow(-4, 11, 15),
    recordedBy: 'usr-lindqvist',
    endorsedBy: ['usr-lindqvist', 'usr-mensah', 'usr-devlin'],
    reviewBy: dateFromNow(178),
    conditions: [
      {
        id: 'cnd-partner-quota',
        decisionId: 'dec-partner-16',
        title: 'Evidence shared partner quota enforcement in production',
        owner: 'usr-okafor',
        due: dateFromNow(17),
        evidenceRequired:
          'Load test showing a partner quota held constant across a scale-out event.',
        status: 'in-progress',
      },
      {
        id: 'cnd-partner-offboarding',
        decisionId: 'dec-partner-16',
        title: 'Lodge partner offboarding runbook',
        owner: 'usr-devlin',
        due: dateFromNow(-3),
        evidenceRequired:
          'Runbook covering credential revocation and in-flight transaction handling.',
        status: 'overdue',
        notes: 'Draft circulated; awaiting operations sign-off.',
      },
    ],
  },
  {
    id: 'dec-document-12',
    architectureId: 'arc-document-ingestion',
    architectureVersionId: 'ver-document-12',
    reviewId: 'rev-document-board',
    outcome: 'approved',
    rationale:
      'A contained change with a manual queue behind the classification step. No conditions were considered necessary.',
    decidedAt: daysFromNow(-11, 10, 40),
    recordedBy: 'usr-lindqvist',
    endorsedBy: ['usr-lindqvist', 'usr-devlin'],
    conditions: [],
  },
  {
    id: 'dec-claims-20',
    architectureId: 'arc-claims-copilot',
    architectureVersionId: 'ver-claims-20',
    outcome: 'deferred',
    rationale:
      'The board deferred pending a retrieval design that constrains the query by entitlement rather than filtering results. The intended use statement was accepted as written.',
    decidedAt: daysFromNow(-31, 11, 0),
    recordedBy: 'usr-lindqvist',
    endorsedBy: ['usr-lindqvist', 'usr-mensah', 'usr-abbott'],
    conditions: [
      {
        id: 'cnd-claims-retrieval',
        decisionId: 'dec-claims-20',
        title: 'Constrain retrieval by entitlement at query time',
        owner: 'usr-hale',
        due: dateFromNow(4),
        evidenceRequired:
          'Updated retrieval design and a sequence diagram showing authorisation preceding search.',
        status: 'evidence-submitted',
        notes: 'Submitted with v2.1; awaiting reviewer confirmation.',
      },
    ],
  },
  {
    id: 'dec-reinsurance-10',
    architectureId: 'arc-reinsurance-reporting',
    architectureVersionId: 'ver-reinsurance-10',
    outcome: 'approved',
    rationale:
      'Straightforward retirement of a spreadsheet process onto the data platform, with reporting outputs reconciled against the prior quarter.',
    decidedAt: daysFromNow(-112, 15, 0),
    recordedBy: 'usr-lindqvist',
    endorsedBy: ['usr-lindqvist', 'usr-tanaka'],
    conditions: [
      {
        id: 'cnd-reinsurance-recon',
        decisionId: 'dec-reinsurance-10',
        title: 'Reconcile first production quarter against the legacy process',
        owner: 'usr-tanaka',
        due: dateFromNow(-70),
        evidenceRequired: 'Reconciliation report signed by finance.',
        status: 'met',
      },
    ],
  },
];
