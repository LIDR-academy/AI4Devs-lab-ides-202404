import { Prisma } from '@prisma/client';
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
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new Error('El correo electrónico ya está registrado. Por favor, utiliza otro.');
        } else {
            throw new Error('Error al añadir candidato: Error desconocido');
        }
    }
  }
}