import { Router } from 'express';
import { getCandidates, createCandidate, uploadCv, downloadCv } from '../presentation/candidateController';
import { upload } from '../infrastructure/fileStorage';

const router = Router();

router.get('/Candidate', getCandidates);
router.post('/Candidate', createCandidate);
router.post('/Candidate/uploadCv', upload.single('file'), uploadCv);
router.get('/Candidate/downloadCv/uploads/:filename', downloadCv); // Nueva ruta para descargar CV

export default router;

