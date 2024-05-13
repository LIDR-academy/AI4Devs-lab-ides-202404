import dotenv from 'dotenv';
dotenv.config();

const express = require('express');
const candidateRoutes = require('./routes/candidateRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/candidates', candidateRoutes);
app.use(cors({
  origin: 'http://localhost:3000' // Adjust this to match your frontend URL
}));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
