// backend/src/domain/repository.ts

import { Candidate } from './candidate';

export interface CandidateRepository {
  addCandidate(candidate: Candidate): Promise<Candidate>;
}

