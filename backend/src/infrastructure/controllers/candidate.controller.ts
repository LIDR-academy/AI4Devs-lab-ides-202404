import { Request, Response } from 'express';
import { CandidateService } from '../../application/services/candidate.service';
import { Candidate } from '../../domain/entities/candidate.entity';
import upload from '../../config/multer';
import { EducationLevel } from '../../domain/enums/educationLevel';
import { ExperienceLevel } from '../../domain/enums/experienceLevel';

export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  async addCandidate(req: Request, res: Response): Promise<void> {
    try {
      const candidateData = req.body;
      const cv = req.file;

      if (!Object.values(EducationLevel).includes(candidateData.education)) {
        throw new Error('Invalid education value');
      }

      if (!Object.values(ExperienceLevel).includes(candidateData.experience)) {
        throw new Error('Invalid experience value');
      }

      const candidate = new Candidate(
        candidateData.name,
        candidateData.lastName,
        candidateData.email,
        candidateData.phone,
        candidateData.address,
        parseInt(candidateData.education, 10),
        parseInt(candidateData.experience, 10),
      );

      await this.candidateService.addCandidate(candidate, {
        fileName: cv!.originalname,
        filePath: cv!.path,
      });
      res.status(201).json({ message: 'Candidate added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding candidate', error });
    }
  }

  async getCandidates(req: Request, res: Response): Promise<void> {
    try {
      const candidates = await this.candidateService.getCandidates();
      res.status(200).json({ candidates });
    } catch (error) {
      res.status(500).json({ message: 'Error getting candidates', error });
    }
  }

  async deleteCandidate(req: Request, res: Response): Promise<void> {
    try {
      const candidateId = parseInt(req.params.id, 10);
      await this.candidateService.deleteCandidate(candidateId);
      res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting candidate', error });
    }
  }
}

export const uploadCV = upload.single('cv');
