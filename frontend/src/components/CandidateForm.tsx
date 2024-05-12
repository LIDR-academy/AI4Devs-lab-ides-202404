import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService'; 
import FormData from '../services/formData';

interface CandidateFormProps {
  setSuccess: (value: boolean) => void;
}

const CandidateForm: React.FC<CandidateFormProps> = (props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await apiService.postCandidate(data);

      setFormData(data);
      props.setSuccess(true);
      reset();
      navigate('/');
    } catch (err) {
      console.log(err);
      setError('Form submission failed');
    }
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <h1 className="mb-4">Create new candidate</h1>
      <div className="row mb-3">
        <label className="form-label col-sm-2">Name</label>
        <div className="col-sm-10">
          <input {...register('name', { required: true })} placeholder="Name" className="form-control" />
          {errors.name && <p className="text-danger">Name is required</p>}
        </div>
      </div>
      <div className="row mb-3">
        <label className="form-label col-sm-2">Email</label>
        <div className="col-sm-10">
          <input {...register('email', { required: true })} placeholder="Email" className="form-control" />
          {errors.email && <p className="text-danger">Email is required</p>}
        </div>
      </div>
      <div className="row mb-3">
        <label className="form-label col-sm-2">Phone</label>
        <div className="col-sm-10">
          <input {...register('phone')} placeholder="Phone" className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label className="form-label col-sm-2">Address</label>
        <div className="col-sm-10">
          <input {...register('address')} placeholder="Address" className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label className="form-label col-sm-2">Education</label>
        <div className="col-sm-10">
          <input {...register('education')} placeholder="Education" className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label className="form-label col-sm-2">Work Experience</label>
        <div className="col-sm-10">
          <input {...register('work_experience')} placeholder="Work Experience" className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <label className="form-label col-sm-2">CV</label>
        <div className="col-sm-10">
          <input {...register('cv')} type="file" accept=".pdf,.doc,.docx" className="form-control" />
        </div>
      </div>
      <button type="button" className="btn btn-secondary btn-margin" onClick={goBack}>Back</button>
      <button type="submit" className="btn btn-primary">Submit</button>
      {error && <p className="text-danger">{error}</p>}
    </form>
  );
};

export default CandidateForm;