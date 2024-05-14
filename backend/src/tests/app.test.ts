import request from 'supertest';
import { app } from '../index';
import { Request, Response, NextFunction } from 'express'; // Import the necessary types
import { Server } from 'http'; // Add this import

describe('GET /', () => {
    let server: Server;

    beforeAll(() => {
      server = app.listen(3010); // Ad  just port as necessary
    });
  
    afterAll(() => {
      server.close();   
    });
    
    it('responds with Hola LTI!', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hola LTI!');
    });
});
