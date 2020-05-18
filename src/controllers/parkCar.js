import db from '../db';

const parkCar = async (req, res) => {
  const parkingLot = await db.ParkingLot.findByPk(req.params.id);

  if (!parkingLot) {
    return res.code(404).send({ message: 'parking_lot_not_found' });
  }

  // get the nearest slot number (ordered by slot number)
  const allocatedParkingSlot = await db.ParkingSlot.findOne({
    where: {
      parkingLotId: parkingLot.id,
      carPlateNumber: null,
    },
    order: [['slotNumber', 'asc']],
  });

  if (!allocatedParkingSlot) {
    return res.code(400).send({ message: 'parking_lot_is_not_available' });
  }

  const { plateNumber, size } = req.body;

  await allocatedParkingSlot.update({
    carPlateNumber: plateNumber,
    carSize: size,
  });

  return allocatedParkingSlot;
}

export default parkCar;
