import { Request, Response } from 'express';
import CandidateService from '../application/CandidateService';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: any) {
      cb(null, 'uploads/');
    },
    filename: function (req: Request, file: Express.Multer.File, cb: any) {
      const filename = file.fieldname + '-' + Date.now() + '.pdf';
      cb(null, filename);
    }
  });

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only .pdf files are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

class CandidateController {
  async createCandidate(req: Request, res: Response) {
    try {
        const candidateData = req.body;
        if (req.file) {
          candidateData.cvUrl = req.file.path; 
        }
        const candidate = await CandidateService.createCandidate(candidateData);
        res.status(201).json(candidate);
      } catch (error: any) {
        res.status(500).send(error.message);
      }
  }

  async updateCandidate(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCandidate = await CandidateService.updateCandidate(id, updateData);
    res.json(updatedCandidate);
  }

  async deleteCandidate(req: Request, res: Response) {
    const { id } = req.params;
    await CandidateService.deleteCandidate(id);
    res.status(204).send();
  }

  async fetchCandidateOptions(req: Request, res: Response) {
    const educationOptions = await CandidateService.fetchEducationOptions();
    const workExperienceOptions = await CandidateService.fetchWorkExperienceOptions();
    res.json({ educationOptions, workExperienceOptions });
  }

  async checkEmailExists(req: Request, res: Response) {
    const email = req.query.email as string;
    const exists = await CandidateService.checkEmailExists(email);
    res.json({ exists });
  }

}
export default new CandidateController();
export { upload };
