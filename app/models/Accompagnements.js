const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database.js');

class Accompagnement extends Model {};

Accompagnement.init({
    nom: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    couleur: {
        type: DataTypes.TEXT,
        allowNull: false },
}, {
    sequelize,
    tableName: "accompagnements"
});

module.exports = Accompagnement;