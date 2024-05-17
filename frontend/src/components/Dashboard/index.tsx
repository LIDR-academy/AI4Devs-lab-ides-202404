import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4">Dashboard del reclutador</h1>
      <Link to="/add-candidate" className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">Añadir Nuevo Candidato</Link>
    </div>
  );
};
