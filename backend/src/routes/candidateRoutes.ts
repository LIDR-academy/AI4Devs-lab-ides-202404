import { Router } from 'express';
import { addCandidate } from '../presentation/candidateController';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const result = await addCandidate(req.body);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unexpected error occurred" });
    }
  }
});

router.get('/', (req, res) => {
    res.send('Hola Candidates!');
  });


export default router;
