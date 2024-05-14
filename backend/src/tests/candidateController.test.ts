import request from 'supertest';
import { app } from '../index';

describe('POST /api/candidates', () => {
  it('should create a new candidate', async () => {
    const response = await request(app)
      .post('/api/candidates')
      .send({
        nombre: 'John',
        apellido: 'Doe',
        correo_electronico: 'john.doe@example.com',
        telefono: '1234567890',
        direccion: '123 Main St',
        educaciones: [{ institucion: 'University', titulo: 'BSc', fecha_inicio: '2020-01-01' }],
        experiencias: [{ empresa: 'Company', titulo: 'Developer', descripcion: 'Worked on projects', fecha_inicio: '2021-01-01' }],
        documentos: [{ tipo_documento: 'PDF', ruta_archivo: '/path/to/cv.pdf' }],
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});

