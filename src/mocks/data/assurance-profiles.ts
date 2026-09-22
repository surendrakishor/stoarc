import type { AssuranceProfile } from '@/models';

export const mockAssuranceProfiles: AssuranceProfile[] = [
  {
    id: 'prof-enterprise-baseline',
    name: 'Enterprise Architecture Baseline',
    version: '4.2',
    description:
      'Applies to every architecture submitted for review. Establishes the minimum evidence a board needs before it can take a decision.',
    appliesTo: ['conventional', 'cloud', 'integration', 'data', 'ai', 'agentic'],
    status: 'active',
    owner: 'usr-lindqvist',
    categories: [
      {
        id: 'cat-baseline-context',
        name: 'Context and Intent',
        description:
          'The decision being asked for, and the business outcome it serves.',
        controls: [
          {
            id: 'ctl-ctx-01',
            reference: 'CTX-01',
            title: 'Decision being sought is stated',
            description:
              'The submission names the specific architectural decision the board is asked to take.',
            expectedEvidence: 'Decision statement in the solution overview.',
            mandatory: true,
          },
          {
            id: 'ctl-ctx-02',
            reference: 'CTX-02',
            title: 'Options considered are recorded',
            description:
              'At least one alternative option is described, with the reason it was not selected.',
            expectedEvidence: 'Options analysis or architecture decision record.',
            mandatory: true,
          },
          {
            id: 'ctl-ctx-03',
            reference: 'CTX-03',
            title: 'Constraints and assumptions are explicit',
            description:
              'Assumptions the design depends on are written down and attributed.',
            expectedEvidence: 'Assumptions register.',
          },
        ],
      },
      {
        id: 'cat-baseline-security',
        name: 'Security',
        description: 'Authorisation, data protection and threat coverage.',
        controls: [
          {
            id: 'ctl-sec-01',
            reference: 'SEC-01',
            title: 'Trust boundaries are identified',
            description:
              'Every boundary where data or control crosses a trust domain is shown.',
            expectedEvidence: 'Trust boundary or threat model diagram.',
            mandatory: true,
          },
          {
            id: 'ctl-sec-02',
            reference: 'SEC-02',
            title: 'Authorisation precedes retrieval',
            description:
              'No component retrieves data before the requester has been authorised for it.',
            expectedEvidence: 'Sequence diagram or authorisation design note.',
            mandatory: true,
          },
          {
            id: 'ctl-sec-03',
            reference: 'SEC-03',
            title: 'Secrets and key management are designed',
            description:
              'Key custody, rotation and revocation are described for each secret store.',
            expectedEvidence: 'Key management section.',
          },
          {
            id: 'ctl-sec-04',
            reference: 'SEC-04',
            title: 'Threat model is current for this version',
            description:
              'The threat model has been revisited for the version under review.',
            expectedEvidence: 'Dated threat model referencing the current version.',
          },
        ],
      },
      {
        id: 'cat-baseline-data',
        name: 'Data',
        description: 'Classification, lineage, retention and residency.',
        controls: [
          {
            id: 'ctl-dat-01',
            reference: 'DAT-01',
            title: 'Data classification is recorded',
            description:
              'Each data set the architecture handles carries a classification.',
            expectedEvidence: 'Data inventory with classifications.',
            mandatory: true,
          },
          {
            id: 'ctl-dat-02',
            reference: 'DAT-02',
            title: 'Lineage is traceable end to end',
            description:
              'Source, transformation and consumption are traceable for each data set.',
            expectedEvidence: 'Lineage diagram or catalogue extract.',
          },
          {
            id: 'ctl-dat-03',
            reference: 'DAT-03',
            title: 'Retention and residency are specified',
            description:
              'Retention periods and storage regions are stated and justified.',
            expectedEvidence: 'Retention schedule.',
          },
        ],
      },
      {
        id: 'cat-baseline-operability',
        name: 'Operability and Resilience',
        description: 'Running the system, and what happens when it degrades.',
        controls: [
          {
            id: 'ctl-ops-01',
            reference: 'OPS-01',
            title: 'Service levels are defined',
            description:
              'Availability and latency objectives are stated and owned.',
            expectedEvidence: 'Service level objectives.',
            mandatory: true,
          },
          {
            id: 'ctl-ops-02',
            reference: 'OPS-02',
            title: 'Failure modes are described',
            description:
              'Dependency failure behaviour and recovery are described.',
            expectedEvidence: 'Failure mode analysis.',
          },
          {
            id: 'ctl-ops-03',
            reference: 'OPS-03',
            title: 'Observability is designed, not assumed',
            description:
              'Signals, retention and alerting responsibilities are described.',
            expectedEvidence: 'Observability design section.',
          },
        ],
      },
      {
        id: 'cat-baseline-cost',
        name: 'Cost and Sustainability',
        controls: [
          {
            id: 'ctl-cst-01',
            reference: 'CST-01',
            title: 'Run cost is estimated',
            description:
              'A steady-state run cost estimate accompanies the design.',
            expectedEvidence: 'Cost model.',
          },
          {
            id: 'ctl-cst-02',
            reference: 'CST-02',
            title: 'Scaling cost behaviour is understood',
            description:
              'Cost behaviour under the stated growth assumptions is described.',
            expectedEvidence: 'Sensitivity analysis.',
          },
        ],
      },
    ],
  },
  {
    id: 'prof-ai-assurance',
    name: 'AI and Agentic Assurance',
    version: '2.0',
    description:
      'Additional expectations for architectures where a model or an agent influences a decision or takes an action. Applied alongside the enterprise baseline.',
    appliesTo: ['ai', 'agentic'],
    status: 'active',
    owner: 'usr-abbott',
    categories: [
      {
        id: 'cat-ai-purpose',
        name: 'Purpose and Boundaries',
        controls: [
          {
            id: 'ctl-aip-01',
            reference: 'AIP-01',
            title: 'Intended use and out-of-scope use are stated',
            description:
              'What the system is for, and what it must not be used for, are both written down.',
            expectedEvidence: 'Intended use statement.',
            mandatory: true,
          },
          {
            id: 'ctl-aip-02',
            reference: 'AIP-02',
            title: 'Human decision rights are explicit',
            description:
              'The decisions reserved to a person are named, with the point at which they are exercised.',
            expectedEvidence: 'Decision rights matrix.',
            mandatory: true,
          },
        ],
      },
      {
        id: 'cat-ai-retrieval',
        name: 'Retrieval and Grounding',
        controls: [
          {
            id: 'ctl-air-01',
            reference: 'AIR-01',
            title: 'Authorisation is enforced before retrieval',
            description:
              'Retrieval is filtered by the requesting identity’s entitlements, not after generation.',
            expectedEvidence: 'Retrieval authorisation design.',
            mandatory: true,
          },
          {
            id: 'ctl-air-02',
            reference: 'AIR-02',
            title: 'Responses cite their sources',
            description:
              'Generated output carries traceable citations to retrieved material.',
            expectedEvidence: 'Citation design or worked example.',
          },
        ],
      },
      {
        id: 'cat-ai-agency',
        name: 'Agency and Control',
        controls: [
          {
            id: 'ctl-aig-01',
            reference: 'AIG-01',
            title: 'Tool and action inventory is bounded',
            description:
              'Every action the agent can take is enumerated and scoped.',
            expectedEvidence: 'Tool inventory with scopes.',
            mandatory: true,
          },
          {
            id: 'ctl-aig-02',
            reference: 'AIG-02',
            title: 'Irreversible actions require confirmation',
            description:
              'Actions that cannot be undone are gated behind a human confirmation.',
            expectedEvidence: 'Action gating design.',
            mandatory: true,
          },
          {
            id: 'ctl-aig-03',
            reference: 'AIG-03',
            title: 'Agent activity is attributable',
            description:
              'Each action is attributable to an initiating identity and a session.',
            expectedEvidence: 'Audit design section.',
          },
        ],
      },
      {
        id: 'cat-ai-evaluation',
        name: 'Evaluation and Drift',
        controls: [
          {
            id: 'ctl-aie-01',
            reference: 'AIE-01',
            title: 'Evaluation set reflects production use',
            description:
              'Evaluation cases are drawn from the intended use, including failure cases.',
            expectedEvidence: 'Evaluation plan and results.',
          },
          {
            id: 'ctl-aie-02',
            reference: 'AIE-02',
            title: 'Model and prompt changes are governed',
            description:
              'Changes to models, prompts or tools follow a defined change path.',
            expectedEvidence: 'Change management section.',
          },
        ],
      },
    ],
  },
  {
    id: 'prof-regulated-change',
    name: 'Regulated Change (CPS 230)',
    version: '1.3',
    description:
      'Applied where an architecture supports a critical operation under APRA CPS 230, including tolerance levels and service provider dependencies.',
    appliesTo: ['conventional', 'cloud', 'integration', 'data'],
    status: 'active',
    owner: 'usr-lindqvist',
    categories: [
      {
        id: 'cat-reg-tolerance',
        name: 'Critical Operations',
        controls: [
          {
            id: 'ctl-reg-01',
            reference: 'REG-01',
            title: 'Critical operations are mapped',
            description:
              'The critical operations the architecture supports are identified.',
            expectedEvidence: 'Critical operations mapping.',
            mandatory: true,
          },
          {
            id: 'ctl-reg-02',
            reference: 'REG-02',
            title: 'Tolerance levels are stated',
            description:
              'Disruption tolerance levels are stated and testable.',
            expectedEvidence: 'Tolerance level register.',
            mandatory: true,
          },
        ],
      },
      {
        id: 'cat-reg-providers',
        name: 'Service Provider Dependencies',
        controls: [
          {
            id: 'ctl-reg-03',
            reference: 'REG-03',
            title: 'Material service providers are identified',
            description:
              'Providers whose failure would breach a tolerance level are named.',
            expectedEvidence: 'Provider dependency register.',
            mandatory: true,
          },
          {
            id: 'ctl-reg-04',
            reference: 'REG-04',
            title: 'Exit and substitution is considered',
            description:
              'A substitution path exists for each material provider.',
            expectedEvidence: 'Exit plan summary.',
          },
        ],
      },
    ],
  },
  {
    id: 'prof-lightweight',
    name: 'Lightweight Review',
    version: '1.1',
    description:
      'A reduced profile for low-criticality changes, so that small work is not pushed through a large process.',
    appliesTo: ['conventional', 'cloud', 'integration'],
    status: 'active',
    owner: 'usr-lindqvist',
    categories: [
      {
        id: 'cat-light-core',
        name: 'Core Questions',
        controls: [
          {
            id: 'ctl-lgt-01',
            reference: 'LGT-01',
            title: 'Decision and rationale are stated',
            description: 'One page describing the decision and why.',
            mandatory: true,
          },
          {
            id: 'ctl-lgt-02',
            reference: 'LGT-02',
            title: 'Security impact is assessed',
            description:
              'A statement of whether trust boundaries or data classes change.',
            mandatory: true,
          },
          {
            id: 'ctl-lgt-03',
            reference: 'LGT-03',
            title: 'Operational ownership is named',
            description: 'A named team owns the change in production.',
          },
        ],
      },
    ],
  },
  {
    id: 'prof-sovereign-data',
    name: 'Sovereign Data Handling',
    version: '0.9',
    description:
      'Draft profile covering data residency, cross-border processing and sovereign key custody. Not yet applied to live reviews.',
    appliesTo: ['data', 'cloud', 'ai'],
    status: 'draft',
    owner: 'usr-tanaka',
    categories: [
      {
        id: 'cat-sov-residency',
        name: 'Residency and Processing',
        controls: [
          {
            id: 'ctl-sov-01',
            reference: 'SOV-01',
            title: 'Processing locations are enumerated',
            description:
              'Every region where data is processed or cached is listed.',
            mandatory: true,
          },
          {
            id: 'ctl-sov-02',
            reference: 'SOV-02',
            title: 'Key custody remains in jurisdiction',
            description:
              'Encryption keys are held under in-jurisdiction custody.',
          },
        ],
      },
    ],
  },
];
