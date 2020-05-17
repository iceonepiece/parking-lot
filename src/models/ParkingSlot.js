export default (sequelize, DataTypes) => {
  const ParkingSlot = sequelize.define('parkingSlot', {
    parkingLotId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    slotNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    carId: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  });

  return ParkingSlot;
}
