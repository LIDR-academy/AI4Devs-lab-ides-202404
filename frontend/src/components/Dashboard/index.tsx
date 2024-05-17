import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Recruiter Dashboard</h1>
      <Link to="/add-candidate" className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">Añadir Nuevo Candidato</Link>
    </div>
  );
};
