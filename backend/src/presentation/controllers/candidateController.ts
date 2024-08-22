import { Request, Response } from 'express';
import { createCandidate } from '../../application/candidateService';
import { sanitizeInput } from '../../utils/sanitizer';

export const addCandidate = async (req: Request, res: Response) => {
  try {
    const candidateData = sanitizeInput(req.body);
    if (req.file) {
      candidateData.cvUrl = req.file.path;
    }
    const newCandidate = await createCandidate(candidateData);
    res.status(201).json(newCandidate);
  } catch (error) {
    console.error('Error adding candidate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};