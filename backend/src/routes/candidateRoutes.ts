import express from 'express';
import { PrismaClient } from '@prisma/client';
import { CandidateRepository } from '../infrastructure/candidateRepository';
import { CandidateService } from '../application/candidateService';
import { CandidateController } from '../presentation/candidateController';
import fileService from '../application/fileService';

const router = express.Router();
const prisma = new PrismaClient();
const candidateRepository = new CandidateRepository(prisma);
const candidateService = new CandidateService(candidateRepository);
const candidateController = new CandidateController(candidateService);

// Ruta para añadir un nuevo candidato
router.post('/candidates', fileService.getUploadMiddleware(), (req, res) => candidateController.addCandidate(req, res));

// Ruta para verificar el estado de la API
router.get('/', (req, res) => candidateController.ping(req, res));

export default router;

