import { Request, Response } from 'express';
import { AddCandidateUseCase } from '../candidates/application/addCandidate';
import { PrismaCandidateRepository } from '../candidates/infrastructure/repositories/candidateRepository';
import { Candidate } from '../candidates/domain/candidate';

const candidateRepository = new PrismaCandidateRepository();
const addCandidateUseCase = new AddCandidateUseCase(candidateRepository);

export const addCandidate = async (req: Request, res: Response) => {
  try {
    const candidateData: Candidate = req.body; // Assuming the candidate data is sent in the request body
    const createdCandidate = await addCandidateUseCase.execute(candidateData);
    res.status(201).json(createdCandidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the candidate' });
  }
};

