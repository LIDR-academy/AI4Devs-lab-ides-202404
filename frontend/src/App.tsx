import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddCandidateForm from './components/candidate/AddCandidateForm';
import Dashboard from './components/dashboard/Dashboard';
import { Container } from '@material-ui/core';

function App() {
  return (
    <Router>
      <div className="App">
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-candidate" element={<AddCandidateForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;