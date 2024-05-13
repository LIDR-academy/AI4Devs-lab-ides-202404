import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCandidate() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: ''
  });

  const navigate = useNavigate(); // Move useNavigate here, outside of useEffect

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement submission logic here
  };

  useEffect(() => {
    navigate('/add-candidate');
  }, [navigate]); // Use navigate inside useEffect

  return (
    <div className="add-candidate-form">
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Education" />
        <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" />
        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
}

export default AddCandidate;
