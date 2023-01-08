const { where } = require('sequelize');
const { Accompagnement, Plat, Vignette } = require('../models/index.js');
const { findByPk } = require('../models/Plats.js');

const carteController = {

    async getAllPlats(req, res){
        try{

    // Chargement des entrées
            const entreeList = await Plat.findAll({
                include: [
                    {
                        association: 'vignettes'
                    }
                ],
                where: {
                    type: "Entrée"
                 }
            })

    // Chargement des plats principaux
            const platsList = await Plat.findAll({
                include: [
                    {  association: 'accompagnements'},
                    {  association: 'vignettes'},
                ],
                where: {
                    type: "Plat"
                }
             })
    // Chargement des desserts
            const dessertList = await Plat.findAll({
                include: [
                    {
                        association: 'vignettes'
                    }
                ],
                where: {
                    type: "Dessert"
                }
            })

        
        res.render('carte', {platsList, entreeList, dessertList, css: 'carte', message:''})

        }catch(error){

    // Si y a une erreur on rend une page 500.
            console.log(error)
            res.status(500).render('500',{error, css: 'error'})
        }
    },

    async addPlats(req, res){
        try{

        // On récupère le plat ajouté dans la BDD
            const platToAdd = await Plat.findByPk(req.params.id)
        
        // Si la commande n'existe pas déjà on la créée
            if(!req.session.commande){
                req.session.commande = []
                req.session.totalCommande = 0
            }

        // On ajoute le plat à la commande & on rend la commande dispo en local pour les vues EJS.
            req.session.commande.push(platToAdd);

            res.locals.commande = req.session.commande
        
        // On recharge toute la carte pour l'afficher de nouveau.
            const entreeList = await Plat.findAll({
                include: [
                    {
                        association: 'vignettes'
                    }
                ],
                where: {
                    type: "Entrée"
                 }
            })

            const platsList = await Plat.findAll({
                include: [
                    {  association: 'accompagnements'},
                    {  association: 'vignettes'},
                ],
                where: {
                    type: "Plat"
                }
            })

            const dessertList = await Plat.findAll({
            include: [
                {
                    association: 'vignettes'
                }
            ],
            where: {
                type: "Dessert"
            }
            })

        // On récupère le prix du plat ajouté, on enlève le € généré par la BDD (parce que déclaré comme type PRICE)
        // On passe la , en . pour pouvoir le passer en nombre via un parseFloat
        // On additionne le résultat au total de la commande et on le rend dispo pour les vues EJS

            let prix= platToAdd.prix
            prix = prix.split("").filter(c => c !== '€').join('').replace(',', '.');

            req.session.totalCommande += parseFloat(prix)
            res.locals.totalCommande = req.session.totalCommande

            res.render('carte', {css: "carte", dessertList, platsList, entreeList, message:`Vous avez ajouté ${platToAdd.nom} à votre commande.`})

        }catch(error) {
        
        // Si erreur => page 500
        
            console.log(error)
            res.status(500).render('500',{error, css: 'error'})
        }

    },

    delPlats(req, res){

    // On récupère la commande actuelle, le plat qu'on veux enlever et que son index dans la commande
        let commande = req.session.commande
        let platToDel = commande.find(plat => plat.id == req.params.id)
        let index = commande.indexOf(platToDel)

    // On créer deux tableaux : 
    // Un avec les éléments avant le plat a enlever
    // Un avec les élements après le plat a enlever
    // On les regroupe pour refaire la commande

        const firstArr = commande.slice(0, index);
        const secondArr = commande.slice(index + 1);
        let newCommande = [...firstArr , ...secondArr]

    // On recalcul le prix de la commande
        let prix= platToDel.prix
        prix = prix.split("").filter(c => c !== '€').join('').replace(',', '.');

        req.session.totalCommande -= parseFloat(prix)

    // On transmet la nouvelle commande partout
        req.session.commande = newCommande
        res.locals.commande = req.session.commande 
        res.locals.totalCommande = req.session.totalCommande

        res.redirect('/panier')
    }

}

module.exports = carteController ;