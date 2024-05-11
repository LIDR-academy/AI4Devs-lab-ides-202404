import { Request, Response } from 'express';
import { CandidateService } from '../application/candidateService';

export class CandidateController {
  private candidateService: CandidateService;

  constructor(candidateService: CandidateService) {
    this.candidateService = candidateService;
  }

  async addCandidate(req: Request, res: Response): Promise<void> {
    try {
      const candidateData = req.body;
      const candidate = await this.candidateService.addCandidate(candidateData);
      res.status(201).json(candidate);
    } catch (error) {
      res.status(500).json({ message: 'Error al añadir candidato' });
    }
  }
}

