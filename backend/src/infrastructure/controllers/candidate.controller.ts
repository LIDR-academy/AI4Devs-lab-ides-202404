import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { CandidateService } from '../../application/services/candidate.service';
import { Candidate } from '../../domain/entities/candidate.entity';

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'public/cvs');
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedTypes = /pdf|docx/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only .pdf and .docx files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  async addCandidate(req: Request, res: Response): Promise<void> {
    try {
      const candidateData = req.body;
      const cv = req.file;

      const candidate = new Candidate(
        candidateData.name,
        candidateData.lastName,
        candidateData.email,
        candidateData.phone,
        candidateData.address,
        candidateData.education,
        candidateData.experience,
      );

      await this.candidateService.addCandidate(candidate, {
        fileName: cv!.originalname,
        filePath: cv!.path,
      });
      res.status(201).json({ message: 'Candidate added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding candidate', error });
    }
  }

  async getCandidates(req: Request, res: Response): Promise<void> {
    try {
      const candidates = await this.candidateService.getCandidates();
      res.status(200).json({ candidates });
    } catch (error) {
      res.status(500).json({ message: 'Error getting candidates', error });
    }
  }
}

export const uploadCV = upload.single('cv');
