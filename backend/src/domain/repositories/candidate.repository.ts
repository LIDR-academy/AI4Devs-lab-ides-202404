import { CandidateCV } from '@prisma/client';
import { Candidate } from '../entities/candidate.entity';

export interface CandidateRepository {
  addCandidate(candidate: Candidate): Promise<Candidate>;
  getCandidates(): Promise<Candidate[]>;
  findCandidateCVByCandidateId(
    candidateId: number,
  ): Promise<CandidateCV | null>;
  addCandidateCV(
    candidateId: number,
    cv: { fileName: string; filePath: string },
  ): Promise<void>;
  updateCandidateCV(
    candidateId: number,
    cv: { fileName: string; filePath: string },
  ): Promise<void>;
  deleteCandidate(candidateId: number): Promise<void>;
  deleteCandidateCV(candidateId: number): Promise<void>;
}
