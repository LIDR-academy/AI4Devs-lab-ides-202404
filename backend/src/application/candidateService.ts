import { Candidate } from '../domain/candidate';
import { CandidateRepository } from '../infrastructure/candidateRepository';

export class CandidateService {
  private candidateRepository: CandidateRepository;

  constructor(candidateRepository: CandidateRepository) {
    this.candidateRepository = candidateRepository;
  }

  async addCandidate(candidateDomain: Candidate): Promise<Candidate> {
    try {
      return await this.candidateRepository.addCandidate(candidateDomain);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error al añadir candidato: ${error.message}`);
      } else {
        throw new Error('Error al añadir candidato: Error desconocido');
      }
    }
  }
}