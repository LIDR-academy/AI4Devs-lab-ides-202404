import { Router } from 'express';
import { pool } from '../db';

const router = Router();

// Get all education records
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Education');
    res.status(200).json(result.rows);
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// Get a single education record
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Education WHERE education_id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send('Education record not found');
    }
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// Create a new education record
router.post('/', async (req, res) => {
  const { candidateId, institution, degree, fieldOfStudy, startDate, endDate } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Education (candidate_id, institution, degree, field_of_study, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [candidateId, institution, degree, fieldOfStudy, startDate, endDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// Update an education record
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { institution, degree, fieldOfStudy, startDate, endDate } = req.body;
  try {
    const result = await pool.query(
      'UPDATE Education SET institution = $1, degree = $2, field_of_study = $3, start_date = $4, end_date = $5 WHERE education_id = $6 RETURNING *',
      [institution, degree, fieldOfStudy, startDate, endDate, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send('Education record not found');
    }
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// Delete an education record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM Education WHERE education_id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Education record deleted' });
    } else {
      res.status(404).send('Education record not found');
    }
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

export default router;