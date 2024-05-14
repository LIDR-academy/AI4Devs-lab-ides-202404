import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/candidates`;

interface Candidate {
    [key: string]: string | File | null | undefined;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    education?: string;
    workExperience?: string;
    file?: File | null;  // Allow null as a valid type in FormData
  }

export const createCandidate = async (candidate: Candidate, cvFile: File | null) => {
  try {
    const formData = new FormData();
    Object.keys(candidate).forEach(key => {
      if (candidate[key] !== undefined) {
        formData.append(key, candidate[key] as string);
      }
    });
    if (cvFile) {
      formData.append('file', cvFile);
    }
    const response = await axios.post(baseUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;  // Return the response data for further processing
  } catch (error) {
    console.error("Error occurred while creating a candidate:", error);
    if (axios.isAxiosError(error)) {
      console.error("Error details:", error.response?.data || error.message);
    }
    throw error;  // Rethrow the error to be handled by the caller
  }
};

export const fetchCandidateOptions = async () => {
  try {
    const response = await axios.get(`${baseUrl}/options`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch education options:', error);
  }
};

export const checkEmailExists = async (email: string) => {
  try {
    const response = await axios.get(`${baseUrl}/check-email?email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Failed to check email:', error);
  }
};

