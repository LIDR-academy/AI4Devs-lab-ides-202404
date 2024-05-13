import request from 'supertest';
import { app } from '../index';
import { Server } from 'http';

let server: Server;

beforeAll((done) => {
    server = app.listen(0, done);  // Listen on a random available port
});

describe('GET /', () => {
    it('responds with expected message', async () => {
        const response = await request(server).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hola LTI!');
    });
});
