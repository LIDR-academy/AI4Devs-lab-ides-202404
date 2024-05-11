import axios from 'axios';

const API_URL = 'http://localhost:3010/api/candidates'; // Asegúrate de que la URL coincida con tu configuración del backend

export const addCandidate = async (candidateData: any) => {
  try {
    const response = await axios.post(API_URL, candidateData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al añadir candidato:', error);
    throw error;
  }
};