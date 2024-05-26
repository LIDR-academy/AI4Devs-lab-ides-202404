import { CandidateCV } from '../entities/candidate-cv.entity';

export interface CandidateCVRepository {
  save(cv: CandidateCV): Promise<void>;
}
