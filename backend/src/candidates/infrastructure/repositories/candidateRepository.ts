import { PrismaClient } from '@prisma/client';
import { Candidate } from '../../domain/candidate';
import { CandidateRepository } from '../../domain/repository';

export class PrismaCandidateRepository implements CandidateRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient(); // Initialize the Prisma client in the constructor
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
        workExperience: candidate.workExperience,
        cvUrl: candidate.cvUrl,
      },
    });

    return createdCandidate;
  }
}

