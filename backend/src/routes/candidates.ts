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

router.post('/candidates', async (req, res) => {
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

export default router;