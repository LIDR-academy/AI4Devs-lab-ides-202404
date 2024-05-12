import express from 'express';
import cors from 'cors'; // Importa cors
import candidateRoutes from './routes/candidateRoutes';

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // Usa el middleware cors con origen específico
app.use(express.json()); // Middleware para parsear JSON


app.use('/api', candidateRoutes); // Usar las rutas de candidatos

const port = 3010;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

