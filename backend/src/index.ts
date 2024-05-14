import express from 'express';
import candidateRoutes from './routes/candidateRoutes';

const app = express();
app.use(express.json());
app.use('/api', candidateRoutes);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});