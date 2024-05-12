import { PrismaClient } from '@prisma/client';
import { Candidate } from '../domain/candidate';

export class CandidateRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async addCandidate(candidate: Candidate): Promise<Candidate> {
    const createdCandidate = await this.prisma.candidate.create({
      data: {
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        phone: candidate.phone,
        address: candidate.address,
        education: candidate.education,
        experience: candidate.experience,
        resumePath: candidate.resumePath
      }
    });
    return new Candidate(createdCandidate);
  }

  // Otros métodos para manejar la lógica de base de datos
}