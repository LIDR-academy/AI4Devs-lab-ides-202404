import request from 'supertest';
import { app } from '../index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const server = app.listen();

jest.setTimeout(10000); // Increase timeout to 10 seconds

describe('Candidate API', () => {
  beforeEach(async () => {
    await prisma.candidate.deleteMany();
  });

  it('should create a new candidate', (done) => {
    const candidateData = {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      education: 'Bachelor in Computer Science',
      experience: '5 years as a software developer',
    };

    request(app)
      .post('/api/candidates')
      .send(candidateData)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(candidateData.name);
        expect(res.body.email).toBe(candidateData.email);
        done();
      });
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  });
});