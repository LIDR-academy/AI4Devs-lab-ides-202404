// src/components/AddCandidateModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Accordion } from 'react-bootstrap';
import 'react-tagsinput/react-tagsinput.css'; // Importa el CSS para los tags input
import { isValidEmail } from '../utils/validations';
import axios from 'axios';
import './AddCandidateModal.css'; // Importar el archivo CSS específico

const AddCandidateModal = ({ show, onHide }) => {
  const [candidateData, setCandidateData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: [{ school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
    experience: [{ companyName: '', position: '', startDate: '', endDate: '', description: '' }],
    dni: '' // Added DNI field
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    if (e.target) {
      setCandidateData({ ...candidateData, [e.target.name]: e.target.value });
    }
  };

  const handleTagsChange = (field, tags) => {
    setCandidateData({ ...candidateData, [field]: tags });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Guardar el archivo seleccionado en el estado
  };

  const handleAddEducation = () => {
    setCandidateData({
        ...candidateData,
        education: [...candidateData.education, { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }]
    });
  };

  const handleRemoveEducation = (index) => {
    const newEducation = [...candidateData.education];
    newEducation.splice(index, 1);
    setCandidateData({ ...candidateData, education: newEducation });
  };

  const handleChangeEducation = (index, field, value) => {
    const newEducation = [...candidateData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setCandidateData({ ...candidateData, education: newEducation });
  };

  const handleRegisterEducation = (index) => {
    const education = candidateData.education[index];
    let storedEducations = JSON.parse(localStorage.getItem('educations')) || [];
    storedEducations.push(education);
    localStorage.setItem('educations', JSON.stringify(storedEducations));
    alert('Educación almacenada temporalmente');
  };

  const handleDeleteEducation = async (index) => {
    const educationId = candidateData.education[index].id; // Asegúrate de que cada educación tenga un ID
    try {
        const response = await axios.delete(`http://localhost:3000/educations/${educationId}`);
        alert('Educación eliminada'); // Alerta de confirmación
        console.log('Educación eliminada:', response.data);
    } catch (error) {
        console.error('Error al eliminar educación:', error);
    }
  };

  const handleAddExperience = () => {
    setCandidateData({
        ...candidateData,
        experience: [...candidateData.experience, { companyName: '', position: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const handleRemoveExperience = (index) => {
    const newExperience = [...candidateData.experience];
    newExperience.splice(index, 1);
    setCandidateData({ ...candidateData, experience: newExperience });
  };

  const handleChangeExperience = (index, field, value) => {
    const newExperience = [...candidateData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setCandidateData({ ...candidateData, experience: newExperience });
  };

  const handleRegisterExperience = (index) => {
    const experience = candidateData.experience[index];
    let storedExperiences = JSON.parse(localStorage.getItem('experiences')) || [];
    storedExperiences.push(experience);
    localStorage.setItem('experiences', JSON.stringify(storedExperiences));
    alert('Experiencia almacenada temporalmente');
  };

  const handleDeleteExperience = async (index) => {
    const experienceId = candidateData.experience[index].id; // Asegúrate de que cada experiencia tenga un ID
    try {
        const response = await axios.delete(`http://localhost:3000/experiences/${experienceId}`);
        alert('Experiencia laboral eliminada'); // Alerta de confirmación
        console.log('Experiencia eliminada:', response.data);
    } catch (error) {
        console.error('Error al eliminar experiencia:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!candidateData.dni) {
      alert('El campo DNI es obligatorio.');
      return;
    }
    const formData = new FormData();
    formData.append('firstName', candidateData.firstName);
    formData.append('lastName', candidateData.lastName);
    formData.append('email', candidateData.email);
    formData.append('phone', candidateData.phone);
    formData.append('address', candidateData.address);
    formData.append('cv', file); // Asegúrate de que 'file' contiene el archivo CV cargado por el usuario
    formData.append('dni', candidateData.dni); // Added DNI field

    // Añadir educación y experiencia como JSON
    formData.append('educations', JSON.stringify(candidateData.education));
    formData.append('experiences', JSON.stringify(candidateData.experience));

    console.log(formData); // Añade esto antes de la llamada Axios para ver los datos enviados
    try {
        const candidateResponse = await axios.post('http://localhost:3000/candidatos', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const candidatoId = candidateResponse.data.id;
        const educations = JSON.parse(localStorage.getItem('educations')) || [];
        educations.forEach(async (edu) => {
            edu.candidatoId = candidatoId;
            await axios.post('http://localhost:3000/candidatos/registerEducation', edu);
        });
        localStorage.removeItem('educations');
        const experiences = JSON.parse(localStorage.getItem('experiences')) || [];
        experiences.forEach(async (exp) => {
            exp.candidatoId = candidatoId;
            await axios.post('http://localhost:3000/candidatos/registerExperience', exp);
        });
        localStorage.removeItem('experiences');
        alert('Candidato, experiencias y educaciones registradas correctamente');
        onHide(); // Cerrar modal después de enviar los datos
    } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.message === 'DNI ya registrado.') {
            alert('Error: El DNI ya está registrado.');
        } else {
            console.error('Error al enviar datos:', error);
        }
    }
  };

  const clearForm = () => {
    setCandidateData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        education: [{ school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
        experience: [{ companyName: '', position: '', startDate: '', endDate: '', description: '' }],
        dni: ''
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Candidato</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="firstName" value={candidateData.firstName} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" name="lastName" value={candidateData.lastName} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={candidateData.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" name="phone" value={candidateData.phone} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" name="address" value={candidateData.address} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>DNI</Form.Label>
            <Form.Control type="text" name="dni" value={candidateData.dni} onChange={handleChange} required />
          </Form.Group>
          <h3>Registro de Experiencia</h3>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="accordion-header">Educación</Accordion.Header>
              <Accordion.Body>
                {candidateData.education.map((edu, index) => (
                  <div key={index} className="form-section">
                    <Form.Label>Escuela</Form.Label>
                    <Form.Control type="text" placeholder="Escuela" value={edu.school} onChange={(e) => handleChangeEducation(index, 'school', e.target.value)} />
                    <Form.Label>Grado</Form.Label>
                    <Form.Select value={edu.degree} onChange={(e) => handleChangeEducation(index, 'degree', e.target.value)}>
                        <option value="">Seleccionar</option>
                        <option value="basica_primaria">Básica Primaria</option>
                        <option value="secundaria">Secundaria</option>
                        <option value="pregrado">Pregrado</option>
                        <option value="especializacion">Especialización</option>
                        <option value="maestria">Maestría</option>
                        <option value="doctorado">Doctorado</option>
                    </Form.Select>
                    <Form.Label>Campo de Estudio</Form.Label>
                    <Form.Control type="text" placeholder="Campo de estudio" value={edu.fieldOfStudy} onChange={(e) => handleChangeEducation(index, 'fieldOfStudy', e.target.value)} />
                    <Form.Label>Fecha de Inicio</Form.Label>
                    <Form.Control type="date" placeholder="Fecha de inicio" value={edu.startDate} onChange={(e) => handleChangeEducation(index, 'startDate', e.target.value)} />
                    <Form.Label>Fecha de Fin</Form.Label>
                    <Form.Control type="date" placeholder="Fecha de fin" value={edu.endDate} onChange={(e) => handleChangeEducation(index, 'endDate', e.target.value)} />
                    <div className="form-buttons">
                        <Button className="form-button delete-button" onClick={() => handleRemoveEducation(index)}>
                            <i className="bi bi-trash-fill"></i> Eliminar
                        </Button>
                        <Button className="form-button register-button" onClick={() => handleRegisterEducation(index)}>
                            <i className="bi bi-save-fill"></i> Registrar Educación
                        </Button>
                        <Button className="form-button add-button" onClick={handleAddEducation}>
                            <i className="bi bi-plus-circle-fill"></i> Agregar Educación
                        </Button>
                    </div>
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="accordion-header">Experiencia Laboral</Accordion.Header>
              <Accordion.Body>
                {candidateData.experience.map((exp, index) => (
                  <div key={index} className="form-section">
                      <Form.Label>Nombre de la Empresa</Form.Label>
                      <Form.Control type="text" placeholder="Nombre de la empresa" value={exp.companyName} onChange={(e) => handleChangeExperience(index, 'companyName', e.target.value)} />
                      <Form.Label>Posición</Form.Label>
                      <Form.Control type="text" placeholder="Posición" value={exp.position} onChange={(e) => handleChangeExperience(index, 'position', e.target.value)} />
                      <Form.Label>Fecha de Inicio</Form.Label>
                      <Form.Control type="date" placeholder="Fecha de inicio" value={exp.startDate} onChange={(e) => handleChangeExperience(index, 'startDate', e.target.value)} />
                      <Form.Label>Fecha de Fin</Form.Label>
                      <Form.Control type="date" placeholder="Fecha de fin" value={exp.endDate} onChange={(e) => handleChangeExperience(index, 'endDate', e.target.value)} />
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control type="text" placeholder="Descripción" value={exp.description} onChange={(e) => handleChangeExperience(index, 'description', e.target.value)} />
                      <div className="form-buttons">
                        <Button className="form-button register-button" onClick={() => handleRegisterExperience(index)}>Registrar Experiencia</Button>
                        <Button className="form-button delete-button" onClick={() => handleDeleteExperience(index)}>Eliminar </Button>
                        <Button className="form-button add-button" onClick={handleAddExperience}>Agregar + Experiencia</Button>
                      </div>
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Form.Group>
            <Form.Label>CV (PDF o DOCX)</Form.Label>
            <Form.Control type="file" name="cv" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
          </Form.Group>
          <div className="form-buttons">
            <Button variant="secondary" onClick={clearForm}>
                Limpiar Campos
            </Button>
            <Button variant="primary" type="submit">
                Guardar Candidato
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCandidateModal;
