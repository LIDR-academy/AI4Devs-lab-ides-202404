// src/services/candidateService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3010/Candidate';

export interface Candidate {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  education?: string;
  workExperience?: string;
}

export const getCandidates = async (): Promise<Candidate[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCandidateById = async (id: number): Promise<Candidate> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCandidate = async (candidateData: Candidate): Promise<Candidate> => {
  const response = await axios.post(API_URL, candidateData);
  return response.data;
};

export const updateCandidate = async (id: number, candidateData: Candidate): Promise<Candidate> => {
  const response = await axios.put(`${API_URL}/${id}`, candidateData);
  return response.data;
};

export const deleteCandidate = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

