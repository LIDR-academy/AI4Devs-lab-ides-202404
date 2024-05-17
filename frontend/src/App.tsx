import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddCandidate } from './pages/AddCandidate';
import { Home } from './pages/Home';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-candidate" element={<AddCandidate />} />
      </Routes>
    </Router>
  );
}
