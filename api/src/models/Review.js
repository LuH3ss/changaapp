const {
    DataTypes
} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "review", {
            mensaje: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rating: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 1,
                    max: 5
                }
            }
        }, {
            timestamps: false,
        }
    );
}