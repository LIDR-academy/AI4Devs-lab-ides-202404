import { Request, Response } from 'express';
import { prisma } from '../infrastructure/database';

export const getCandidates = async (req: Request, res: Response) => {
    try {
        const candidates = await prisma.candidate.findMany();
        res.json(candidates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar los candidatos" });
    }
};

export const createCandidate = async (req: Request, res: Response) => {
    const { firstName, lastName, email, phone, address, education, workExperience } = req.body;
    try {
        const candidate = await prisma.candidate.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                address,
                education,
                workExperience
            }
        });
        res.status(201).json(candidate);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Error al crear el candidato" });
    }
};

