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
  cvUrl?: string;
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

export const uploadCandidateCV = async (file: File, candidateId: number): Promise<boolean> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("candidateId", candidateId.toString());
  
    try {
      const response = await axios.post("http://localhost:3010/Candidate/uploadCv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.status === 200; // Asumiendo que el servidor devuelve 200 para una carga exitosa
    } catch (error) {
      console.error("Upload failed:", error);
      return false;
    }
  };