import { Router } from 'express';
import { pool } from '../db';

const router = Router();

// Get all documents
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Documents');
    res.status(200).json(result.rows);
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// Get a single document
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Documents WHERE document_id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// Create a new document
router.post('/', async (req, res) => {
  const { candidateId, type, fileUrl } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Documents (candidate_id, type, file_url) VALUES ($1, $2, $3) RETURNING *',
      [candidateId, type, fileUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// Update a document
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { type, fileUrl } = req.body;
  try {
    const result = await pool.query(
      'UPDATE Documents SET type = $1, file_url = $2 WHERE document_id = $3 RETURNING *',
      [type, fileUrl, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// Delete a document
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM Documents WHERE document_id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Document deleted' });
    } else {
      res.status(404).send('Document not found');
    }
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

export default router;

