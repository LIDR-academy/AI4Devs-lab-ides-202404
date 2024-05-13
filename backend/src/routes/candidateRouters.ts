import express from 'express';
import { addCandidate } from '../application/controllers/candidateController';
import { validateCandidate } from '../middleware/validation';

const router = express.Router();

router.post('/api/candidates', validateCandidate, addCandidate);

export default router;