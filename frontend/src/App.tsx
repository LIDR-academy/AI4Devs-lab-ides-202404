import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import AddCandidateForm from './components/AddCandidateForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-candidate" element={<AddCandidateForm />} />
      </Routes>
    </Router>
  );
};

export default App;