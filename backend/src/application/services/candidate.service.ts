import { CandidateRepository } from '../../domain/repositories/candidate.repository';
import { Candidate } from '../../domain/entities/candidate.entity';

export class CandidateService {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async addCandidate(
    candidate: Candidate,
    cv: { fileName: string; filePath: string },
  ): Promise<void> {
    try {
      const createdCandidate =
        await this.candidateRepository.addCandidate(candidate);
      await this.candidateRepository.addCandidateCV(createdCandidate.id!, cv);
    } catch (error) {
      console.error('Error in CandidateService.addCandidate:', error);
      throw error;
    }
  }

  async getCandidates(): Promise<Candidate[]> {
    return this.candidateRepository.getCandidates();
  }
}
