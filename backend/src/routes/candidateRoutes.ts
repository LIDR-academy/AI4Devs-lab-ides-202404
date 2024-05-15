import express from 'express';
import { createCandidate } from '../controllers/candidateController';

const router = express.Router();

router.post('/candidates', createCandidate);

export default router;
