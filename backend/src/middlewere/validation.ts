import { Request, Response, NextFunction } from 'express';

export const validateCandidate = (req: Request, res: Response, next: NextFunction) => {
  const candidateData = req.body;

  // Add your validation logic here
  // For example, check if all required fields are present
  if (!candidateData.nombre || !candidateData.apellido || !candidateData.email || !candidateData.telefono) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // If everything is fine, proceed to the next middleware or route handler
  next();
};