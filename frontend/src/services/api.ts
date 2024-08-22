import axios from 'axios';
import { Candidate } from '../types/Candidate';

const API_URL = 'http://localhost:3010'; // Adjust this to match your backend URL

export const addCandidate = async (candidate: Candidate): Promise<Candidate> => {
  const formData = new FormData();
  Object.keys(candidate).forEach(key => {
    if (key !== 'cv') {
      formData.append(key, candidate[key as keyof Candidate] as string);
    }
  });
  if (candidate.cv) {
    formData.append('cv', candidate.cv);
  }

  try {
    const response = await axios.post(`${API_URL}/api/candidates`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'An error occurred while adding the candidate');
    }
    throw error;
  }
};