import { Router } from 'express';
import { addCandidate } from '../presentation/controllers/candidateController';

const router = Router();

router.post('/candidates', addCandidate);

export default router;