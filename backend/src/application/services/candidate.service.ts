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

  async deleteCandidate(candidateId: number): Promise<void> {
    try {
      await this.candidateRepository.deleteCandidateCV(candidateId);
      await this.candidateRepository.deleteCandidate(candidateId);
    } catch (error) {
      console.error('Error in CandidateService.deleteCandidate:', error);
      throw error;
    }
  }
}
