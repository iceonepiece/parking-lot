import { Op } from 'sequelize';

import db from '../db';

const getParkedSlotNumbers = async (req, res) => {
  const { id } = req.params;

  const parkingLot = await db.ParkingLot.findByPk(id);

  if (!parkingLot) {
    return res.code(404).send({ message: 'parking_lot_not_found' });
  }

  const where = {
    parkingLotId: parkingLot.id,
    carPlateNumber: { [Op.ne]: null },
  };

  const { carSize } = req.query;
  if (carSize) {
    where.carSize = carSize;
  }

  const parkingSlots = await db.ParkingSlot.findAll({
    where,
    order: [['slotNumber', 'asc']],
  });

  return parkingSlots.map(ps => ps.slotNumber);
}

export default getParkedSlotNumbers;
