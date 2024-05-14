import React from 'react';
import CandidateForm from '../components/CandidateForm';

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = React.useState(false);

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-2xl font-bold text-center my-4">Dashboard del Reclutador</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Ocultar Formulario' : 'Añadir Candidato'}
      </button>
      {showForm && <CandidateForm />}
    </div>
  );
};

export default Dashboard;

