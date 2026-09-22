import type { Organisation } from '@/models';

export const mockOrganisations: Organisation[] = [
  {
    id: 'org-northbridge',
    name: 'Northbridge Mutual',
    shortCode: 'NBM',
    industry: 'Financial services — insurance and wealth',
    regulatoryRegimes: [
      'APRA CPS 230',
      'APRA CPS 234',
      'Privacy Act 1988 (Cth)',
      'ISO/IEC 42001',
    ],
    defaultAssuranceProfileId: 'prof-enterprise-baseline',
  },
];

export const mockCurrentOrganisationId = 'org-northbridge';
