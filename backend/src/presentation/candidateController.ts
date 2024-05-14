import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { createCandidate } from '../application/candidateService';
import multer from 'multer';
import path from 'path';


// Set up storage for files using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.env.PATH_UPLOADS}`)  // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

export const addCandidate = [
  upload.single('resume'),  // Handle resume file upload
  // Validations for Candidato fields


  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Include file information in the data to be saved
      console.log('BODY: ',req.body);
      
      const fileData = req.file ? {
        tipo_documento: req.file.mimetype,
        ruta_archivo: req.file.path
      } : {};

      const educaciones = JSON.parse(req.body.educaciones);
      const experiencias = JSON.parse(req.body.experiencias);

      const education = {
        institucion: educaciones[0].institucion,
        titulo: educaciones[0].titulo,
        fecha_inicio: (new Date(educaciones[0].fecha_inicio)).toISOString(),
        fecha_fin: (new Date(educaciones[0].fecha_fin)).toISOString(),
        descripcion: educaciones[0].descripcion,
      }
      const experencialLaboral = {
        empresa: experiencias[0].empresa,
        titulo: experiencias[0].cargo,
        fecha_inicio: (new Date(experiencias[0].fecha_inicio_experiencia)).toISOString(),
        fecha_fin:  (new Date(experiencias[0].fecha_fin_experiencia)).toISOString(),
        descripcion: experiencias[0].descripcion,
      }
      

      const candidateData = {
        nombre: req.body.firstName,
        apellido: req.body.lastName,
        correo_electronico: req.body.email,
        telefono: req.body.phone,
        direccion: req.body.address,
        documentos: [fileData],
        educaciones: [education],
        experiencias: [experencialLaboral],
      };

      const newCandidate = await createCandidate(candidateData);
      res.status(201).json(newCandidate);
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'Error al crear el candidato' });
    }
  },
];


