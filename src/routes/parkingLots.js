import createParkingLot from '../controllers/createParkingLot';
import getCarPlateNumbers from '../controllers/getCarPlateNumbers';
import getParkedSlotNumbers from '../controllers/getParkedSlotNumbers';
import getParkingLotStatus from '../controllers/getParkingLotStatus';
import parkCar from '../controllers/parkCar';
import leaveSlot from '../controllers/leaveSlot';

export default (fastify, opts, next) => {
  fastify.get('/:id', getParkingLotStatus);
  fastify.get('/:id/car-plate-numbers', getCarPlateNumbers);
  fastify.get('/:id/parked-slot-numbers', getParkedSlotNumbers);

  fastify.post('/', createParkingLot);
  fastify.post('/:id/park', parkCar);
  fastify.post('/:id/leave', leaveSlot);

  next();
};
