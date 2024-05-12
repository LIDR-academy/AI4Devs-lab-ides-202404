import { Request, Response } from 'express';
import { CandidateController } from '../presentation/candidateController';
import { CandidateService } from '../application/candidateService';
import { CandidateRepository } from '../infrastructure/candidateRepository';
import { Candidate } from '../domain/candidate';
import { PrismaClient } from '@prisma/client';
import { jest } from '@jest/globals';

jest.mock('../infrastructure/CandidateRepository'); // Asegúrate de mockear el repositorio

describe('CandidateController', () => {
    let candidateController: CandidateController;
    let candidateService: CandidateService;
    let candidateRepository: CandidateRepository;
    let prisma: PrismaClient;
    
    beforeAll(() => {
        prisma = new PrismaClient();
        candidateRepository = new CandidateRepository(prisma);
        candidateService = new CandidateService(candidateRepository);
        candidateController = new CandidateController(candidateService);
    });
    
    describe('addCandidate', () => {
        it('should return a 201 status code and the candidate data', async () => {
        const req = { body: { name: 'John Doe', email: 'john@example.com' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn().mockReturnThis(),
            sendStatus: jest.fn().mockReturnThis(),
            links: jest.fn().mockReturnThis(),
            sendFile: jest.fn().mockReturnThis(),
            // Añade otros métodos y propiedades necesarios según la interfaz Response
        } as unknown as Response;
        const candidateData = new Candidate(req.body);
        // Asegúrate de que el tipo de candidateService.addCandidate sea correctamente inferido
        //candidateService.addCandidate = jest.fn().mockResolvedValue(candidateData) as jest.MockedFunction<typeof candidateService.addCandidate>;
        await candidateController.addCandidate(req as Request, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(candidateData);
        });
    });
});
