import axios from 'axios';
import { CandidateFormData } from '../../presentation/components/CandidateForm';

const API_URL = 'http://localhost:3010/candidates';

export const addCandidate = async (candidateData: CandidateFormData) => {
  try {
    const response = await axios.post(API_URL, candidateData);
    return response.data;
  } catch (error) {
    console.error('Error adding candidate:', error);
    throw error;
  }
};

