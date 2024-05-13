import { Request, Response, NextFunction } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import { addCandidate } from './routes/candidateRoutes';
import cors from 'cors';

dotenv.config();

export const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Allow only the frontend to access
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions)); // Enable CORS for one origin
app.use(express.json());

const port = 3010;

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

app.post('/api/candidates', addCandidate);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain'); 
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
