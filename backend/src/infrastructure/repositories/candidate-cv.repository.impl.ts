import { PrismaClient } from '@prisma/client';
import { CandidateCVRepository } from '../../domain/repositories/candidate-cv.repository';
import { CandidateCV } from '../../domain/entities/candidate-cv.entity';

export class CandidateCVRepositoryImpl implements CandidateCVRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(cv: CandidateCV): Promise<void> {
    await this.prisma.candidateCV.create({
      data: {
        candidateId: cv.candidateId!,
        fileName: cv.fileName,
        filePath: cv.filePath,
      },
    });
  }
}
