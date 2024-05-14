// frontend/src/pages/DashboardPage.tsx

import React, { useState } from 'react';
import AddCandidateButton from '../presentation/components/AddCandidateButton';
import CandidateForm from '../presentation/components/CandidateForm';

const DashboardPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddCandidateClick = () => {
    setShowForm(true);
    setShowSuccessMessage(false);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setShowSuccessMessage(true);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <AddCandidateButton onClick={handleAddCandidateClick} />
      {showForm && <CandidateForm onSuccess={handleFormSuccess} />}
      {showSuccessMessage && <p>Candidate added successfully!</p>}
    </div>
  );
};

export default DashboardPage;
