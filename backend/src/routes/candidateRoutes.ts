import express from 'express';
import { addCandidate } from '../presentation/controllers/candidateController';
import { upload } from '../infrastructure/fileUpload';

const router = express.Router();

router.post('/', upload.single('cv'), addCandidate);

export default router;