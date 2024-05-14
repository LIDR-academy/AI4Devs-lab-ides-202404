import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddCandidateForm from './components/AddCandidateForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-candidate" element={<AddCandidateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
