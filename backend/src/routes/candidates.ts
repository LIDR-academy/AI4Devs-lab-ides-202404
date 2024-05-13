import { Router } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Candidates');
    res.status(200).json(result.rows);
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Candidates WHERE candidate_id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send('Candidate not found');
    }
  } catch (error) {
    res.status(500).json({ error: (error instanceof Error) ? error.message : 'Unknown error' });
  }
});

router.post('/', async (req, res) => {
    const { firstName, lastName, email, phone, address } = req.body;
    try {
        const result = await pool.query(
        'INSERT INTO Candidates (first_name, last_name, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [firstName, lastName, email, phone, address]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        const message = (error instanceof Error) ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, address } = req.body;
    try {
      const result = await pool.query(
        'UPDATE Candidates SET first_name = $1, last_name = $2, email = $3, phone = $4, address = $5 WHERE candidate_id = $6 RETURNING *',
        [firstName, lastName, email, phone, address, id]
      );
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).send('Candidate not found');
      }
    } catch (error) {
      const message = (error instanceof Error) ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
});
  
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM Candidates WHERE candidate_id = $1 RETURNING *', [id]);
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Candidate deleted' });
      } else {
        res.status(404).send('Candidate not found');
      }
    } catch (error) {
      const message = (error instanceof Error) ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
});

// POST endpoint for adding a document
router.post('/:candidateId/documents', async (req, res) => {
  const { candidateId } = req.params;
  const { documentType, fileUrl } = req.body;

  if (!documentType || !fileUrl) {
    return res.status(400).json({ error: 'Missing document type or file URL' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO Documents (candidate_id, document_type, document_url) VALUES ($1, $2, $3) RETURNING *',
      [candidateId, documentType, fileUrl]
    );

    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      res.status(404).send('Failed to add document');
    }
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.post('/:candidateId/education', async (req, res) => {
  const { candidateId } = req.params;
  const { institution, degree, field_of_study, graduation_year } = req.body;

  // Validate required fields
  if (!institution || !degree || !field_of_study || !graduation_year) {
    return res.status(400).json({ error: 'Missing required education details' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO Education (candidate_id, institution, degree, field_of_study, graduation_year) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [candidateId, institution, degree, field_of_study, graduation_year]
    );

    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      res.status(404).send('Failed to add education record');
    }
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.post('/:candidateId/workexperience', async (req, res) => {
  const { candidateId } = req.params;
  const { company_name, role, start_date, end_date } = req.body;

  // Validate required fields
  if (!company_name || !role || !start_date || !end_date) {
    return res.status(400).json({ error: 'Missing required work experience details' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO WorkExperience (candidate_id, company_name, role, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [candidateId, company_name, role, start_date, end_date]
    );

    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      res.status(404).send('Failed to add work experience record');
    }
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

export default router;