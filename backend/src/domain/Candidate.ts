import { PrismaClient } from '@prisma/client';
import { Education } from './Education';
import { WorkExperience } from './WorkExperience';

const prisma = new PrismaClient();

export class Candidate {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    education: Education[];
    workExperience: WorkExperience[];

    constructor(data: any) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.phone = data.phone;
        this.address = data.address;
        this.education = data.education || [];
        this.workExperience = data.workExperience || [];
    }

    async save() {
        const candidateData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            address: this.address,
            educations: {
                create: this.education.map(edu => ({
                    institution: edu.institution,
                    title: edu.title,
                    startDate: edu.startDate,
                    endDate: edu.endDate
                }))
            },
            workExperiences: {
                create: this.workExperience.map(exp => ({
                    company: exp.company,
                    position: exp.position,
                    description: exp.description,
                    startDate: exp.startDate,
                    endDate: exp.endDate
                }))
            }
        };

        if (this.id) {
            // Actualizar un candidato existente
            return await prisma.candidate.update({
                where: { id: this.id },
                data: candidateData
            });
        } else {
            // Crear un nuevo candidato
            try {
                const result = await prisma.candidate.create({
                    data: candidateData
                });
                return result;
            } catch (error: any) {
                throw error;
            }
        }
    }
}