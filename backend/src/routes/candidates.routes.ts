import express from 'express';
import {
  CandidateController,
  uploadCV,
} from '../infrastructure/controllers/candidate.controller';

export function createCandidateRouter(
  candidateController: CandidateController,
) {
  const router = express.Router();

  router.post('/', uploadCV, (req, res) =>
    candidateController.addCandidate(req, res),
  );
  router.get('/', (req, res) => candidateController.getCandidates(req, res));
  router.delete('/:id', (req, res) =>
    candidateController.deleteCandidate(req, res),
  );
  return router;
}
