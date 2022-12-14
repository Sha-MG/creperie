const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database.js');

class Plat extends Model {};

Plat.init({
    nom: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    recette: {
        type: DataTypes.TEXT,
        allowNull: false },

    prix: {
        type: DataTypes.INTEGER,
        allowNull: false  },

    type: {
        type: DataTypes.TEXT,
        allowNull: false }
}, {
    sequelize,
    tableName: "plats"
});

module.exports = Plat;