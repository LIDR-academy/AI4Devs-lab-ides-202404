import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { body, validationResult } from 'express-validator';
import CandidateRepository from './repositories/candidateRepository';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

dotenv.config();
const prisma = new PrismaClient();

export const app = express();

app.use(cors());
app.use(express.json())

export default prisma;

const port = 3010;

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Request body:", req.body);
  next();
});

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

app.post('/candidates', upload.single('file'), 
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('phone').optional().isLength({ min: 9 }).withMessage('Phone number should be at least 10 characters long'),
    body('address').optional().isLength({ min: 10 }).withMessage('Address should be at least 50 characters long'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cv, ...candidateData } = req.body;
    const candidate = await CandidateRepository.create(candidateData);

    if (req.file) {
      res.send('File uploaded successfully to ' + req.file.path);
    } else {
      res.status(200).send({status: "Ok"});
    }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain'); 
  res.status(500).send('Something broke!');
  next();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
