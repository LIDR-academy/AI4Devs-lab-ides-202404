export class Candidate {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    education?: string;
    experience?: string;
    resumePath?: string;
  
    constructor(data: any) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.phone = data.phone;
      this.address = data.address;
      this.education = data.education;
      this.experience = data.experience;
      this.resumePath = data.resumePath;
    }
  
    // Métodos de dominio aquí, por ejemplo, validar datos del candidato
  }