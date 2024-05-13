import { Request, Response, NextFunction } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import { addCandidate } from './routes/candidateRoutes';

dotenv.config();

export const app = express();

const port = 3010;

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

app.use('/api', addCandidate);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain'); 
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
