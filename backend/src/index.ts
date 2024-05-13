import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

export const app = express();
export default prisma;

const port = process.env.NODE_ENV === 'test' ? 3001 : 3010;
// Conditionally start the server only when not required as a module
if (require.main === module) {
  app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
  });
}

app.get('/', (req, res) => {
  res.status(200).send('Hola LTI!');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain'); 
  res.status(500).send('Something broke!');
});
