import React from 'react';
import { AddCandidateForm } from '../../components/AddCandidateForm';

export const AddCandidate: React.FC = () => {
  return (
    <div>
      <h1>Añadir Nuevo Candidato</h1>
      <AddCandidateForm />
    </div>
  );
};
