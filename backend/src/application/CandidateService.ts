import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class CandidateService {
  async createCandidate(candidateData: any) {
    return await prisma.candidate.create({
      data: candidateData,
    });
  }

  async updateCandidate(id: string, updateData: any) {
    return await prisma.candidate.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
  }

  async deleteCandidate(id: string) {
    await prisma.candidate.delete({
      where: { id: parseInt(id) },
    });
  }

  async fetchEducationOptions() {
    const educationOptions = await prisma.candidate.groupBy({
        by: ['education'],  // Group by the 'education' field
        _count: {
            education: true,
        },
        having: {
            education: {
                _count: {
                    gt: 0  // Ensures the group has at least one entry
                }
            }
        }
    });
    return educationOptions.map(option => option.education);
  }

  async fetchWorkExperienceOptions() {
    
    const workExperienceOptions = await prisma.candidate.groupBy({
        by: ['workExperience'],  // Group by the 'workExperience' field
        _count: {
            workExperience: true,
        },
        having: {
            workExperience: {
                _count: {
                    gt: 0  // Ensures the group has at least one entry
                }
            }
        }
    });
    return workExperienceOptions.map(option => option.workExperience);
  }

  async checkEmailExists(email: string) {
    const candidate = await prisma.candidate.findUnique({
      where: { email },
    });
    return !!candidate;
  }
}

export default new CandidateService();

