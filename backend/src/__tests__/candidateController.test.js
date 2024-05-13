const { createCandidate } = require('../controllers/candidateController');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        candidate: {
          create: jest.fn().mockResolvedValue({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com'
          })
        }
      };
    })
  };
});

describe('createCandidate', () => {
  it('should create a candidate successfully', async () => {
    const req = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    await createCandidate(req, res);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    });
  });
});
