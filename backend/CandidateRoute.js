const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/add-candidate', upload.single('resume'), candidateController.addCandidate);

module.exports = router;