import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addCandidate = async (req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const candidate = await prisma.candidate.create({
            data: req.body,
        });
        res.status(201).json("{candidate: \"10\"}");
    } catch (error) {
        res.status(400).json({ error: "Failed to add candidate" });
    }
};

// Add more candidate-related functions here as needed