export = async function globalTeardown() {
  const server = (global as any).__SERVER__;
  if (server) {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  }
};
