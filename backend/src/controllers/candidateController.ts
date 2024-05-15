import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCandidate = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    education,
    workExperience,
    documents,
  } = req.body;

  try {
    const newCandidate = await prisma.candidate.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
        education: {
          create: education,
        },
        workExperience: {
          create: workExperience,
        },
        documents: {
          create: documents,
        },
      },
    });

    res.status(201).json(newCandidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el candidato' });
  }
};
