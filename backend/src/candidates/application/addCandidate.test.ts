import { AddCandidateUseCase } from './addCandidate';
import { Candidate } from '../domain/candidate';

// Mock del repositorio para simular su comportamiento
class MockCandidateRepository {
  async addCandidate(candidate: Candidate): Promise<Candidate> {
    // Simular la creación de un candidato
    return { ...candidate, id: 1 };
  }
}

describe('AddCandidateUseCase', () => {
  it('should add a new candidate', async () => {
    // Arrange
    const candidateData: Candidate = {
      id: 0,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      education: 'Bachelor\'s Degree',
      workExperience: '5 years',
      cvUrl: 'example.com/cv.pdf',
    };

    const candidateRepository = new MockCandidateRepository();
    const addCandidateUseCase = new AddCandidateUseCase(candidateRepository);

    // Act
    const createdCandidate = await addCandidateUseCase.execute(candidateData);

    // Assert
    expect(createdCandidate.id).toBe(1); // Verificar que se haya asignado un ID al candidato creado
    expect(createdCandidate.firstName).toBe(candidateData.firstName); // Verificar otros campos si es necesario
  });
});

