import { CandidateCV, PrismaClient } from '@prisma/client';
import { CandidateRepository } from '../../domain/repositories/candidate.repository';
import { Candidate } from '../../domain/entities/candidate.entity';

export class CandidateRepositoryImpl implements CandidateRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async addCandidate(candidate: Candidate): Promise<Candidate> {
    return this.prisma.candidate.create({
      data: {
        name: candidate.name,
        lastName: candidate.lastName,
        email: candidate.email,
        phone: candidate.phone,
        address: candidate.address,
        education: candidate.education,
        experience: candidate.experience,
      },
    });
  }

  async findCandidateCVByCandidateId(
    candidateId: number,
  ): Promise<CandidateCV | null> {
    return this.prisma.candidateCV.findUnique({
      where: { candidateId },
    });
  }

  async addCandidateCV(
    candidateId: number,
    cv: { fileName: string; filePath: string },
  ): Promise<void> {
    await this.prisma.candidateCV.create({
      data: {
        candidateId,
        fileName: cv.fileName,
        filePath: cv.filePath,
      },
    });
  }

  async updateCandidateCV(
    candidateId: number,
    cv: { fileName: string; filePath: string },
  ): Promise<void> {
    await this.prisma.candidateCV.update({
      where: { candidateId },
      data: {
        fileName: cv.fileName,
        filePath: cv.filePath,
      },
    });
  }

  async deleteCandidate(candidateId: number): Promise<void> {
    await this.prisma.candidate.delete({
      where: { id: candidateId },
    });
  }

  async deleteCandidateCV(candidateId: number): Promise<void> {
    await this.prisma.candidateCV.delete({
      where: { candidateId },
    });
  }

  async getCandidates(): Promise<Candidate[]> {
    return this.prisma.candidate.findMany({
      include: {
        cv: true,
      },
    });
  }
}
