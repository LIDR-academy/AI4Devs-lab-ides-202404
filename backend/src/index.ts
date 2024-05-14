import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import candidateRoutes from './routes/candidateRoutes'; // Import the candidate routes

dotenv.config({ path: '../.env' });
const prisma = new PrismaClient();

import cors from 'cors';

export const app = express();

const port = 3010;
app.use(cors({
  origin: `http://localhost:3000`,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true 
}));

app.options('*', cors());

app.use(express.json()); // Ensure this middleware is used to parse JSON request bodies

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

// Use the candidate routes with the '/api' base path
app.use('/api', candidateRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain'); 
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default prisma;