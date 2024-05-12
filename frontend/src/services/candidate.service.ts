import axios from 'axios';

const API_URL = 'http://localhost:3010/api/candidates'; // Asegúrate de que la URL coincida con tu configuración del backend

export const addCandidate = async (candidateData: any) => {
  try {
    const response = await axios.post(API_URL, candidateData, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Manejo de errores específicos basado en el código de estado HTTP
      if (error.response.status === 409) {
        throw new Error('El correo electrónico ya está registrado. Por favor, utiliza otro.');
      }
    }
    console.error('Error al añadir candidato:', error);
    throw error; // Propagar el error
  }
};