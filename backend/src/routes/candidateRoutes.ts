import express from 'express';
import { PrismaClient } from '@prisma/client';
import { CandidateRepository } from '../infrastructure/candidateRepository';
import { CandidateService } from '../application/candidateService';
import { CandidateController } from '../presentation/candidateController';

const router = express.Router();
const prisma = new PrismaClient();
const candidateRepository = new CandidateRepository(prisma);
const candidateService = new CandidateService(candidateRepository);
const candidateController = new CandidateController(candidateService);

// Ruta para añadir un nuevo candidato
router.post('/candidates', (req, res) => candidateController.addCandidate(req, res));

export default router;

