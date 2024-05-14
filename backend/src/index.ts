import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors'; // Importar el middleware cors
import { addCandidate } from './controllers/candidateController';

dotenv.config();
const prisma = new PrismaClient();

export const app = express();
export default prisma;

const port = 3010;

app.use(cors()); // Usar el middleware cors
app.use(express.json()); // Middleware para parsear cuerpos JSON

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('application/json'); 
  res.status(500).send('Something broke!');
});

// Ruta para añadir un nuevo candidato
app.post('/candidates', addCandidate);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
