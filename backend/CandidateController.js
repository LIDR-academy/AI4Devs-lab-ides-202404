const Candidate = require('../models/Candidate');

exports.addCandidate = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address, education, experience } = req.body;
        const resume = req.file.path; // Assuming file is handled by middleware like multer
        const newCandidate = new Candidate({ firstName, lastName, email, phone, address, education, experience, resume });
        await newCandidate.save();
        res.status(201).send('Candidate added successfully');
    } catch (error) {
        res.status(500).send('Error adding candidate: ' + error.message);
    }
};