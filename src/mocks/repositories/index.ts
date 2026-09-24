import type { RepositoryRegistry } from '@/repositories';
import { MockArchitectureRepository } from './mock-architecture-repository';
import { MockAssessmentRepository } from './mock-assessment-repository';
import { MockAssuranceProfileRepository } from './mock-assurance-profile-repository';
import { MockCalendarRepository } from './mock-calendar-repository';
import { MockDecisionRepository } from './mock-decision-repository';
import { MockDirectoryRepository } from './mock-directory-repository';
import { MockReviewRepository } from './mock-review-repository';

export { MockArchitectureRepository } from './mock-architecture-repository';
export { MockAssessmentRepository } from './mock-assessment-repository';
export { MockAssuranceProfileRepository } from './mock-assurance-profile-repository';
export { MockCalendarRepository } from './mock-calendar-repository';
export { MockDecisionRepository } from './mock-decision-repository';
export {
  MockDirectoryRepository,
  MOCK_SIGNED_IN_USER_ID,
} from './mock-directory-repository';
export { MockReviewRepository } from './mock-review-repository';

/**
 * Builds the in-memory registry used by the prototype.
 *
 * Replacing this single factory with HTTP-backed implementations is the whole
 * of the work required to put the application on a real backend.
 */
export function createMockRepositories(): RepositoryRegistry {
  return {
    architectures: new MockArchitectureRepository(),
    assessments: new MockAssessmentRepository(),
    reviews: new MockReviewRepository(),
    calendar: new MockCalendarRepository(),
    decisions: new MockDecisionRepository(),
    assuranceProfiles: new MockAssuranceProfileRepository(),
    directory: new MockDirectoryRepository(),
  };
}
