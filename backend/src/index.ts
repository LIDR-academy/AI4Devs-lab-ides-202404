import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import candidateRoutes from './routes/candidateRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());
app.use(candidateRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

