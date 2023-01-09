const { Accompagnement, Plat, Vignette, Commande } = require('../models/index.js');

const adminController = {

// Pour la page de modif de la carte, on charge tous les plats
    async modificationCartePage(req,res){
        const allCarte = await Plat.findAll({
            order: [ ["nom", "ASC"]]
        })

        res.render('modifCarte', {css:'admin', allCarte, message: ''})
    },

// A l'appel POST de la page modif de la carte, on save ou créé en fonction des champs :
    async handleModif(req, res){

// On check le contenu de la requête pour savoir ce qu'on doit faire
// Si y a le champ platselect c'est qu'on veux modifier le plat sélectionné
        if(req.body.platSelect){
// On récup le plat qu'on veux changer
            const id = req.body.platSelect
            const platFound = await Plat.findByPk(id)

            // Si la checkbox est remplie on delete
            if(req.body.platDelete){

                let platToDelete = await platFound.destroy()

                const allCarte = await Plat.findAll({
                    order: [ ["nom", "ASC"]]
                })

                let message = "Le plat a bien été supprimé"
                res.render('modifCarte', {css:'admin', message : message, allCarte})

            // Sinon, on modifie les champs indiqués puis on fait l'update
            }else{
                if(req.body.platRecette){
                    platFound.recette = req.body.platRecette
                    console.log('Tu as changé la recette')
                }
                if(req.body.platRename){
                    platFound.nom = req.body.platRename
                    console.log('Tu as changé le nom')
                }
                if(req.body.platPrix){
                    platFound.prix = req.body.platPrix
                    console.log('Tu as changé le prix')
                }
                
            platFound.type = req.body.platType
            platFound.save()

            const allCarte = await Plat.findAll({
                order: [ ["nom", "ASC"]]
            })

            let message = "Votre plat à bien été mis à jour :)"
            res.render('modifCarte', {css:'admin', message : message, allCarte})

            }
        }
              
// Si y a le champ platNom c'est qu'on veux ajouter un plat
        if(req.body.platNom){
            

            const allCarte = await Plat.findAll({
                order: [ ["nom", "ASC"]]
            })

            let message = "Il y a bien un super nouveau plat à la carte !"
            res.render('modifCarte', {css:'admin', message : message, allCarte})

        }
    },

    commandeProgressionPage(req,res){
        res.render('progressCommande', {css:'admin'})
    },

    commandeHistoryPage(req,res){
        res.render('commandeHistory', {css:'admin'})
    },

    modifProfilPage(req,res){
        res.render('profilModif', {css:'admin'})
    }

}

module.exports = adminController