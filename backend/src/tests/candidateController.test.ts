import request from 'supertest';
import app from '../index'; // Corrected import for app

describe('POST /candidates', () => {
  it('should add a candidate successfully', async () => {
    const candidateData = {
      firstName: 'John Doe',
      lastName: 'Smith',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      address: '123 Main St',
      educations: [{
        institution: 'University',
        title: 'BSc Computer Science',
        startDate: '2010-09-01',
        endDate: '2014-06-01'
      }],
      experiencia_laboral: [{
        empresa: 'Tech Co',
        puesto: 'Developer',
        descripcion: 'Developed various applications',
        startDate: '2015-07-01',
        endDate: '2020-08-01'
      }],
      cv: {
        mimetype: 'application/pdf'
      }
    };

    const response = await request(app)
      .post('/candidates')
      .send(candidateData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Candidate added successfully');
    expect(response.body.data).toHaveProperty('id');
  });

  it('should return an error for invalid firstName', async () => {
    const candidateData = {
      firstName: 'J', // Invalid firstName
      lastName: 'Smith',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      address: '123 Main St',
      educations: [{
        institution: 'University',
        title: 'BSc Computer Science',
        startDate: '2010-09-01',
        endDate: '2014-06-01'
      }],
      experiencia_laboral: [{
        empresa: 'Tech Co',
        puesto: 'Developer',
        descripcion: 'Developed various applications',
        startDate: '2015-07-01',
        endDate: '2020-08-01'
      }],
      cv: {
        mimetype: 'application/pdf'
      }
    };

    const response = await request(app)
      .post('/candidates')
      .send(candidateData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Error adding candidate');
    expect(response.body.error).toBe('Invalid firstName');
  });

  // Additional tests for other validation errors can be added here
});