import { PrismaClient } from '@prisma/client';
import { Candidate } from '../domain/candidate';

const prisma = new PrismaClient();

export const createCandidate = async (candidateData: Candidate): Promise<Candidate> => {
  const candidate = await prisma.candidate.create({
    data: candidateData,
  });
  return candidate;
};
