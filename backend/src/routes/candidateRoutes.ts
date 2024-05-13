import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

export const addCandidate = async (req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        // console.log('prisma', prisma);
        const candidate = await prisma.candidate.create({
            data: {
                ...req.body,
                resumePath: req.file ? req.file.path : null // Assuming 'resumePath' is your new column and handling potential undefined 'req.file'
            },
        });
        res.status(201).json(candidate); // Corrected JSON format
    } catch (error) {
        console.log('error', error);
        res.status(400).json({ error: "Failed to add candidate" });
    }
};

// Add more candidate-related functions here as needed
// Add more candidate-related functions here as needed