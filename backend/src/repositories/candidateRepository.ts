import prisma from '../index';

interface CandidateData {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    education?: string;
    work_experience?: string;
    cv?: string;
  }

class CandidateRepository {
  async create(candidateData: CandidateData) {
    const candidate = await prisma.candidate.create({
      data: candidateData,
    });

    return candidate;
  }
}

export default new CandidateRepository();