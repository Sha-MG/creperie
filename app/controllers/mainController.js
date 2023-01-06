const { Accompagnement, Plat, Vignette } = require('../models/index.js');

const mainController = {

    getIndex(req, res){

        res.render('index', {css : 'index' })
    },

    async getAllPlats(req, res){
        try{
            
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
    }
};

module.exports = mainController;

