import FormData from '../services/formData';

class ApiService {
    async postCandidate(data: FormData) {
      const response = await fetch('http://localhost:3010/candidates', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to post candidate');
      }
      return response.json();
    }
  }
  
  export default new ApiService();