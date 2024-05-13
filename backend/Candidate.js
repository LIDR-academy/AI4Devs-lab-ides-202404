const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    education: String,
    experience: String,
    resume: String  // Path to the resume file
});

module.exports = mongoose.model('Candidate', candidateSchema);