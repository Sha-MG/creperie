const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database.js');

class Vignette extends Model {};

Vignette.init({
    nom: {
        type: DataTypes.TEXT,
        allowNull: false 
    },
    icone: {
        type: DataTypes.TEXT,
        allowNull: false  },

}, {
    sequelize,
    tableName: "vignettes"
});

module.exports = Vignette;