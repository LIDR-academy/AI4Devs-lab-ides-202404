import React, { useState } from 'react';

function AddCandidateForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        education: '',
        experience: '',
        resume: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            resume: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        const formData = new FormData();
        formData.append('firstName', formData.firstName);
        formData.append('lastName', formData.lastName);
        formData.append('email', formData.email);
        formData.append('phone', formData.phone);
        formData.append('address', formData.address);
        formData.append('education', formData.education);
        formData.append('experience', formData.experience);
        formData.append('resume', formData.resume);
    
        try {
            const response = await fetch('http://localhost:3010/candidates', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Candidate added:', result);
                // Optionally reset form or give user feedback
            } else {
                throw new Error('Failed to add candidate');
            }
        } catch (error) {
            console.error('Error adding candidate:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
            <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Education" />
            <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" />
            <input type="file" name="resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
            <button type="submit">Add Candidate</button>
        </form>
    );
}

export default AddCandidateForm;
