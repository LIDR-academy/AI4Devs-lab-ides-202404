import React, { ComponentProps, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from './ui/Button';;

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  telephone: '',
  address: '',
  education: '',
  workExperience: '',
  resume: null as File | null
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  telephone: Yup.string(),
  address: Yup.string(),
  education: Yup.string(),
  workExperience: Yup.string(),
  resume: Yup.mixed().nullable()
});

interface TextInputProps extends ComponentProps<'input'> {
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
  error?: string | undefined;
};


const TextInput = ({ label, name, type = 'text', multiline = false, error, ...props }: TextInputProps) => {
  return (
    <div className='m-auto  w-full'>
      <label className='block text-sm' htmlFor={name}>{label}</label>
      {!multiline ? (
        <input
          id={name}
          className='border-2 border-gray-300 rounded-md p-1 w-full'
          type={type}
          name={name}
          {...props}
        />
      ) : (
        // @ts-ignore
        <textarea
          id={name}
          className='border-2 border-gray-300 rounded-md p-1 w-full'
          name={name}
          {...props}
        />
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};


function AddCandidate() {

    const [ submitting, setSubmitting ] = useState(false);

    
    const onSubmit = async (values: typeof initialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
      const { resume, ...firstValues }= values 
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/candidate`;
    try {
      setSubmitting(true)
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(firstValues)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const candidate = await response.json();
      console.log(candidate);
      alert('Candidate Added Successfully!');

      // If the candidate is successfully added and resume file is present
      if (resume) {
        const resumeEndpoint = `${process.env.REACT_APP_BACKEND_URL}/candidate/${candidate.id}/resume`;
        const formData = new FormData();
        formData.append('resume', resume);

        const resumeResponse = await fetch(resumeEndpoint, {
          method: 'POST',
          body: formData // No content-type header needed, browser will set it with boundary
        });

        if (!resumeResponse.ok) {
          throw new Error('Failed to upload resume');
        }

        const resumeResult = await resumeResponse.json();
        console.log(resumeResult);
        alert('Resume uploaded successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add candidate.');
    } finally{
        setSubmitting(false);
    }

  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <div>
      <h1>Add Candidate</h1>
      <form className='flex flex-col gap-2 w-1/2 m-auto' onSubmit={formik.handleSubmit}>
        <TextInput label="First Name:" type="text" name="firstName" onChange={formik.handleChange} error={formik.errors.firstName} value={formik.values.firstName} />
        <TextInput label="Last Name:" type="text" name="lastName" onChange={formik.handleChange} error={formik.errors.lastName} value={formik.values.lastName} />
        <TextInput label="Email:" type="email" name="email" onChange={formik.handleChange} error={formik.errors.email} value={formik.values.email} />
        <TextInput label="Telephone:" type="tel" name="telephone" onChange={formik.handleChange} value={formik.values.telephone} />
        <TextInput multiline label="Address:" name="address" onChange={formik.handleChange} value={formik.values.address} />
        <TextInput multiline label="Education:" name="education" onChange={formik.handleChange} value={formik.values.education} />
        <TextInput multiline label="Work Experience:" name="workExperience" onChange={formik.handleChange} value={formik.values.workExperience} />
        <TextInput label='Resume (PDF or DOCX):' type="file" name="resume" onChange={(event) => {
            const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
            formik.setFieldValue("resume", file);
          }} accept=".pdf,.doc,.docx" />
        <Button type="submit">Add Candidate</Button>
      </form>
    </div>
  );
}

export default AddCandidate;
