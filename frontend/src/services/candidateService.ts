import axios from 'axios';

const API_URL = 'http://localhost:3010/api/candidates';

export const createCandidate = async (candidateData: any) => {
  try {
    const response = await axios.post(API_URL, candidateData);
    return response.data;
  } catch (error) {
    console.error('Error creating candidate:', error);
    throw error;
  }
};

