const Plat = require('./Plats.js');
const Vignette = require('./Vignettes.js');
const Accompagnement = require('./Accompagnements.js');

// Relations Plat <-> Vignette
Plat.belongsToMany(Vignette, {
    as: 'vignettes',
    through: 'plats_has_vignettes',
    foreignKey: 'vignettes_id',
    otherKey: 'plats_id'
});
Vignette.belongsToMany(Plat, {
    as: 'plats',
    through: 'plats_has_vignettes',
    foreignKey: 'plats_id',
    otherKey: 'vignettes_id'
});

//  Relations Plats <-> Accompagnement

Plat.belongsToMany(Accompagnement, {
    as: 'accompagnements',
    through: 'plats_has_accompagnements',
    foreignKey: 'accompagnements_id',
    otherKey: 'plats_id'
});
Accompagnement.belongsToMany(Plat, {
    as: 'plats',
    through: 'plats_has_accompagnements',
    foreignKey: 'plats_id',
    otherKey: 'accompagnements_id'
});

module.exports = { Vignette, Plat, Accompagnement };