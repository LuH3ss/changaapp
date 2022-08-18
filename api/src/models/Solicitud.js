const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("solicitud", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    idClient: {
      type: DataTypes.STRING,
    },
    idOfferer: {
      type: DataTypes.STRING,
    },
    idPrestador: {
      type: DataTypes.STRING,
    },
    idReview: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.ENUM("pendiente", "aceptado", "rechazado", "finalizado"),
    },
    category: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
};