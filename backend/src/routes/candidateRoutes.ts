import { Router } from 'express';
import { getCandidates, createCandidate } from '../presentation/candidateController';

const router = Router();

router.get('/Candidate', getCandidates);
router.post('/Candidate', createCandidate);

export default router;

