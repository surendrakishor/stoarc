import type { User } from '@/models';

/**
 * Synthetic people. Avatars are intentionally omitted so the UI exercises its
 * initials fallback, which is what most enterprise directories actually give.
 */
export const mockUsers: User[] = [
  {
    id: 'usr-hale',
    name: 'Priya Raghavan',
    role: 'architect',
    jobTitle: 'Principal Solution Architect',
    email: 'priya.raghavan@northbridge.example',
    organisationId: 'org-northbridge',
  },
  {
    id: 'usr-okafor',
    name: 'Daniel Okafor',
    role: 'architect',
    jobTitle: 'Integration Architect',
    email: 'daniel.okafor@northbridge.example',
    organisationId: 'org-northbridge',
  },
  {
    id: 'usr-lindqvist',
    name: 'Ingrid Lindqvist',
    role: 'chair',
    jobTitle: 'Head of Architecture Governance',
    email: 'ingrid.lindqvist@northbridge.example',
    organisationId: 'org-northbridge',
  },
  {
    id: 'usr-mensah',
    name: 'Kwame Mensah',
    role: 'security-lead',
    jobTitle: 'Chief Security Architect',
    email: 'kwame.mensah@northbridge.example',
    organisationId: 'org-northbridge',
  },
  {
    id: 'usr-bianchi',
    name: 'Elena Bianchi',
    role: 'reviewer',
    jobTitle: 'Enterprise Architect, Reviewer',
    email: 'elena.bianchi@northbridge.example',
    organisationId: 'org-northbridge',
  },
  {
    id: 'usr-tanaka',
    name: 'Rei Tanaka',
    role: 'data-lead',
    jobTitle: 'Head of Data Architecture',
    email: 'rei.tanaka@northbridge.example',
    organisationId: 'org-northbridge',
  },
  {
    id: 'usr-abbott',
    name: 'Marcus Abbott',
    role: 'ai-assurance-lead',
    jobTitle: 'AI Assurance Lead',
    email: 'marcus.abbott@northbridge.example',
    organisationId: 'org-northbridge',
  },
  {
    id: 'usr-sorensen',
    name: 'Freya Sorensen',
    role: 'observer',
    jobTitle: 'CIO Office, Portfolio Manager',
    email: 'freya.sorensen@northbridge.example',
    organisationId: 'org-northbridge',
  },
  {
    id: 'usr-nakamura',
    name: 'Hana Nakamura',
    role: 'architect',
    jobTitle: 'Cloud Platform Architect',
    email: 'hana.nakamura@northbridge.example',
    organisationId: 'org-northbridge',
  },
  {
    id: 'usr-devlin',
    name: 'Sean Devlin',
    role: 'reviewer',
    jobTitle: 'Operations Architecture Lead',
    email: 'sean.devlin@northbridge.example',
    organisationId: 'org-northbridge',
  },
];

export function findMockUser(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id);
}
