import db from '../db';

const parkCar = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const parkingLot = await db.ParkingLot.findByPk(req.params.id);

    if (!parkingLot) {
      return res.code(404).send({ message: 'parking_lot_not_found' });
    }

    // get the nearest slot number (ordered by slot number)
    const allocatedParkingSlot = await db.ParkingSlot.findOne({
      where: {
        parkingLotId: parkingLot.id,
        carId: null,
      },
      order: [['slotNumber', 'asc']],
    }, { transaction: t });

    if (!allocatedParkingSlot) {
      await t.rollback();

      return res.code(400).send({ message: 'parking_lot_is_not_available' });
    }

    const { plateNumber, size } = req.body;
    const parkedCar = await db.Car.create({
      plateNumber,
      size,
    }, { transaction: t });

    await allocatedParkingSlot.update({
      carId: plateNumber,
    }, { transaction: t });

    await t.commit();

    return {
      slotNumber: allocatedParkingSlot.slotNumber,
    };
    return {};
  } catch (err) {
    await t.rollback();

    return res.code(500).send({ message: err.message });
  }

}

export default parkCar;
