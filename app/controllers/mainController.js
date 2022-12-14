const { Accompagnement, Plat, Vignette } = require('../models/index.js');

const mainController = {
    async getAllPlats(req, res){
        const platsList = await Plat.findAll({
            include: "accompagnements",
            include: "vignettes"
        })

    res.render('carte', {platsList})
    }
};

module.exports = mainController;

