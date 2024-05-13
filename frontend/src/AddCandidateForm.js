import React, { useState } from 'react';

const AddCandidateForm = () => {
  const [candidate, setCandidate] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    educacion: [''],
    experiencia: [''],
    cv: null,
  });

  const handleInputChange = (event) => {
    setCandidate({
      ...candidate,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Validar el tamaño del archivo (menor a 5MB) y el formato (PDF)
    if (file.size > 5000000 || file.type !== 'application/pdf') {
      alert('El archivo debe ser un PDF y menor a 5MB');
      return;
    }
    setCandidate({
      ...candidate,
      cv: file,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validar que los campos obligatorios no estén vacíos
    if (!candidate.nombre || !candidate.apellido || !candidate.email || !candidate.telefono) {
      alert('Por favor, rellena todos los campos obligatorios');
      return;
    }
    // Validar el formato del email
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(candidate.email)) {
      alert('Por favor, introduce un email válido');
      return;
    }
    // Validar el formato del teléfono
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(candidate.telefono)) {
      alert('Por favor, introduce un número de teléfono válido');
      return;
    }
    // Aquí puedes manejar la lógica de envío del formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={candidate.nombre} onChange={handleInputChange} required />
      <input name="apellido" value={candidate.apellido} onChange={handleInputChange} required />
      <input name="email" value={candidate.email} onChange={handleInputChange} required />
      <input name="telefono" value={candidate.telefono} onChange={handleInputChange} required />
      <input name="direccion" value={candidate.direccion} onChange={handleInputChange} required />
      {/* Aquí puedes agregar lógica para manejar múltiples campos de educación y experiencia */}
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default AddCandidateForm;