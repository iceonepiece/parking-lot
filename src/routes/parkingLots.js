import createParkingLot from '../controllers/createParkingLot';

export default (fastify, opts, next) => {
  fastify.post('/', createParkingLot);

  next();
};
