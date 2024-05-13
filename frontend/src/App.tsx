import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar los estilos de Bootstrap

function App() {
  const [candidate, setCandidate] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: [{
      institution: '',
      degree: '',
      start_date: '',
      end_date: ''
    }],
    workExperience: [{
      company: '',
      position: '',
      start_date: '',
      end_date: ''
    }],
    resume: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && !['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      alert('Por favor, carga un archivo PDF o DOCX.');
      return;
    }
    setCandidate({ ...candidate, resume: file });
  };

  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEducation = [...candidate.education];
    const { name, value } = e.target;
    updatedEducation[index] = { ...updatedEducation[index], [name]: value };
    setCandidate({ ...candidate, education: updatedEducation });
  };

  const handleWorkExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedWorkExperience = [...candidate.workExperience];
    updatedWorkExperience[index] = { ...updatedWorkExperience[index], [name]: value };
    setCandidate({ ...candidate, workExperience: updatedWorkExperience });
  };

  const addEducationField = () => {
    setCandidate({
      ...candidate,
      education: [...candidate.education, { institution: '', degree: '', start_date: '', end_date: '' }]
    });
  };

  const addWorkExperienceField = () => {
    setCandidate({
      ...candidate,
      workExperience: [...candidate.workExperience, { company: '', position: '', start_date: '', end_date: '' }]
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validación de campos requeridos
    if (!candidate.firstName || !candidate.lastName || !candidate.email || !candidate.phone || !candidate.address || !candidate.resume) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
    const formData = new FormData();
    const keys: (keyof typeof candidate)[] = ['firstName', 'lastName', 'email', 'phone', 'address', 'education', 'workExperience', 'resume'];
    
    keys.forEach(key => {
      if (key === 'resume') {
        if (candidate.resume) {
          formData.append(key, candidate.resume);
        }
      } else if (key === 'education' || key === 'workExperience') {
        formData.append(key, JSON.stringify(candidate[key]));
      } else {
        if (candidate[key] !== null) { // Asegúrate de que el valor no es null
          formData.append(key, candidate[key] as string);
        }
      }
    });

    fetch('http://localhost:3010/add-candidate', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema con la solicitud. Código de estado: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert('Candidato añadido exitosamente.');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error al enviar los datos: ' + error.message);
      });
  };

  return (
    <div className="App container mt-5">
      <h1 className="mb-3">Formulario de Candidato</h1>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Nombre:</label>
          <input type="text" className="form-control" name="firstName" id="firstName" value={candidate.firstName} onChange={handleChange} placeholder="Ingresa tu nombre" required />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Apellido:</label>
          <input type="text" className="form-control" name="lastName" id="lastName" value={candidate.lastName} onChange={handleChange} placeholder="Ingresa tu apellido" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico:</label>
          <input type="email" className="form-control" name="email" id="email" value={candidate.email} onChange={handleChange} placeholder="ejemplo@correo.com" required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Teléfono:</label>
          <input type="text" className="form-control" name="phone" id="phone" value={candidate.phone} onChange={handleChange} placeholder="123-456-7890" required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección:</label>
          <input type="text" className="form-control" name="address" id="address" value={candidate.address} onChange={handleChange} placeholder="Ingresa tu dirección" required />
        </div>
        {candidate.education.map((edu, index) => (
          <div key={index}>
            <label htmlFor={`institution-${index}`} className="form-label">Institución:</label>
            <input type="text" className="form-control" name="institution" id={`institution-${index}`} value={edu.institution} onChange={(e) => handleEducationChange(index, e)} placeholder="Nombre de la institución" required />

            <label htmlFor={`degree-${index}`} className="form-label">Título:</label>
            <input type="text" className="form-control" name="degree" id={`degree-${index}`} value={edu.degree} onChange={(e) => handleEducationChange(index, e)} placeholder="Título obtenido" required />

            <label htmlFor={`start_date-${index}`} className="form-label">Fecha de Inicio:</label>
            <input type="date" className="form-control" name="start_date" id={`start_date-${index}`} value={edu.start_date} onChange={(e) => handleEducationChange(index, e)} required />

            <label htmlFor={`end_date-${index}`} className="form-label">Fecha de Fin:</label>
            <input type="date" className="form-control" name="end_date" id={`end_date-${index}`} value={edu.end_date} onChange={(e) => handleEducationChange(index, e)} required />
          </div>
        ))}
        <button onClick={addEducationField} className="btn btn-primary">Añadir Educación</button>

        {candidate.workExperience.map((exp, index) => (
          <div key={index}>
            <label htmlFor={`company-${index}`} className="form-label">Empresa:</label>
            <input type="text" className="form-control" name="company" id={`company-${index}`} value={exp.company} onChange={(e) => handleWorkExperienceChange(index, e)} placeholder="Nombre de la empresa" required />

            <label htmlFor={`position-${index}`} className="form-label">Cargo:</label>
            <input type="text" className="form-control" name="position" id={`position-${index}`} value={exp.position} onChange={(e) => handleWorkExperienceChange(index, e)} placeholder="Cargo desempeñado" required />

            <label htmlFor={`start_date-${index}`} className="form-label">Fecha de Inicio:</label>
            <input type="date" className="form-control" name="start_date" id={`start_date-${index}`} value={exp.start_date} onChange={(e) => handleWorkExperienceChange(index, e)} required />

            <label htmlFor={`end_date-${index}`} className="form-label">Fecha de Fin:</label>
            <input type="date" className="form-control" name="end_date" id={`end_date-${index}`} value={exp.end_date} onChange={(e) => handleWorkExperienceChange(index, e)} required />
          </div>
        ))}
        <button onClick={addWorkExperienceField} className="btn btn-primary">Añadir Experiencia Laboral</button>

        <div className="mb-3">
          <label htmlFor="resume" className="form-label">Currículum:</label>
          <input type="file" className="form-control" name="resume" id="resume" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
}

export default App;
