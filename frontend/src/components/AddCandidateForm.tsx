import React, { useState } from 'react';
import { addCandidate } from '../services/candidate.service';
import { Form, Button } from 'react-bootstrap';

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

  const validateForm= (candidate: any)=> {
    const { firstName, lastName, email } = candidate;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName || !lastName || !email) {
      alert('Nombre, apellido y correo electrónico son obligatorios.');
      return false;
    }
    if (!emailRegex.test(email)) {
      alert('El correo electrónico no tiene un formato válido.');
      return false;
    }
    return true;
  }

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
    if (!validateForm(candidate)) {
      return;
    }
    try {
      const formData = new FormData();
      Object.entries(candidate).forEach(([key, value]) => {   
        if(value !== null && value !== '') {
          if (value instanceof File) {
            formData.append(key, value, value.name);
          } else {
            formData.append(key, value);
          }
        }        
      });
      const response = await addCandidate(formData);
      console.log('Candidato añadido:', response);
      alert('Candidato añadido exitosamente');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error al añadir candidato: ${error.message}`);
        console.error(error);
      } else {
        alert('Error al añadir candidato');
        console.error('Error desconocido', error);
      }
    }
  };

  return (
    <div className="main-content">
    <form onSubmit={handleSubmit}>
      <Form.Group controlId="formFirstName" className="form-horizontal-group">
        <Form.Label>Nombre *</Form.Label>
        <Form.Control type="text" name="firstName" value={candidate.firstName} onChange={handleChange} placeholder="Ingresa nombre" />
      </Form.Group>

      <Form.Group controlId="formLastName" className="form-horizontal-group">
        <Form.Label>Apellido *</Form.Label>
        <Form.Control type="text" name="lastName" value={candidate.lastName} onChange={handleChange} placeholder="Ingresa apellido" />
      </Form.Group>

      <Form.Group controlId="formEmail" className="form-horizontal-group">
        <Form.Label>Correo Electrónico *</Form.Label>
        <Form.Control type="email" name="email" value={candidate.email} onChange={handleChange} placeholder="Ingresa correo electrónico" />
      </Form.Group>

      <Form.Group controlId="formPhone" className="form-horizontal-group">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="text" name="phone" value={candidate.phone} onChange={handleChange} placeholder="Ingresa teléfono" />
      </Form.Group>

      <Form.Group controlId="formAddress" className="form-horizontal-group">
        <Form.Label>Dirección</Form.Label>
        <Form.Control type="text" name="address" value={candidate.address} onChange={handleChange} placeholder="Ingresa dirección" />
      </Form.Group>

      <Form.Group controlId="formEducation" className="form-horizontal-group">
        <Form.Label>Educación</Form.Label>
        <Form.Control type="text" name="education" value={candidate.education} onChange={handleChange} placeholder="Ingresa educación" />
      </Form.Group>

      <Form.Group controlId="formExperience" className="form-horizontal-group">
        <Form.Label>Experiencia Laboral</Form.Label>
        <Form.Control type="text" name="experience" value={candidate.experience} onChange={handleChange} placeholder="Ingresa experiencia laboral" />
      </Form.Group>

      <input type="file" name="resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      <div className="button-right-align">
        <Button variant="primary" type="submit">
          Añadir Candidato
        </Button>
      </div>
    </form>
    </div>
  );
}

export default AddCandidateForm;
