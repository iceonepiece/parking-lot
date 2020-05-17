import createParkingLot from '../controllers/createParkingLot';
import getParkingLotStatus from '../controllers/getParkingLotStatus';
import parkCar from '../controllers/parkCar';

export default (fastify, opts, next) => {
  fastify.get('/:id', getParkingLotStatus);

  fastify.post('/', createParkingLot);
  fastify.post('/:id/park', parkCar);

  next();
};
