import React, { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { TextField, Button, Typography, Paper } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { createCandidate, fetchCandidateOptions, checkEmailExists } from '../services/candidateService';
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  workExperience: string;
  cvFile: File | null;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  education?: string;
  workExperience?: string;
}

const AddCandidateForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    workExperience: '',
    cvFile: null
  });
  const [fileSelected, setFileSelected] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let errors: FormErrors = {};
    if (!formData.firstName.trim()) errors.firstName = "First Name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.education.trim()) errors.education = "Education is required";
    if (!formData.workExperience.trim()) errors.workExperience = "Work Experience is required";
    return errors; 
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === "cvFile") {
      setFormData(prev => ({ ...prev, [name]: files ? files[0] : null }));
      setFileSelected(!!(files && files.length > 0));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear the error for the field if it is now valid
    if (value.trim()) {
      setFormErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const checkEmail = useCallback(async (email: string) => {
    try {
      const emailExists = await checkEmailExists(email); // Corrected function name
      if (emailExists) {
        setEmailError('Email already exists');
      } else {
        setEmailError('');
      }
    } catch (error) {
      console.error('Failed to validate email:', error);
    }
  }, []);
  
  const debouncedCheckEmail = useMemo(() => _.debounce(checkEmail, 500), [checkEmail]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const { cvFile, ...candidateData } = formData;
      try {
        await createCandidate(candidateData, cvFile);
        navigate('/'); // Navigate to the home page
      } catch (error) {
        console.error('Failed to save candidate:', error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const [educationOptions, setEducationOptions] = useState<string[]>([]);
  const [workExperienceOptions, setWorkExperienceOptions] = useState<string[]>([]);
  useEffect(() => {
    fetchCandidateOptions().then(({ educationOptions, workExperienceOptions }) => {
      setEducationOptions(educationOptions);
      setWorkExperienceOptions(workExperienceOptions);
    });
  }, []);

  return (
    <Paper style={{ padding: 20, maxWidth: 600, margin: "20px auto" }}>
      <Typography variant="h6">Candidate Form</Typography>
      <form onSubmit={handleSubmit}>
      <TextField error={!!formErrors.firstName} helperText={formErrors.firstName} fullWidth label="First Name" name="firstName" onChange={handleChange} margin="normal" />
        <TextField error={!!formErrors.lastName} helperText={formErrors.lastName} fullWidth label="Last Name" name="lastName" onChange={handleChange} margin="normal" />
        <TextField fullWidth
          label="Email"
          name="email"
          type="email"  // Helps with basic email input validation
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
            debouncedCheckEmail(event.target.value);
          }}
          margin="normal"
          error={!!formErrors.email || !!emailError}
          helperText={formErrors.email || emailError}
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          type="tel"  // Helps with basic phone input handling
          onChange={handleChange}
          margin="normal"
          error={!!formErrors.phone}
          helperText={formErrors.phone}
        />
        <TextField error={!!formErrors.address} helperText={formErrors.address} fullWidth label="Address" name="address" onChange={handleChange} margin="normal" />
        <Autocomplete
          freeSolo
          options={educationOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!formErrors.education}
              helperText={formErrors.education}
              label="Education"
              margin="normal"
              name="education"
              onChange={handleChange}
              fullWidth
            />
          )}
          onChange={(event, newValue) => {
            setFormData(prev => ({ ...prev, education: newValue || '' }));
            if (newValue) {
              setFormErrors(prevErrors => ({ ...prevErrors, education: undefined }));
            }
          }}
        />

        <Autocomplete
          freeSolo
          options={workExperienceOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!formErrors.workExperience}
              helperText={formErrors.workExperience}
              label="Work Experience"
              margin="normal"
              name="workExperience"
              onChange={handleChange}
              fullWidth
            />
          )}
          onChange={(event, newValue) => {
            setFormData(prev => ({ ...prev, workExperience: newValue || '' }));
            if (newValue) {
              setFormErrors(prevErrors => ({ ...prevErrors, workExperience: undefined }));
            }
          }}
        />

        {fileSelected && formData.cvFile && (
          <Typography variant="body2" style={{ marginTop: 10 }}>
            File Selected: {formData.cvFile.name}
          </Typography>
        )}
        <Button variant="contained" component="label" fullWidth>
          {fileSelected ? "Edit File" : "Upload CV"}
          <input type="file" hidden name="cvFile" onChange={handleChange} />
        </Button>
        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 20 }}>
          Save Candidate
        </Button>
      </form>
    </Paper>
  );
}

export default AddCandidateForm;

