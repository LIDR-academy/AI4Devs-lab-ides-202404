import express from 'express';
import dotenv from 'dotenv';
import candidatesRouter from './routes/candidates';

dotenv.config();

export const app = express();
const port = process.env.PORT || 3010;

app.use(express.json());

app.use('/candidates', candidatesRouter);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.type('text/plain'); 
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});