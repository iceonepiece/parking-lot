import db from '../db';

const getParkingLotStatus = async (req, res) => {
  const { id } = req.params;

  const parkingLot = await db.ParkingLot.findByPk(id);

  if (!parkingLot) {
    return res.code(404).send({ message: 'parking_lot_not_found' });
  }

  const parkingSlots = await db.ParkingSlot.findAll({
    where: {
      parkingLotId: parkingLot.id,
    },
    order: [['slotNumber', 'asc']],
  });

  const availableStatusList = parkingSlots.map(ps => ({
    slotNumber: ps.slotNumber,
    available: !ps.carPlateNumber,
  }));

  return {
    id: parkingLot.id,
    name: parkingLot.name,
    maxSlots: parkingLot.maxSlots,
    parkingSlots: availableStatusList,
  };
}

export default getParkingLotStatus;
