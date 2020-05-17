import createParkingLot from '../controllers/createParkingLot';
import getParkingLotStatus from '../controllers/getParkingLotStatus';
import parkCar from '../controllers/parkCar';
import leaveSlot from '../controllers/leaveSlot';

export default (fastify, opts, next) => {
  fastify.get('/:id', getParkingLotStatus);

  fastify.post('/', createParkingLot);
  fastify.post('/:id/park', parkCar);
  fastify.post('/:id/leave', leaveSlot);

  next();
};