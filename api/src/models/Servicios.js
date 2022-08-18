const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("servicios", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    img: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    review: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    idCategory: {
      type: DataTypes.STRING,
    }
  });
};