const { Accompagnement, Plat, Vignette } = require('../models/index.js');

const mainController = {

    getIndex(req, res){

        res.render('index', {css : 'index' })
    },

    async getAllPlats(req, res){
        try{
        
        // Chargement de la carte avec association des accompagnements et des allergies. 

            const platsList = await Plat.findAll({
                include: [
                    {
                        association: 'accompagnements',
                        association: 'vignettes'
                    }
                ]
        })

        res.render('carte', {platsList, css: 'carte'})

        }catch(error){
            console.log(error)
            res.status(500).render('500',{error})
        }
    },

    noPage(req, res){
        res.status(404).render('404', {css: '404'})
    },

    getPanier(req, res){

    // Si y a pas déjà de commande en cours, on la créée.
        if(!req.session.commande){

            req.session.commande = []
            req.session.totalCommande = 0
            
        }

    // Dans tous les cas on transmet les données de la session en cours aux locals
    // pour qu'ils soient dispo pour les vues EJS

        res.locals.commande = req.session.commande
        res.locals.totalCommande = req.session.totalCommande

        res.render('panier', {css:'panier'})
    },

    getContactPage(req, res){

        res.render('contact', {css:'contact'})

    }
};

module.exports = mainController;

