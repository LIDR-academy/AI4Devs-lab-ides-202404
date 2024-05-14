// frontend/src/routes/AppRouter.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update the import statement

import DashboardPage from '../pages/DashboardPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

