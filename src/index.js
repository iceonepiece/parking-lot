import Fastify from 'fastify';

const fastify = Fastify();

fastify.get('/', async () => ({ message: 'API is available' }));

const PORT = process.env.PORT || 9000;

fastify.listen(PORT, () => {
  console.info(`API is running on PORT ${PORT}`);
});
