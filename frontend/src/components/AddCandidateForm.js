import React, { useState } from 'react';
import axios from 'axios';

const AddCandidateForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
  });
  const [cv, setCv] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (cv) {
      data.append('cv', cv);
    }
    try {
      await axios.post('http://localhost:3010/api/candidates', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Candidate added successfully!');
    } catch (error) {
      alert('Error adding candidate');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <input type="text" name="education" placeholder="Education" onChange={handleChange} required />
      <input type="text" name="experience" placeholder="Experience" onChange={handleChange} required />
      <input type="file" name="cv" onChange={handleFileChange} />
      <button type="submit">Add Candidate</button>
    </form>
  );
};

export default AddCandidateForm;