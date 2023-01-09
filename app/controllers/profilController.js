const { Accompagnement, Plat, Vignette, Profil, Commande } = require('../models/index.js');
const dayjs = require('dayjs')
const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database.js');
const validator = require("email-validator");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const profilController = {
    async profilPage(req, res){
      
        if(req.session.profil){
          const mail = req.session.profil.mail ;
  
          const profilFound = await Profil.findOne({ 
            where: { mail }, 
            include : {
            association: 'commandes',
            },
            order: [
              ["commandes", "createdAt", "DESC"]
          ]
  
        });
  
        req.session.profil = profilFound;
        }
          
        
        res.render('profil', {css: 'profil'})
        
       
  
      },
  
      deconnexion(req, res){
  
        req.session.profil = false ;
        res.locals.profil = false;
        res.redirect('/login')
      },
  
      async profilModify(req, res){
  
        const mail = req.session.profil.mail
  
        const profilFound = await Profil.findOne({ 
          where: { mail }
        })
  
        if(req.body.nom){
          profilFound.nom = req.body.nom
          req.session.profil.nom = req.body.nom
        }
        if(req.body.prenom){
          profilFound.prenom = req.body.prenom
          req.session.profil.prenom = req.body.prenom
        }
        if(req.body.mail){
          profilFound.mail = req.body.mail
          req.session.profil.mail = req.body.mail
        }
        if(req.body.adresse){
          profilFound.adresse = req.body.adresse
          req.session.profil.adresse = req.body.adresse
        }
  
        await profilFound.save()
  
        res.redirect('/profil')
      }
}

module.exports = profilController ;