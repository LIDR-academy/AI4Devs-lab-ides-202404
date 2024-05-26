// src/components/Dashboard.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddCandidateModal from './AddCandidateModal';
import './Dashboard.css'; // Asegúrate de crear este archivo CSS

function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="dashboard-container">
      <h1>Sistema de Gestión de Candidatos</h1>
      <p>Este sistema permite gestionar candidatos de manera eficiente, facilitando la adición, edición y visualización de información relevante de cada candidato.</p>
      <div className="centered-button">
        <Button variant="primary" onClick={handleShowModal}>
          Añadir Candidato
        </Button>
      </div>
      <AddCandidateModal show={showModal} onHide={handleCloseModal} />
    </div>
  );
}

export default Dashboard;
