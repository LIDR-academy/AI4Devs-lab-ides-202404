import express, { Router } from 'express';
import { addCandidate } from '../controllers/candidatesController';

const router = Router();

// Ruta para procesar la información del formulario de añadir candidato
router.post('/candidates', addCandidate);

export default router;

