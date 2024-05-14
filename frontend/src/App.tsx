import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CandidateForm from './components/CandidateForm';

function App() {
  const [success, setSuccess] = useState(false);
  return (
    <Router>
      <div className="App container">
        <Routes>
          <Route path="/" element={
            <>
              <header className="App-header mt-5">
                <h1 className="mb-4">Recruiter dashboard</h1>
                <Link to="/candidate-form" className="btn btn-primary">Create new candidate</Link>
              </header>
              {success && <p className="text-success">Candidate successfully registered</p>}
            </>
          } />
          <Route path="/candidate-form" element={<CandidateForm setSuccess={setSuccess} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;