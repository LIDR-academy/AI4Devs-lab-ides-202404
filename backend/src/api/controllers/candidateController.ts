import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controlador para añadir un candidato de manera segura
const addCandidate = async (req: Request, res: Response) => {
    try {
        const { name, lastName, email, phone, address, education, experience, cvFile } = req.body;
        const newCandidate = await prisma.candidate.create({
            data: {
                name,
                lastName,
                email,
                phone,
                address,
                education,
                experience,
                cvFile
            }
        });
        res.status(200).json({ message: 'Candidato añadido exitosamente', candidate: newCandidate });
    } catch (error) {
        res.status(500).json({ error: 'Error al añadir el candidato' });
    }
}

export { addCandidate };

