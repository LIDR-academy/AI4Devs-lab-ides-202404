import { Router } from 'express';
import CandidateController, { upload } from '../presentation/CandidateController';

const router = Router();

router.post('/candidates', upload.single('file'), CandidateController.createCandidate, (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    res.send('File uploaded successfully.');
  });
router.put('/candidates/:id', CandidateController.updateCandidate);
router.delete('/candidates/:id', CandidateController.deleteCandidate);
router.get('/candidates/options', CandidateController.fetchCandidateOptions);
router.get('/candidates/check-email', CandidateController.checkEmailExists);



export default router;