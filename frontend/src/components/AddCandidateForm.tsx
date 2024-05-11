import React, { useState } from 'react';
import { addCandidate } from '../services/candidate.service';

function AddCandidateForm() {
  const [candidate, setCandidate] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    resume: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCandidate({ ...candidate, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(candidate).forEach(([key, value]) => {   
        if(value !== null && value !== '') {
          formData.append(key, value);
        }        
      });
      const response = await addCandidate(formData);
      console.log('Candidato añadido:', response);
      alert('Candidato añadido exitosamente');
    } catch (error) {
      alert('Error al añadir candidato');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" value={candidate.firstName} onChange={handleChange} placeholder="Nombre" required />
      <input type="text" name="lastName" value={candidate.lastName} onChange={handleChange} placeholder="Apellido" required />
      <input type="email" name="email" value={candidate.email} onChange={handleChange} placeholder="Correo electrónico" required />
      <input type="text" name="phone" value={candidate.phone} onChange={handleChange} placeholder="Teléfono" />
      <input type="text" name="address" value={candidate.address} onChange={handleChange} placeholder="Dirección" />
      <input type="text" name="education" value={candidate.education} onChange={handleChange} placeholder="Educación" />
      <input type="text" name="experience" value={candidate.experience} onChange={handleChange} placeholder="Experiencia laboral" />
      <input type="file" name="resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      <button type="submit">Añadir Candidato</button>
    </form>
  );
}

export default AddCandidateForm;
