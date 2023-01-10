const { Accompagnement, Plat, Vignette, Commande } = require('../models/index.js');

const adminController = {

// Pour la page de modif de la carte, on charge tous les plats
    async modificationCartePage(req,res){
        const allCarte = await Plat.findAll({
            order: [ ["nom", "ASC"]]
        })

        res.render('modifCarte', {css:'admin', allCarte, message: '', messageType: ''})
    },

// A l'appel POST de la page modif de la carte, on save ou créé en fonction des champs :
    async handleModif(req, res){

// Si y a un prix, on check son format pour éviter les erreurs de BDD
        if(req.body.platPrix){

            let prix = req.body.platPrix
            let prixParse = parseInt(prix)

            if(prix.includes('.') || isNaN(prixParse)){

                const allCarte = await Plat.findAll({
                    order: [ ["nom", "ASC"]]
                })
    
                let message = "Attention au format de votre prix !"
                let messageType = "error"

                res.render('modifCarte', {css:'admin', message, allCarte, messageType})
                return
            }
        }
    

        if(!req.body.platSelect && !req.body.platNom){
            const allCarte = await Plat.findAll({
                order: [ ["nom", "ASC"]]
            })

            let message = "Il faut donner un nom ou choisir un plat !"
            let messageType = "error"

            res.render('modifCarte', {css:'admin', message, allCarte, messageType})
            return
        }
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
                let messageType = "validate"

                res.render('modifCarte', {css:'admin', message, allCarte, messageType})

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
            let messageType = "validate"

            res.render('modifCarte', {css:'admin', message, allCarte, messageType})

            }
        }
              
// Si y a le champ platNom c'est qu'on veux ajouter un plat
        if(req.body.platNom){

// On créé le nouveau plat avec les infos transmises
            let newPlat = await Plat.create({
                nom: req.body.platNom,
                recette: req.body.platRecette,
                prix: req.body.platPrix,
                type: req.body.type
            })

// Si y a des icones associées on les ajoute au plat nouvellement créé :

            if(req.body.Viande){
                let viande = await Vignette.findOne({ where : {nom: "Viande"}})
                newPlat.addVignette(viande)
            }
            if(req.body.Lait){
                let lait = await Vignette.findOne({ where : {nom: "Lait"}})
                newPlat.addVignette(lait)
            }
            if(req.body.Arachide){
                let arachides = await Vignette.findOne({ where : {nom: "Arachides"}})
                newPlat.addVignette(arachides)
            }
            if(req.body.Gluten){
                let gluten = await Vignette.findOne({ where : {nom: "Gluten"}})
                newPlat.addVignette(gluten)
            }
            if(req.body.Poisson){
                let poisson = await Vignette.findOne({ where : {nom: "Poison"}})
                newPlat.addVignette(poisson)
            }
            if(req.body.Végétarien){
                let végé = await Vignette.findOne({ where : {nom: "Végétarien"}})
                newPlat.addVignette(végé)
            }

            const allCarte = await Plat.findAll({
                order: [ ["nom", "ASC"]]
            })

            let message = "Il y a bien un super nouveau plat à la carte !"
            let messageType = "validate"

            res.render('modifCarte', {css:'admin', message, allCarte, messageType})

        }
    },

    async commandeProgressionPage(req,res){
        const allCommandes = await Commande.findAll({
            where : {statut: "En cours"},
            include: [
                {
                    association: 'profil'
                }
            ],
            order: [ ["createdAt", "DESC"]]
        })
        res.render('progressCommande', {css:'admin', allCommandes})
    },

    async commandeProgression(req,res){

        try{

            let commande = await Commande.findByPk(req.params.id, {
                include: [
                    {
                        association: 'profil'
                    }
                ],
                order: [ ["createdAt", "DESC"]]
            })
    
            if(!commande || commande.statut === "Terminé"){
                res.redirect('/profil/commandeProgress')
                return
            }
    
            commande.statut = "Terminé"
            commande.save()
    
            res.redirect('/profil/commandeProgress')

        }catch(error){

            res.status(500).redirect('/500')
        }
        
    },

    async commandeHistoryPage(req,res){

        const allCommandes = await Commande.findAll({
            include: [
                {
                    association: 'profil'
                }
            ],
            order: [ ["createdAt", "DESC"]]
        })

        res.render('commandeHistory', {css:'admin', allCommandes})
    },

    async commandeHistorySearch(req,res){

        try{

            let allCommandes = await Commande.findAll({
                include: [
                    {
                        association: 'profil'
                    }
                ],
                order: [ ["createdAt", "DESC"]]
            })
        
            let foundCommandes = allCommandes ;
        
            if(req.body.nom){
        
                foundCommandes = foundCommandes.filter( commande => 
                commande.profil.nom.includes(req.body.nom) || commande.profil.nom.includes(req.body.prenom) )
            }
            if(req.body.date){
        
        // On met la date au bon format sinon ça va être compliqué !
                let date = req.body.date.split('-')
        
                let mois = date[1]
                let jour = date[2]
                date.pop()
                date.pop()
                date.push(jour)
                date.push(mois)
        
                foundCommandes = foundCommandes.filter( commande => 
                commande.createdAt.includes(date.join('-')))
            }
            if(req.body.statut){
        
                foundCommandes = foundCommandes.filter( commande =>
                commande.statut.includes(req.body.statut))
            }
                
        
            allCommandes = foundCommandes
        
                res.render('commandeHistory', {css:'admin', allCommandes})
        }catch(error){

            res.status(500).redirect('/500')
        }
        
    
    },

    modifProfilPage(req,res){
        res.render('profilModif', {css:'admin'})
    }

}

module.exports = adminController