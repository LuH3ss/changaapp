const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('usuario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // lastName: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // birthDate: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      // },
      // email: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   unique: true,
      // },
      // phone: {
      //   type: DataTypes.STRING,
      // },
      // img: {
      //   type: DataTypes.STRING,
      // },
      offerer: {
        type: DataTypes.BOOLEAN
      },
      admin: {
        type: DataTypes.BOOLEAN
      },
      banned: {
        type: DataTypes.BOOLEAN
      }
    });
}