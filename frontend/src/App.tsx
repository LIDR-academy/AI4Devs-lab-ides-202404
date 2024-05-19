import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Adjust the path as necessary based on your project structure
import About from './components/About';
import Candidates from './components/Candidate/CandidateList'; // New import for the Candidates component
import CreateCandidate from './components/Candidate/CreateCandidate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/candidates" element={<Candidates />} /> {/* New route for the Candidates component */}
        <Route path="/Candidate/Create" element={<CreateCandidate />} /> {/* Ruta para crear candidato */}
        {/* Additional routes */}
      </Routes>
    </Router>
  );
}

export default App;
