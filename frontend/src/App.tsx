import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './components/Home';
import AddCandidateForm from './components/AddCandidateForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-candidate" element={<AddCandidateForm />} />
          {/* Añade más rutas según sea necesario */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
