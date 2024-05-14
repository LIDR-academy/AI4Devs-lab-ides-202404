import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const addCandidate = [
    upload.single('cv'),
    async (req: Request, res: Response) => {
      try {
        console.log(req.body); // Verificar los datos del formulario
        console.log(req.file); // Verificar el archivo cargado
        const { firstName, lastName, email, phone, address, education, experience } = req.body;
        const cvUrl = req.file ? path.join('uploads', req.file.filename) : null;
        const candidate = await prisma.candidate.create({
          data: {
            firstName,
            lastName,
            email,
            phone,
            address,
            education,
            experience,
            cvUrl,
          },
        });
        res.status(201).json(candidate);
      } catch (error: any) {
        console.error(error); // Log the error for debugging
        if (error.code === 'P2002') {
          res.status(400).json({ error: 'Email already exists' });
        } else {
          res.status(500).json({ error: 'Error adding candidate' });
        }
      }
    },
  ];