import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface CandidateData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: string;
  workExperience?: string;
  resume?: File;
}

const CandidateForm: React.FC = () => {
  const [candidateData, setCandidateData] = useState<CandidateData>({ firstName: '', lastName: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState("");

  const [education, setEducation] = useState({
    institucion: '',
    titulo: '',
    fecha_inicio: '',
    fecha_fin: ''
  });

  const [experience, setExperience] = useState({
    empresa: '',
    cargo: '',
    descripcion: '',
    fecha_inicio_experiencia: '',
    fecha_fin_experiencia: ''
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setCandidateData({ ...candidateData, resume: acceptedFiles[0] });
    setUploadedFileName(acceptedFiles[0].name);  // Store the file name when a file is dropped
  }, [candidateData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] } });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name in education) {
      setEducation(prev => ({ ...prev, [name]: value }));
    } else if (name in experience) {
      setExperience(prev => ({ ...prev, [name]: value }));
    } else {
      setCandidateData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('firstName', candidateData.firstName);
    formData.append('lastName', candidateData.lastName);
    formData.append('email', candidateData.email);
    if (candidateData.phone) formData.append('phone', candidateData.phone);
    if (candidateData.address) formData.append('address', candidateData.address);
    formData.append('educaciones', JSON.stringify([education]));
    formData.append('experiencias', JSON.stringify([experience]));
    if (candidateData.resume) formData.append('resume', candidateData.resume);

    try {
      const response = await axios.post('http://localhost:3010/api/candidates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Candidate added successfully');
      setError('');
    } catch (error:any) {
      setError('Error adding candidate: ' + error.response.data.error);
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-5">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Informacion Personal</h2>
        <input type="text" name="firstName" placeholder="Nombre" required onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md mb-2" />
        <input type="text" name="lastName" placeholder="Apellido" required onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md mb-2" />
        <input type="email" name="email" placeholder="Correo electrónico" required onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md mb-2" />
        <input type="text" name="phone" placeholder="Teléfono (opcional)" onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md mb-2" />
        <input type="text" name="address" placeholder="Dirección (opcional)" onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md" />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Educación</h2>
        <input type="text" name="institucion" placeholder="Institución" required onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md mb-2" />
        <input type="text" name="titulo" placeholder="Título" required onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md mb-2" />
        <input type="date" name="fecha_inicio" placeholder="Fecha de inicio" required onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md mb-2" />
        <input type="date" name="fecha_fin" placeholder="Fecha de fin" onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md" />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Experencia Laboral</h2>
        <input type="text" name="empresa" placeholder="Empresa" required onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md mb-2" />
        <input type="text" name="cargo" placeholder="Cargo" required onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md mb-2" />
        <textarea name="descripcion" placeholder="Descripción" required onChange={handleInputChange} className="textarea textarea-bordered w-full p-2 rounded-md mb-2"></textarea>
        <input type="date" name="fecha_inicio_experiencia" placeholder="Fecha de inicio" required onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md mb-2" />
        <input type="date" name="fecha_fin_experiencia" placeholder="Fecha de fin" onChange={handleInputChange} className="input input-bordered w-full p-2 rounded-md" />

      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">CV</h2>
        <div {...getRootProps({className: 'drag-drop-area'})} aria-label="File upload area">
          <input {...getInputProps()} aria-describedby="file-upload-description" />
          <p id="file-upload-description">
            {uploadedFileName ? `Uploaded file: ${uploadedFileName}` : "Seleccionar archivo"}
          </p>
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
      <button type="submit" className="btn btn-primary w-full p-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white">Añadir Candidato</button>
    </form>
  );
};

export default CandidateForm;
