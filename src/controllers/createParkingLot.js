import db from '../db';

const createParkingLot = async (req, res) => {
  const { name, maxSlots } = req.body;

  if (!name) {
    return res.code(400).send({ message: 'parameter_{name}_not_provided' });
  }

  if (!maxSlots) {
    return res.code(400).send({ message: 'parameter_{maxSlots}_not_provided' });
  }

  const t = await db.sequelize.transaction();

  try {
    const parkingLot = await db.ParkingLot.create({
      name,
      maxSlots,
    }, { transaction: t });

    const toCreateParkingSlots = [];

    for (let i = 0; i < maxSlots; i += 1) {
      toCreateParkingSlots.push({
        parkingLotId: parkingLot.id,
        slotNumber: i + 1,
      });
    }

    await db.ParkingSlot.bulkCreate(toCreateParkingSlots, { transaction: t });

    await t.commit();

    return parkingLot;
  } catch (err) {
    await t.rollback();

    return res.code(500).send({ message: err.message });
  }
}

export default createParkingLot;
