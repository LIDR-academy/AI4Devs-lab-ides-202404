import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AddCandidateForm } from '../../components/AddCandidateForm';

export const AddCandidate: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleFormSubmit = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <Link to="/" className="self-start bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 inline-block mr-1 mb-1">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4">Añadir Nuevo Candidato</h1>
      <div className="w-full max-w-md">
        <AddCandidateForm onSubmit={handleFormSubmit} />
        {showNotification && (
          <div className="fixed inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden sm:max-w-2xl">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 inline-block mr-1 mb-1">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      New candidate added successfully
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500" onClick={() => setShowNotification(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 inline-block mr-1 mb-1">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};