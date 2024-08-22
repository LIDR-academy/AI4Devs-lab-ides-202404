export interface Candidate {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
  cv?: File;
}
