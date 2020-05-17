export default (sequelize, DataTypes) => {
  const ParkingLot = sequelize.define('parkingLot', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxSlots: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return ParkingLot;
}
