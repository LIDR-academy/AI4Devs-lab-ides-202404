import { PrismaClient } from '@prisma/client';
import { Education } from './Education';
import { WorkExperience } from './WorkExperience';
import { Resume } from './Resume';

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
    resumes: Resume[];

    constructor(data: any) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.phone = data.phone;
        this.address = data.address;
        this.education = data.education || [];
        this.workExperience = data.workExperience || [];
        this.resumes = data.resumes || [];
    }

    async save() {
        const candidateData: any = {};

        // Solo añadir al objeto candidateData los campos que no son undefined
        if (this.firstName !== undefined) candidateData.firstName = this.firstName;
        if (this.lastName !== undefined) candidateData.lastName = this.lastName;
        if (this.email !== undefined) candidateData.email = this.email;
        if (this.phone !== undefined) candidateData.phone = this.phone;
        if (this.address !== undefined) candidateData.address = this.address;

        // Añadir educations si hay alguna para añadir
        if (this.education.length > 0) {
            candidateData.educations = {
                create: this.education.map(edu => ({
                    institution: edu.institution,
                    title: edu.title,
                    startDate: edu.startDate,
                    endDate: edu.endDate
                }))
            };
        }

        // Añadir workExperiences si hay alguna para añadir
        if (this.workExperience.length > 0) {
            candidateData.workExperiences = {
                create: this.workExperience.map(exp => ({
                    company: exp.company,
                    position: exp.position,
                    description: exp.description,
                    startDate: exp.startDate,
                    endDate: exp.endDate
                }))
            };
        }

        // Añadir resumes si hay alguno para añadir
        if (this.resumes.length > 0) {
            candidateData.resumes = {
                create: this.resumes.map(resume => ({
                    file: resume.file,
                    description: resume.description
                }))
            };
        }

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
