import type { Finding } from '@/models';

/**
 * Findings carry their evidence with them: the platform does not assert
 * anything it cannot cite back to a submitted artefact.
 */
export const mockFindings: Finding[] = [
  {
    id: 'fnd-claims-retrieval',
    assessmentId: 'asm-claims-21',
    title: 'Retrieval filters entitlements after the search, not before it',
    category: 'ai-assurance',
    severity: 'blocking',
    description:
      'The retrieval component queries the full claims index and applies the handler’s entitlement filter to the result set before the summary is drafted.',
    whyItMatters:
      'A handler could see an excerpt from a claim they are not entitled to, because the match is computed over material outside their scope. Authorisation needs to constrain the query itself for the board to take this decision.',
    profileControl: 'AIR-01',
    confidence: 'high',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-claims-retrieval-1',
        artefactName: 'Claims Copilot Solution Overview v2.1.pdf',
        section: '5.2 Retrieval pipeline',
        excerpt:
          'The vector search returns the top 40 passages across the claims index; entitlement filtering is then applied to the returned set before passages are passed to the drafting step.',
        location: 'p. 18',
      },
      {
        id: 'evd-claims-retrieval-2',
        artefactName: 'Claims Copilot Sequence Diagrams v2.1.drawio',
        section: 'Draft summary — happy path',
        excerpt:
          'search(index=claims_all, k=40) → filterByEntitlement(handlerId) → compose()',
        location: 'sheet 2',
      },
    ],
  },
  {
    id: 'fnd-claims-citation',
    assessmentId: 'asm-claims-21',
    title: 'Citation coverage is not measured for generated summaries',
    category: 'ai-assurance',
    severity: 'significant',
    description:
      'Summaries display citations, but there is no stated measure of how much of a summary is attributable to retrieved passages.',
    whyItMatters:
      'Without a coverage measure the board cannot tell whether handlers are being shown material the system invented. This is the difference between evidence and assertion.',
    profileControl: 'AIR-02',
    confidence: 'medium',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-claims-citation-1',
        artefactName: 'Claims Copilot Solution Overview v2.1.pdf',
        section: '6.1 Handler experience',
        excerpt:
          'Each paragraph in the drafted summary carries a citation chip linking to the source passage where one is available.',
        location: 'p. 22',
      },
    ],
  },
  {
    id: 'fnd-claims-retention',
    assessmentId: 'asm-claims-21',
    title: 'Retention period for prompt and response logs is unstated',
    category: 'data',
    severity: 'moderate',
    description:
      'Prompt and response logging is described, but no retention period or deletion path is given for the log store.',
    whyItMatters:
      'Logs will contain claim detail, which carries a retention obligation. Leaving it unstated defers a privacy decision to whoever builds it.',
    profileControl: 'DAT-03',
    confidence: 'high',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-claims-retention-1',
        artefactName: 'Claims Copilot Solution Overview v2.1.pdf',
        section: '7.4 Observability',
        excerpt:
          'Prompts, retrieved passage identifiers and generated responses are written to the assurance log store for review.',
        location: 'p. 27',
      },
    ],
  },
  {
    id: 'fnd-claims-threatmodel',
    assessmentId: 'asm-claims-21',
    title: 'Threat model predates the retrieval redesign',
    category: 'security',
    severity: 'significant',
    description:
      'The submitted threat model is dated against v2.0 and does not cover the entitlement-filtered retrieval introduced in v2.1.',
    whyItMatters:
      'The change under review is the retrieval path, which is precisely the part the threat model does not cover.',
    profileControl: 'SEC-04',
    confidence: 'high',
    disposition: 'accepted',
    dispositionBy: 'usr-mensah',
    dispositionNote:
      'Accepted. Refresh scheduled ahead of the board; treat as a condition if it is not tabled.',
    evidence: [
      {
        id: 'evd-claims-threatmodel-1',
        artefactName: 'Claims Copilot Threat Model.xlsx',
        section: 'Cover',
        excerpt: 'Version: 2.0 · Last reviewed: 14 weeks ago · Owner: K. Mensah',
        location: 'Cover sheet',
      },
    ],
  },
  {
    id: 'fnd-policy-rollback',
    assessmentId: 'asm-policy-40',
    title: 'Rollback path is described only for the first cutover window',
    category: 'resilience',
    severity: 'blocking',
    description:
      'The cutover plan defines a rollback for window 1. Windows 2 and 3 reference "as per window 1" without addressing the data written in between.',
    whyItMatters:
      'Once policy issuance has written to the new core, a window 1 rollback is no longer sufficient. The board is being asked to approve a cutover whose reverse path is undefined for two of three windows.',
    profileControl: 'OPS-02',
    confidence: 'high',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-policy-rollback-1',
        artefactName: 'Policy Core Cutover Plan v4.0.docx',
        section: '4.3 Rollback',
        excerpt:
          'Windows 2 and 3 follow the rollback approach defined for window 1.',
        location: 'p. 31',
      },
    ],
  },
  {
    id: 'fnd-policy-tolerance',
    assessmentId: 'asm-policy-40',
    title: 'Disruption tolerance levels are stated but not testable',
    category: 'compliance',
    severity: 'significant',
    description:
      'Tolerance levels are expressed as "minimal customer impact" rather than as a measurable duration or volume.',
    whyItMatters:
      'CPS 230 tolerance levels need to be testable. As written, no one can say afterwards whether the tolerance was breached.',
    profileControl: 'REG-02',
    confidence: 'high',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-policy-tolerance-1',
        artefactName: 'Policy Core Solution Overview v4.0.pdf',
        section: '9.1 Critical operations',
        excerpt:
          'Tolerance: policy issuance to continue with minimal customer impact during the cutover period.',
        location: 'p. 44',
      },
    ],
  },
  {
    id: 'fnd-policy-provider',
    assessmentId: 'asm-policy-40',
    title: 'Vendor substitution path relies on an undocumented data export',
    category: 'compliance',
    severity: 'moderate',
    description:
      'The exit plan assumes a full policy data export from the vendor, with no reference to a contractual commitment or a tested extract.',
    whyItMatters:
      'A substitution path that has never been exercised is an assumption, not a plan.',
    profileControl: 'REG-04',
    confidence: 'medium',
    disposition: 'risk-accepted',
    dispositionBy: 'usr-lindqvist',
    dispositionNote:
      'Risk accepted for tranche 2 subject to a contractual export clause being confirmed before tranche 3.',
    evidence: [
      {
        id: 'evd-policy-provider-1',
        artefactName: 'Policy Core Solution Overview v4.0.pdf',
        section: '11.2 Exit considerations',
        excerpt:
          'In an exit scenario, policy data would be extracted from the vendor platform in full and loaded into a replacement core.',
        location: 'p. 52',
      },
    ],
  },
  {
    id: 'fnd-policy-observability',
    assessmentId: 'asm-policy-40',
    title: 'Reconciliation signals are not defined for the dual-run period',
    category: 'operability',
    severity: 'moderate',
    description:
      'Dual-run is described, but the signals that would show the two cores diverging are not specified.',
    whyItMatters:
      'Dual-run without divergence signals produces confidence rather than assurance.',
    profileControl: 'OPS-03',
    confidence: 'medium',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-policy-observability-1',
        artefactName: 'Policy Core Cutover Plan v4.0.docx',
        section: '5.2 Dual run',
        excerpt:
          'Both cores will process issuance transactions for the dual-run period and outputs will be compared.',
        location: 'p. 36',
      },
    ],
  },
  {
    id: 'fnd-landing-keys',
    assessmentId: 'asm-landing-51',
    title: 'Key custody for tier 1 workloads depends on a preview service',
    category: 'security',
    severity: 'significant',
    description:
      'Sovereign key custody is designed against a cloud provider capability that is currently in preview in the nominated region.',
    whyItMatters:
      'A tier 1 control resting on a preview capability has no availability commitment behind it.',
    profileControl: 'SEC-03',
    confidence: 'high',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-landing-keys-1',
        artefactName: 'Landing Zone Design v5.1.pdf',
        section: '6.4 Key management',
        excerpt:
          'Tier 1 workloads use externally held key material via the provider’s external key store (preview in this region).',
        location: 'p. 41',
      },
    ],
  },
  {
    id: 'fnd-landing-segmentation',
    assessmentId: 'asm-landing-51',
    title: 'Segmentation model leaves an implicit path between tiers',
    category: 'security',
    severity: 'moderate',
    description:
      'The shared services subnet is reachable from both tier 1 and tier 3 workloads without a stated mediation point.',
    whyItMatters:
      'Shared services then become a bridge between isolation tiers, which is the property the tiers exist to prevent.',
    profileControl: 'SEC-01',
    confidence: 'medium',
    disposition: 'disputed',
    dispositionBy: 'usr-nakamura',
    dispositionNote:
      'Disputed: mediation is enforced at the service mesh, not the network. Evidence to be tabled at the board.',
    evidence: [
      {
        id: 'evd-landing-segmentation-1',
        artefactName: 'Landing Zone Network Design v5.1.drawio',
        section: 'Segmentation overview',
        excerpt: 'shared-services-vnet ← peering ← tier1-vnet, tier3-vnet',
        location: 'sheet 1',
      },
    ],
  },
  {
    id: 'fnd-landing-cost',
    assessmentId: 'asm-landing-51',
    title: 'Run cost estimate excludes the isolation tier overhead',
    category: 'cost',
    severity: 'minor',
    description:
      'The cost model prices the current estate shape rather than the per-tier duplication the new model introduces.',
    whyItMatters:
      'The board would be approving a structure whose steady-state cost is understated.',
    profileControl: 'CST-01',
    confidence: 'medium',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-landing-cost-1',
        artefactName: 'Landing Zone Cost Model v5.1.xlsx',
        section: 'Assumptions',
        excerpt:
          'Estimate based on current subscription count; tier separation assumed cost neutral.',
        location: 'Assumptions!A12',
      },
    ],
  },
  {
    id: 'fnd-lakehouse-lineage',
    assessmentId: 'asm-lakehouse-32',
    title: 'Lineage stops at the consumption zone boundary',
    category: 'data',
    severity: 'significant',
    description:
      'Lineage is captured through ingestion and curation but is not recorded for transformations inside the consumption zone.',
    whyItMatters:
      'Regulatory reporting draws from the consumption zone, so the numbers that leave the organisation are the ones without lineage.',
    profileControl: 'DAT-02',
    confidence: 'high',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-lakehouse-lineage-1',
        artefactName: 'Customer Lakehouse Design v3.2.pdf',
        section: '4.5 Lineage',
        excerpt:
          'Lineage is emitted automatically for ingestion and curation jobs. Consumption zone models are managed by domain teams.',
        location: 'p. 24',
      },
    ],
  },
  {
    id: 'fnd-lakehouse-residency',
    assessmentId: 'asm-lakehouse-32',
    title: 'Analytics workspace replicates to a second region',
    category: 'data',
    severity: 'moderate',
    description:
      'The managed analytics workspace is configured with cross-region redundancy into a region outside the stated residency boundary.',
    whyItMatters:
      'Residency is asserted in the overview but contradicted by the platform configuration section of the same document.',
    profileControl: 'DAT-03',
    confidence: 'high',
    disposition: 'mitigated',
    dispositionBy: 'usr-tanaka',
    dispositionNote:
      'Redundancy reconfigured to an in-jurisdiction pair; updated configuration tabled with the assessment.',
    evidence: [
      {
        id: 'evd-lakehouse-residency-1',
        artefactName: 'Customer Lakehouse Design v3.2.pdf',
        section: 'Appendix B — Platform configuration',
        excerpt: 'workspace.redundancy = geo-paired (secondary: south-east)',
        location: 'p. 63',
      },
    ],
  },
  {
    id: 'fnd-underwriting-actions',
    assessmentId: 'asm-underwriting-09',
    title: 'Agent can send broker correspondence without a confirmation step',
    category: 'agentic-control',
    severity: 'blocking',
    description:
      'The tool inventory includes an outbound correspondence action that the agent may invoke when a document is missing, with no human confirmation.',
    whyItMatters:
      'Correspondence to a broker cannot be recalled. An irreversible, externally visible action is being delegated without a person in the path.',
    profileControl: 'AIG-02',
    confidence: 'high',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-underwriting-actions-1',
        artefactName: 'Agentic Underwriting Support v0.9.pdf',
        section: '3.2 Tool inventory',
        excerpt:
          'sendBrokerRequest(brokerId, templateId, context) — invoked autonomously when a mandatory document is absent.',
        location: 'p. 11',
      },
    ],
  },
  {
    id: 'fnd-underwriting-decision-rights',
    assessmentId: 'asm-underwriting-09',
    title: 'Decision rights matrix is not yet supplied',
    category: 'ai-assurance',
    severity: 'significant',
    description:
      'The submission describes the underwriting pack but does not name the decisions reserved to the underwriter.',
    whyItMatters:
      'Without stated decision rights the boundary between what the agent prepares and what a person decides is left to implementation.',
    profileControl: 'AIP-02',
    confidence: 'high',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-underwriting-decision-rights-1',
        artefactName: 'Agentic Underwriting Support v0.9.pdf',
        section: 'Contents',
        excerpt: '6. Decision rights — to be completed',
        location: 'p. 3',
      },
    ],
  },
  {
    id: 'fnd-underwriting-attribution',
    assessmentId: 'asm-underwriting-09',
    title: 'Agent actions are attributed to a service account',
    category: 'agentic-control',
    severity: 'significant',
    description:
      'All agent activity is logged under a single platform service identity rather than the initiating underwriter.',
    whyItMatters:
      'Attribution to a shared identity removes the ability to answer who caused an action, which the audit trail exists to answer.',
    profileControl: 'AIG-03',
    confidence: 'medium',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-underwriting-attribution-1',
        artefactName: 'Agentic Underwriting Support v0.9.pdf',
        section: '5.1 Identity',
        excerpt:
          'The orchestration service authenticates to downstream systems as svc-uw-agent.',
        location: 'p. 19',
      },
    ],
  },
  {
    id: 'fnd-member-accessibility',
    assessmentId: 'asm-member-20',
    title: 'Accessibility conformance target is not stated',
    category: 'compliance',
    severity: 'minor',
    description:
      'The refresh describes the component library but does not state the accessibility level the portal will meet.',
    whyItMatters:
      'A member-facing service with no stated conformance target will be assessed against one eventually — better before build than after.',
    profileControl: 'CTX-03',
    confidence: 'medium',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-member-accessibility-1',
        artefactName: 'Member Portal Refresh v2.0.pdf',
        section: '2.4 Front-end platform',
        excerpt:
          'The portal adopts the shared web platform component library and design tokens.',
        location: 'p. 8',
      },
    ],
  },
  {
    id: 'fnd-member-session',
    assessmentId: 'asm-member-20',
    title: 'Session lifetime is longer than the enterprise standard',
    category: 'security',
    severity: 'moderate',
    description:
      'A 12-hour session is proposed against an enterprise standard of 4 hours for member-facing services.',
    whyItMatters:
      'The deviation may be justified, but it is currently undeclared rather than argued.',
    profileControl: 'SEC-02',
    confidence: 'high',
    disposition: 'open',
    evidence: [
      {
        id: 'evd-member-session-1',
        artefactName: 'Member Portal Refresh v2.0.pdf',
        section: '5.3 Session handling',
        excerpt: 'Refresh token lifetime: 12 hours; sliding expiry enabled.',
        location: 'p. 21',
      },
    ],
  },
  {
    id: 'fnd-partner-ratelimit',
    assessmentId: 'asm-partner-16',
    title: 'Rate limits are per gateway node rather than per partner',
    category: 'integration',
    severity: 'moderate',
    description:
      'Partner quotas are enforced at each node, so effective throughput scales with the node count.',
    whyItMatters:
      'A partner quota that changes when the platform scales is not a quota the board can rely on.',
    profileControl: 'OPS-01',
    confidence: 'high',
    disposition: 'mitigated',
    dispositionBy: 'usr-okafor',
    dispositionNote:
      'Moved to a shared counter before the board; design note updated and evidenced.',
    evidence: [
      {
        id: 'evd-partner-ratelimit-1',
        artefactName: 'Broker Gateway Design v1.6.pdf',
        section: '4.2 Traffic management',
        excerpt: 'Each gateway instance enforces the partner quota locally.',
        location: 'p. 16',
      },
    ],
  },
];
