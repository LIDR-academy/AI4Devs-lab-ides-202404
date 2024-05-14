import { Router } from 'express';
import candidateRoutes from './candidateRoutes';

const router = Router();
router.use('/api', candidateRoutes);

export default router;

