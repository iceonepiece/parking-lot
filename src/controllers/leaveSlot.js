import db from '../db';

const leaveSlot = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
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
    }, { transaction: t });

    if (!leftParkingSlot) {
      await t.rollback();

      return res.code(400).send({ message: 'invalid_parking_slot_number' });
    }

    await db.Car.destroy({
      where: {
        plateNumber: leftParkingSlot.carId,
      },
    }, { transaction: t });

    await leftParkingSlot.update({
      carId: null,
    }, { transaction: t });

    await t.commit();

    return leftParkingSlot;
  } catch (err) {
    await t.rollback();

    return res.code(500).send({ message: err.message });
  }

}

export default leaveSlot;
