import { Request, Response } from 'express';
import { prisma } from '../infrastructure/database';
import path from 'path';
import fs from 'fs';

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

export const uploadCv = async (req: Request, res: Response) => {
  const { candidateId } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const cvUrl = `/uploads/${file.filename}`;  // URL where the file is saved

  try {
    const candidate = await prisma.candidate.update({
      where: { id: parseInt(candidateId) },
      data: { cvUrl }
    });
    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating candidate with CV" });
  }
};

export const downloadCv = (req: Request, res: Response) => {
    const { filename } = req.params;
    const directoryPath = path.join(__dirname, '../../uploads'); // Asegúrate de que la ruta sea correcta
    const filePath = path.join(directoryPath, filename);

    // Verifica si el archivo existe
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File does not exist:', err);
            return res.status(404).send('File not found.');
        }

        // Envía el archivo al cliente
        res.download(filePath, filename, (err) => {
            if (err) {
                console.error('Error downloading the file:', err);
                res.status(500).send('Error downloading the file.');
            }
        });
    });
};

