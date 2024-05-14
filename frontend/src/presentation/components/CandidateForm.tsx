import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addCandidate } from '../../infrastructure/services/candidateService';

export interface CandidateFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  workExperience: string;
  cvUrl: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  education: yup.string().required('Education is required'),
  workExperience: yup.string().required('Work experience is required'),
  cvUrl: yup.string().url('Invalid URL format').required('CV URL is required'),
});

interface CandidateFormProps {
  onSuccess: () => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CandidateFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: CandidateFormData) => {
    try {
      const createdCandidate = await addCandidate(data);
      console.log('Candidate added successfully:', createdCandidate);
      onSuccess(); // Llamar a la función onSuccess cuando el candidato sea creado exitosamente
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <input {...register('firstName')} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
        <label>Last Name</label>
        <input {...register('lastName')} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Phone</label>
        <input {...register('phone')} />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
      <div>
        <label>Address</label>
        <input {...register('address')} />
        {errors.address && <p>{errors.address.message}</p>}
      </div>
      <div>
        <label>Education</label>
        <input {...register('education')} />
        {errors.education && <p>{errors.education.message}</p>}
      </div>
      <div>
        <label>Work Experience</label>
        <input {...register('workExperience')} />
        {errors.workExperience && <p>{errors.workExperience.message}</p>}
      </div>
      <div>
        <label>CV URL</label>
        <input {...register('cvUrl')} />
        {errors.cvUrl && <p>{errors.cvUrl.message}</p>}
      </div>
      <button type="submit">Add Candidate</button>
    </form>
  );
};

export default CandidateForm;

