import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const router = express.Router();
const prisma = new PrismaClient();

// Setup multer for file handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')  // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage: storage });

// POST /candidate - Create a new candidate
router.post('/candidate', async (req, res) => {
  const { firstName, lastName, email, telephone, address, education, workExperience } = req.body;
  try {
    const candidate = await prisma.candidate.create({
      data: {
        firstName,
        lastName,
        email,
        telephone,
        address,
        education,
        workExperience
      }
    });
    res.status(201).json(candidate);
  } catch (error) {
    console.error('Failed to create candidate:', error);
    res.status(500).json({ error: 'Failed to create candidate' });
  }
});

// POST /candidate/:id/resume - Upload a resume for a specific candidate
router.post('/candidate/:id/resume', upload.single('resume'), async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  if (!file) {
    return res.status(400).json({ error: 'No resume file provided' });
  }

  try {
    const resume = await prisma.resume.create({
      data: {
        path: file.path,
        candidateId: parseInt(id)
      }
    });
    res.status(201).json(resume);
  } catch (error) {
    console.error('Failed to upload resume:', error);
    res.status(500).json({ error: 'Failed to upload resume' });
  }
});

export default router;

