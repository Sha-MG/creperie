const { Accompagnement, Plat, Vignette, Profil } = require('../models/index.js');
const dayjs = require('dayjs')
const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database.js');


const loginController = {

    renderLoginPage(req, res){

        res.render('login', { css: 'login', error : '' }) ;
    },

    async loginProfil(req, res){


      const mail = req.body.mail;
      const password = req.body.password;

      const profilFound = await Profil.findOne({ 
          where: { mail }, 
          include : {
            association: 'commandes',
            include: {
              association: 'plats'
            },
            order: [
              ['createdAt', 'DESC'],
          ],
          } 

      });
     
      if (!profilFound) {
          return res.render('login', {
            css: 'login',
            error: "Aucun utilisateur n'existe avec cet email."
          });
      }
      if (password !== profilFound.password) {
          return res.render('login', {
              error: "Mot de passe invalide.",
              css: 'login'
          });
      }

      req.session.profil = profilFound;
      delete req.session.profil.password;

      res.redirect('/profil') ;

    },

    async profilPage(req, res){
      res.render('profil', {css: 'profil'})
    },

    deconnexion(req, res){

      req.session.profil = false ;
      res.locals.profil = false;
      res.redirect('/login')
    },

    async profilModify(req, res){

      const mail = req.session.profil.mail
      const email = req.body.mail

      console.log('ICI LE MAIL ________________')
      console.log(email)

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

      profilFound.save()

      res.redirect('/profil')
    },

    getInscriptionPage(req, res){
      res.render('inscription', {css : 'inscription', error:''})
    }
}

module.exports = loginController ;