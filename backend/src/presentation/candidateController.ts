import { Request, Response } from 'express';
import { CandidateService } from '../application/candidateService';
import { Prisma } from '@prisma/client';

export class CandidateController {
  private candidateService: CandidateService;

  constructor(candidateService: CandidateService) {
    this.candidateService = candidateService;
  }

  async addCandidate(req: Request, res: Response): Promise<void> {
    try {
      const candidateData = req.body;        
      // Asignar la ruta del archivo a resumePath
      if (req.file) {
        candidateData.resumePath = req.file.path;
      }
      const candidate = await this.candidateService.addCandidate(candidateData);
      res.status(201).json(candidate);
    } catch (error) {      
       console.error('Error:', error);
       if (error instanceof Error && error.message.includes('correo electrónico ya está registrado')) {
        res.status(409).json({ message: error.message });
        } else {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
  }

  
  async ping(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: 'pong' });
  }
}

