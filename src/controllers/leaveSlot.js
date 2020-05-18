import db from '../db';

const leaveSlot = async (req, res) => {
  const parkingLot = await db.ParkingLot.findByPk(req.params.id);

  if (!parkingLot) {
    return res.code(404).send({ message: 'parking_lot_not_found' });
  }

  const { slotNumber } = req.body;

  const leftParkingSlot = await db.ParkingSlot.findOne({
    where: {
      parkingLotId: parkingLot.id,
      slotNumber,
    },
  });

  if (!leftParkingSlot) {
    await t.rollback();

    return res.code(400).send({ message: 'invalid_parking_slot_number' });
  }

  await leftParkingSlot.update({
    carPlateNumber: null,
    carSize: null,
  });

  return leftParkingSlot;
}

export default leaveSlot;
