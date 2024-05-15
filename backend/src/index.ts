import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import candidateRoutes from './routes/candidateRoutes';
import cleanupMiddleware from './middleware/cleanupMiddleware';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

dotenv.config();
const prisma = new PrismaClient();

export const app = express();
export default prisma;

const port = 3010;

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

app.use(express.json());
app.use('/api', candidateRoutes);
app.use(errorHandlerMiddleware);
app.use(cleanupMiddleware);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
