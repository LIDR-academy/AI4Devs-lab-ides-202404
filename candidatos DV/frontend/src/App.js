import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound'; // Componente para manejar rutas no encontradas
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Puedes añadir más rutas a otros componentes aquí */}
          <Route path="*" element={<NotFound />} /> // Ruta para manejar cualquier URL no definida
        </Routes>
      </div>
    </Router>
  );
}

export default App;

