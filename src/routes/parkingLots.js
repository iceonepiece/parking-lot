import getParkingLotStatus from '../controllers/getParkingLotStatus';
import createParkingLot from '../controllers/createParkingLot';

export default (fastify, opts, next) => {
  fastify.get('/:id', getParkingLotStatus);
  
  fastify.post('/', createParkingLot);

  next();
};
