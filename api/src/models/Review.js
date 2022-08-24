const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("review", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 1,
      },
    },
  });
};
