import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddCandidate from './AddCandidate';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* Add a Link component to navigate to the AddCandidate form */}
          <Link to="/add-candidate" className="App-link">
            Add New Candidate
          </Link>
          <Routes>
            <Route path="/add-candidate" element={<AddCandidate />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
