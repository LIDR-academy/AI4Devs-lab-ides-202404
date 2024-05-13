import { Router } from 'express';
import { pool } from '../db';

const router = Router();

// Get all work experience records
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM WorkExperience');
    res.status(200).json(result.rows);
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// Get a single work experience record
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM WorkExperience WHERE experience_id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send('Work experience not found');
    }
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// Create a new work experience record
router.post('/', async (req, res) => {
  const { candidateId, company, position, startDate, endDate, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO WorkExperience (candidate_id, company, position, start_date, end_date, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [candidateId, company, position, startDate, endDate, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// Update a work experience record
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { company, position, startDate, endDate, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE WorkExperience SET company = $1, position = $2, start_date = $3, end_date = $4, description = $5 WHERE experience_id = $6 RETURNING *',
      [company, position, startDate, endDate, description, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send('Work experience not found');
    }
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// Delete a work experience record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM WorkExperience WHERE experience_id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Work experience deleted' });
    } else {
      res.status(404).send('Work experience not found');
    }
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

export default router;

