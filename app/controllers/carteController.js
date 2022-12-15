const { where } = require('sequelize');
const { Accompagnement, Plat, Vignette } = require('../models/index.js');

const carteController = {

    async getAllPlats(req, res){
        try{
            
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
        res.render('carte', {platsList, entreeList, dessertList, css: 'carte'})

        }catch(error){
            console.log(error)
            res.status(500).render('500',{error, css: 'error'})
        }
    }
}

module.exports = carteController ;