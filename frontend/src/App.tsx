import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Dashboard from './components/Dashboard';
import AddCandidate from './components/AddCandidate';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <main className='m-0 px-6 py-4'>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addCandidate" element={<AddCandidate />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

