import { CandidateController } from './controllers/candidate.controller';
import { CandidateService } from '../application/services/candidate.service';
import { CandidateRepositoryImpl } from './repositories/candidate.repository.impl';
import { CandidateCVRepositoryImpl } from './repositories/candidate-cv.repository.impl';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const candidateRepository = new CandidateRepositoryImpl(prisma);
const candidateCVRepository = new CandidateCVRepositoryImpl(prisma);
const candidateService = new CandidateService(
  candidateRepository,
  candidateCVRepository,
);
const candidateController = new CandidateController(candidateService);

export { candidateController };
