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
    carPlateNumber: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    carSize: {
      type: DataTypes.ENUM('small', 'medium', 'large'),
      defaultValue: null,
    },
  });

  return ParkingSlot;
}
