import Fastify from 'fastify';

const app = Fastify();

app.get('/', async () => ({ message: 'API is available' }));

const start = async () => {
  try {
    const port = process.env.PORT || 9000;
    await app.listen(port);

    console.info(`API is running on PORT ${port}`);
  } catch (err) {
    console.info(err);
  }
};

export {
  app,
  start,
};
