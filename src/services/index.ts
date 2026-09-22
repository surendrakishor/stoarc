import type { RepositoryRegistry } from '@/repositories';
import { ArchitectureService } from './architecture-service';
import { AssessmentService } from './assessment-service';
import { AssuranceProfileService } from './assurance-profile-service';
import { CalendarService } from './calendar-service';
import { DecisionService } from './decision-service';
import { OverviewService } from './overview-service';
import { ReviewService } from './review-service';

export * from './types';
export { ArchitectureService } from './architecture-service';
export { AssessmentService } from './assessment-service';
export { AssuranceProfileService } from './assurance-profile-service';
export { CalendarService } from './calendar-service';
export { DecisionService } from './decision-service';
export { OverviewService } from './overview-service';
export { ReviewService } from './review-service';

/** Everything a screen is allowed to reach for. */
export interface ServiceRegistry {
  architectures: ArchitectureService;
  assessments: AssessmentService;
  reviews: ReviewService;
  calendar: CalendarService;
  decisions: DecisionService;
  assuranceProfiles: AssuranceProfileService;
  overview: OverviewService;
}

export function createServices(
  repositories: RepositoryRegistry,
): ServiceRegistry {
  return {
    architectures: new ArchitectureService(repositories),
    assessments: new AssessmentService(repositories),
    reviews: new ReviewService(repositories),
    calendar: new CalendarService(repositories),
    decisions: new DecisionService(repositories),
    assuranceProfiles: new AssuranceProfileService(repositories),
    overview: new OverviewService(repositories),
  };
}
