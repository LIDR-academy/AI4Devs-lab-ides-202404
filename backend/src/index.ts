import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { body, validationResult } from 'express-validator';
import sanitizeHtml from 'sanitize-html';

dotenv.config();
const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' }); // Configura multer con un directorio de destino para los archivos

export const app = express();
export default prisma;

const port = 3010;

app.use(cors()); // Esto permitirá todas las solicitudes CORS. Para producción, deberías configurar de manera más restrictiva.

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

app.post(
  '/add-candidate',
  upload.single('resume'),
  [
    body('firstName').not().isEmpty().trim().escape(),
    body('lastName').not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').not().isEmpty().trim().escape(),
    body('address').not().isEmpty().trim().escape(),
    body('education').not().isEmpty(),
    body('workExperience').not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        education,
        workExperience,
      } = req.body;
      const resume = req.file;

      // Sanitización de campos de texto
      const sanitizedEducation = JSON.parse(sanitizeHtml(education));
      const sanitizedWorkExperience = JSON.parse(sanitizeHtml(workExperience));

      // Validación de campos requeridos y tipo de archivo
      if (!resume) {
        res.status(400).send({
          message: 'El archivo del currículum es requerido.',
        });
        return;
      }

      // Validar que el archivo sea PDF o DOCX
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(resume.mimetype)) {
        res.status(400).send({
          message: 'El formato del archivo debe ser PDF o DOCX.',
        });
        return;
      }

      const candidate = await prisma.candidate.create({
        data: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          address: address,
          education: {
            create: sanitizedEducation.map(
              (edu: {
                institution: string;
                degree: string;
                start_date: string;
                end_date: string;
              }) => ({
                institution: edu.institution,
                degree: edu.degree,
                start_date: new Date(edu.start_date),
                end_date: new Date(edu.end_date),
              }),
            ),
          },
          work_experience: {
            create: sanitizedWorkExperience.map(
              (exp: {
                company: string;
                position: string;
                start_date: string;
                end_date: string;
              }) => ({
                company: exp.company,
                position: exp.position,
                start_date: new Date(exp.start_date),
                end_date: new Date(exp.end_date),
              }),
            ),
          },
        },
      });

      if (resume) {
        const originalExtension = path.extname(resume.originalname);
        const resumePath = `${process.env.RESUME_PATH}${candidate.id}-${Date.now()}${originalExtension}`;
        await fs.rename(resume.path, resumePath);
        await prisma.document.create({
          data: {
            candidate_id: candidate.id,
            type: 'resume',
            url: resumePath,
          },
        });
      }

      res.status(201).send({ message: 'Candidato añadido exitosamente' });
    } catch (error) {
      res.status(500).send({ message: 'Error al añadir candidato' });
    }
  },
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
