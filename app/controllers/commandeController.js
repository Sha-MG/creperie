
const { Accompagnement, Plat, Vignette, Commande } = require('../models/index.js');

const commandeController = {
    
    async handleGettingCommande(req, res){

// On récupère les infos nécessaires à la déclaration de la commande dans la BDD 

        let profil = req.session.profil.id
        let prix = req.session.totalCommande
        let commande = req.session.commande

        let newCommande = await Commande.create({   
            profils_id: profil,
            prix: prix,
            plats: [
                { plats_id: 1, commandes_id: 1 },
                { plats_id: 2, commandes_id: 1 },
                { plats_id: 3, commandes_id: 1 }
              ]
            }, {
              include: [{
                association: Plat,
                as: 'plats'
              }]
            })

    
        }
    
}

module.exports = commandeController;
