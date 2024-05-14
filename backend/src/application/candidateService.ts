import prisma from '../infrastructure/prismaClient';
import { Candidato } from '../domain/models';

export const createCandidate = async (data: any) => {
  return await prisma.candidato.create({
    data: {
      ...data,
      educaciones: { create: data.educaciones },
      experiencias: { create: data.experiencias },
      documentos: { create: data.documentos },  // Ensure this handles file data correctly
    },
  });
};

