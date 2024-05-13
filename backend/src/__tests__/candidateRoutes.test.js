const jwt = require('jsonwebtoken');
const request = require('supertest');
const express = require('express');
const candidateRoutes = require('../routes/candidateRoutes');
const app = express();

require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

app.use(express.json());
app.use('/api/candidates', candidateRoutes);

require('dotenv').config();

describe('Candidate Routes', () => {
  test('GET /api/candidates should return all candidates with status 200', async () => {
    const mockUser = { id: 1 };
    const token = jwt.sign({ userId: mockUser.id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
  
    const response = await request(app)
      .get('/api/candidates')
      .set('Authorization', `Bearer ${token}`);
  
    if (response.statusCode !== 200) {
      console.error('Failed with status:', response.statusCode);
      console.error('Response body:', response.body);
    }
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        firstName: expect.any(String),
      })
    ]));
  });
});
