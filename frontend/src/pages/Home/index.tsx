import React from 'react';
import { Dashboard } from '../../components/Dashboard';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Dashboard />
      </div>
    </div>
  );
};