const Plat = require('./Plats.js');
const Vignette = require('./Vignettes.js');
const Accompagnement = require('./Accompagnements.js');
const Profil = require ('./Profil.js')
const Commande = require('./Commandes')

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

// Relation Profil <.> Commandes
Profil.hasMany(Commande, {
    foreignKey: "profils_id",
    as: "commandes" 
});
Commande.belongsTo(Profil, {
    foreignKey: "profils_id",
    as: "profil"
})

// Relation Commandes <.> Plats
Commande.belongsToMany(Plat, {
    as: 'plats',
    through: 'commandes_has_plats',
    foreignKey: 'commandes_id',
    otherKey: 'plats_id'
});
Plat.belongsToMany(Commande, {
    as: 'commandes',
    through: 'commandes_has_plats',
    foreignKey: 'plats_id',
    otherKey: 'commandes_id'

});


module.exports = { Vignette, Plat, Accompagnement, Profil, Commande };