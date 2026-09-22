import type { ArchitectureRepository } from './architecture-repository';
import type { AssessmentRepository } from './assessment-repository';
import type { AssuranceProfileRepository } from './assurance-profile-repository';
import type { CalendarRepository } from './calendar-repository';
import type { DecisionRepository } from './decision-repository';
import type { DirectoryRepository } from './directory-repository';
import type { ReviewRepository } from './review-repository';

/**
 * The complete set of repositories the application depends on.
 *
 * A single registry is injected at the application root, which keeps data
 * access substitutable: mocks today, HTTP clients later, fixtures in tests.
 */
export interface RepositoryRegistry {
  architectures: ArchitectureRepository;
  assessments: AssessmentRepository;
  reviews: ReviewRepository;
  calendar: CalendarRepository;
  decisions: DecisionRepository;
  assuranceProfiles: AssuranceProfileRepository;
  directory: DirectoryRepository;
}
