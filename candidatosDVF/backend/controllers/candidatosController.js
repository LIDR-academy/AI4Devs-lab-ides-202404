const connection = require('../config/db');

exports.addCandidato = (req, res) => {
    const { firstName, lastName, email, phone, address, dni } = req.body;
    const educations = JSON.parse(req.body.educations); // Asegúrate de parsear como JSON
    const experiences = JSON.parse(req.body.experiences); // Asegúrate de parsear como JSON
    const cvPath = req.file.path; // Ruta del archivo CV

    if (!firstName || !lastName || !email || !dni) {
        return res.status(400).send({ message: 'Los campos firstName, lastName, email y dni son obligatorios.' });
    }

    // Verificar si el DNI ya existe
    connection.query('SELECT * FROM Candidato WHERE dni = ?', [dni], (error, results) => {
        if (results.length > 0) {
            return res.status(400).send({ message: 'DNI ya registrado.' });
        } else {
            const queryCandidato = 'INSERT INTO Candidato (firstName, lastName, email, phone, address, cvPath, dni) VALUES (?, ?, ?, ?, ?, ?, ?)';
            connection.query(queryCandidato, [firstName, lastName, email, phone, address, cvPath, dni], (error, results) => {
                if (error) {
                    console.error('Error al insertar candidato:', error);
                    return res.status(500).send({ message: 'Error al insertar en la base de datos', error: error.message });
                }
                const candidatoId = results.insertId;

                // Insertar educación
                educations.forEach(education => {
                    const queryEducacion = 'INSERT INTO Educacion (candidatoId, school, degree, fieldOfStudy, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?)';
                    connection.query(queryEducacion, [candidatoId, education.school, education.degree, education.fieldOfStudy, education.startDate, education.endDate], (error) => {
                        if (error) {
                            console.error('Error al insertar educación:', error);
                        }
                    });
                });

                // Insertar experiencia laboral
                experiences.forEach(experience => {
                    const queryExperiencia = 'INSERT INTO ExperienciaLaboral (candidatoId, companyName, position, startDate, endDate, description) VALUES (?, ?, ?, ?, ?, ?)';
                    connection.query(queryExperiencia, [candidatoId, experience.companyName, experience.position, experience.startDate, experience.endDate, experience.description], (error) => {
                        if (error) {
                            console.error('Error al insertar experiencia laboral:', error);
                        }
                    });
                });

                res.status(201).send({ message: 'Candidato añadido con éxito', id: candidatoId });
            });
        }
    });
};

// Ejemplo para registrar experiencia
exports.registerExperience = (req, res) => {
    const { candidatoId, companyName, position, startDate, endDate, description } = req.body;
    const query = 'INSERT INTO ExperienciaLaboral (candidatoId, companyName, position, startDate, endDate, description) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [candidatoId, companyName, position, startDate, endDate, description], (error, results) => {
        if (error) {
            return res.status(500).send({ message: 'Error al registrar experiencia', error: error.message });
        }
        res.status(201).send({ message: 'Experiencia registrada correctamente' });
    });
};

// Ejemplo para eliminar experiencia
exports.deleteExperience = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM ExperienciaLaboral WHERE id = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).send({ message: 'Error al eliminar experiencia', error: error.message });
        }
        res.send({ message: 'Experiencia eliminada correctamente' });
    });
};

// Asegúrate de que el método está definido y es exportado
exports.registerEducation = (req, res) => {
    const { candidatoId, school, degree, fieldOfStudy, startDate, endDate } = req.body;
    const query = 'INSERT INTO Educacion (candidatoId, school, degree, fieldOfStudy, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [candidatoId, school, degree, fieldOfStudy, startDate, endDate], (error, results) => {
        if (error) {
            return res.status(500).send({ message: 'Error al registrar educación', error: error.message });
        }
        res.status(201).send({ message: 'Educación registrada correctamente' });
    });
};
