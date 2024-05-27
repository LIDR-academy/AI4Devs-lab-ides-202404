const express = require('express');
const bodyParser = require('body-parser');
const candidatosRoutes = require('./routes/CandidatoRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3001' // Solo permite solicitudes de este origen
}));
app.use('/candidatos', candidatosRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

