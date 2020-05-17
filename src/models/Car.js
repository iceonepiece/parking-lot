export default (sequelize, DataTypes) => {
  const Car = sequelize.define('car', {
    plateNumber: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    size: {
      type: DataTypes.ENUM('small', 'medium', 'large'),
      allowNull: false,
    },
  });

  return Car;
}
