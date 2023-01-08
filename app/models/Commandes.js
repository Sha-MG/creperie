const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database.js');

class Commande extends Model {};

Commande.init({
    prix: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    statut: {
        type: DataTypes.TEXT,
        allowNull: false 
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "commandes",
});

module.exports = Commande;