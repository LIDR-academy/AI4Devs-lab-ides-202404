import { Server } from 'http';
import { app } from './src/index';

let server: Server;

export = async function globalSetup() {
  server = app.listen(3010);
  (global as any).__SERVER__ = server;
};
