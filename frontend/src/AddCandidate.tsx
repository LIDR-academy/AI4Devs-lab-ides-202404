import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCandidate.css'; // Import CSS for styling

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
  resume: File | null;
}

function AddCandidate() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    resume: null
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'file') {
      if (e.target.files && e.target.files.length > 0) {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      const value = formData[key as keyof FormData];
      if (value instanceof File || typeof value === 'string') {
        data.append(key, value);
      }
    });

    const response = await fetch('http://localhost:3010/api/candidates', {
      method: 'POST',
      body: data, // Send as FormData
    });
    console.log('response from the backend', response);
    // Implement submission logic here
    // navigate('/some-path'); // Optionally navigate after submit
  };

  return (
    <div className="add-candidate-container">
      <h2>Add New Candidate</h2>
      <form onSubmit={handleSubmit} className="add-candidate-form">
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
          Education:
          <input type="text" name="education" value={formData.education} onChange={handleChange} />
        </label>
        <label>
          Experience:
          <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
        </label>
        <label>
          Resume:
          <input type="file" name="resume" accept=".doc,.docx,.pdf" onChange={handleChange} />
        </label>
        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
}

export default AddCandidate;
