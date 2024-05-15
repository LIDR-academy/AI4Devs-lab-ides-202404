import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cleanupMiddleware = (req: Request, res: Response, next: NextFunction) => {
  prisma.$disconnect();
  next();
};

export default cleanupMiddleware;
