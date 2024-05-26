const express = require('express');
const router = express.Router();
const candidatosController = require('../controllers/candidatosController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('cv'), candidatosController.addCandidato);
router.post('/candidatos/registerExperience', candidatosController.registerExperience);
router.post('/candidatos/registerEducation', candidatosController.registerEducation); // Asegúrate de que esta ruta también esté definida si existe.
router.delete('/experience/:id', candidatosController.deleteExperience);

module.exports = router;
