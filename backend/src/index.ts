import { Request, Response, NextFunction } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { createCandidateRouter } from './routes/candidates.routes';
import { candidateController } from './infrastructure/dependency-injection';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));

const port = 3010;

const candidateRouter = createCandidateRouter(candidateController);
app.use('/candidates', candidateRouter);

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
