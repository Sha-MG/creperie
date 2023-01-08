
const { Accompagnement, Plat, Vignette, Commande } = require('../models/index.js');
const dayjs = require('dayjs')


const commandeController = {
    
    async handleGettingCommande(req, res){

// On récupère les infos nécessaires à la déclaration de la commande dans la BDD 

        let profil = req.session.profil.id
        let prix = req.session.totalCommande

        prix = prix.toString().replace(".", ",")

        let commande = req.session.commande
        let commandePlats = []

// On récupère la date et on la met en format pour le Timestamp de la création de la commande

        let date = new Date(Date.now()).toString()
        date = dayjs(date).format('HH:mm DD/MM/YYYY')

// On fait un tableau avec le nom des plats, puis on le met en string pour l'ajouter a la commande
        for(let plat of commande){
          commandePlats.push(plat.nom)
        }
        let commandeContenu = commandePlats.join(' | ')

// On créé la nouvelle commande dans la BDD
        let newCommande = await Commande.create({   
            profils_id: profil,
            prix: prix,
            contenu: commandeContenu ,
            statut: 'En cours',
            createdAt: date
        })

        res.redirect('/profil')
        }
    
}

module.exports = commandeController;
