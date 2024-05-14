// backend/src/application/addCandidate.ts

import { Candidate } from '../domain/candidate';
import { CandidateRepository } from '../domain/repository';

export class AddCandidateUseCase {
  private candidateRepository: CandidateRepository;

  constructor(candidateRepository: CandidateRepository) {
    this.candidateRepository = candidateRepository;
  }

  async execute(candidateData: Candidate): Promise<Candidate> {
    // Aquí puedes agregar lógica adicional antes de llamar al repositorio
    const createdCandidate = await this.candidateRepository.addCandidate(candidateData);
    return createdCandidate;
  }
}

