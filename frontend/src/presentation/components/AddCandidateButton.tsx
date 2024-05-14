// frontend/src/presentation/components/AddCandidateButton.tsx

import React from 'react';

interface AddCandidateButtonProps {
  onClick: () => void;
}

const AddCandidateButton: React.FC<AddCandidateButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>Add Candidate</button>
  );
};

export default AddCandidateButton;

