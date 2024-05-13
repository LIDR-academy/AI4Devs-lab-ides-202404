const express = require('express');
const candidateController = require('../controllers/candidateController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Define routes with a consistent pattern and grouped middleware
router.route('/')
  .get(authenticateToken, candidateController.getCandidates)
  .post(authenticateToken, candidateController.createCandidate);

router.route('/:id')
    .get(authenticateToken, candidateController.getCandidate)
    .put(authenticateToken, candidateController.updateCandidate)
    .delete(authenticateToken, candidateController.deleteCandidate);

router.get('/test-db-connection', candidateController.testDatabaseConnection);

module.exports = router;
