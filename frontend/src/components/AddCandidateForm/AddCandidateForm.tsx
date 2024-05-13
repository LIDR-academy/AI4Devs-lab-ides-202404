import React, { useState } from 'react';
import axios from 'axios';
import './AddCandidateForm.css';
import Sidebar from '../Sidebar/Sidebar';

const Alert = ({ message, type }: { message: string, type: 'success' | 'error' }) => (
  <div className={`alert ${type}`}>
    {message}
  </div>
);

const AddCandidateForm = () => {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    documents: { file: string | null; documentType: string }[];
  }>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    documents: []
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: any, index?: number) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const newDocuments = [...formData.documents];
      if (files[0]) {
        const fileUrl = URL.createObjectURL(files[0]);
        newDocuments[index!].file = fileUrl;
      }
      setFormData({ ...formData, documents: newDocuments });
    } else if (name.startsWith('documentType')) {
      const newDocuments = [...formData.documents];
      newDocuments[index!].documentType = value;
      setFormData({ ...formData, documents: newDocuments });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addDocumentInput = () => {
    setFormData({
      ...formData,
      documents: [...formData.documents, { file: null, documentType: '' }]
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const basicData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim()
    };

    try {
      const basicResponse = await axios.post('http://localhost:3010/candidates', basicData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const candidateId = basicResponse.data.candidate_id;

      await Promise.all(formData.documents.map(async (doc) => {
        if (doc.file && doc.documentType) {
          const documentData = {
            documentType: doc.documentType,
            fileUrl: doc.file
          };

          await axios.post(`http://localhost:3010/candidates/${candidateId}/documents`, documentData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
      }));

      // Show success alert and clear form
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);

      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        documents: []
      });

    } catch (error: any) {
      setErrorMessage('😭 ' + error.response?.data?.error || 'Failed to save candidate 😭');
      setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <header>
          <h1>Add New Candidate</h1>
        </header>
        <div className="content">
          {showSuccessAlert && <Alert message="Candidate saved successfully 🚀" type="success"/>}
          {errorMessage && <Alert message={errorMessage} type="error"/>}
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

            {formData.documents.map((doc, index) => (
              <div key={index} className="file-box">
                <label htmlFor={`file-${index}`}>Upload Document:</label>
                <input type="file" id={`file-${index}`} name="file" accept=".pdf,.docx" onChange={(e) => handleChange(e, index)} />

                <label htmlFor={`documentType-${index}`}>Document Type:</label>
                <select id={`documentType-${index}`} name={`documentType-${index}`} required onChange={(e) => handleChange(e, index)} value={doc.documentType}>
                  <option value="">Select Type</option>
                  <option value="resume">Resume</option>
                  <option value="certificate">Certificate</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="other">Other</option>
                </select>
              </div>
            ))}
            <button type="button" onClick={addDocumentInput}>
              {formData.documents.length > 0 ? "Add more documents" : "Add document"}
            </button>
            <button className="success" type="submit">Create new candidate</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateForm;
