const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database.js');

class Profil extends Model {};

Profil.init({
    nom: {
        type: DataTypes.TEXT,
        allowNull: false 
    },
    prenom: {
        type: DataTypes.TEXT,
        allowNull: false  },
    adresse: {
        type: DataTypes.TEXT,
        allowNull: false  },
    points: {
        type: DataTypes.TEXT,
        allowNull: false  },    
    role: {
        type: DataTypes.TEXT,
        allowNull: false  },
    mail: {
        type: DataTypes.TEXT,
        allowNull: false  },        
    password: {
        type: DataTypes.TEXT,
        allowNull: false  },
}, {
    sequelize,
    tableName: "profils"
});

module.exports = Profil ;