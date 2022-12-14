const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
    dialect: 'postgres',
    define: {
        underscored: true,
        timestamps: false
    }
});

module.exports = sequelize;