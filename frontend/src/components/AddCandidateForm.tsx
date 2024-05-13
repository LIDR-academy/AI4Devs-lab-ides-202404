import React, { useState } from 'react';
import axios from 'axios';

const AddCandidateForm = () => {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    documentType: string;
    file: File | null;
    [key: string]: string | File | null;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    documentType: '',
    file: null
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Basic candidate details
    const basicData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim()
    };

    try {
      // Submit basic candidate details
      const basicResponse = await axios.post('http://localhost:3010/candidates', basicData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Candidate ID if needed for further requests
      const candidateId = basicResponse.data.candidate_id;

      // Submit CV
      if (formData.file) {
        const documentData = {
          documentType: formData.documentType.trim(),     
          fileUrl: formData.file       
        };

        await axios.post(`http://localhost:3010/candidates/${candidateId}/documents`, documentData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      // Optionally reset form or handle next steps
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" name="firstName" required onChange={handleChange} value={formData.firstName} />

      <label htmlFor="lastName">Last Name:</label>
      <input type="text" id="lastName" name="lastName" required onChange={handleChange} value={formData.lastName} />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required onChange={handleChange} value={formData.email} />

      <label htmlFor="phone">Phone:</label>
      <input type="tel" id="phone" name="phone" required onChange={handleChange} value={formData.phone} />

      <label htmlFor="address">Address:</label>
      <input type="text" id="address" name="address" required onChange={handleChange} value={formData.address} />

      <label htmlFor="documentType">Document Type:</label>
      <select id="documentType" name="documentType" required onChange={handleChange} value={formData.documentType}>
        <option value="">Select Type</option>
        <option value="resume">Resume</option>
        <option value="certificate">Certificate</option>
        <option value="portfolio">Portfolio</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="file">Upload CV (PDF or DOCX):</label>
      <input type="file" id="file" name="file" accept=".pdf,.docx" onChange={handleChange} />

      <button type="submit">Add Candidate</button>
    </form>
  );
};

export default AddCandidateForm;
