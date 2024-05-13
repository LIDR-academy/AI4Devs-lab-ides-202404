import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addCandidate = async (req: Request, res: Response) => {
  const candidateData = req.body;

  try {
    const newCandidate = await prisma.candidate.create({
      data: candidateData,
    });

    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ error: 'Error al añadir candidato' });
  }
};