const { Accompagnement, Plat, Vignette, Profil } = require('../models/index.js');
const dayjs = require('dayjs')
const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database.js');
const validator = require("email-validator");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
      if (bcrypt.compare(password, profilFound.password, function(err, result){})) {
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
    },

    getInscriptionPage(req, res){
      res.render('inscription', {css : 'inscription', error:''})
    },

    async handleInscription(req, res){
      const body = req.body
      const mail = req.body.mail.toLowerCase()

      console.log(body.password + body.confirmation)
      if(!body.nom || !body.prenom || !body.adresse || !body.mail || !body.password || !body.confirmation){
        return res.render('inscription', {
          error: "Tous les champs sont obligatoires.",
          css: 'inscription'
      });
      }

      const mailCheker = await Profil.findOne({ 
        where: { mail }
      })

      if(mailCheker){
        return res.render('inscription', {
          error: "L'utilisateur existe déjà.",
          css: 'inscription'
      })
      };

      if(body.password !== body.confirmation){
        return res.render('inscription', {
          error: "Les mots de passe ne correspondent pas.",
          css: 'inscription'
      });
      }

      if(!validator.validate(body.mail)){
        return res.render('inscription', {
          error: "Veuillez entrer un e-mail valide.",
          css: 'inscription'
      });
      }

      const newUser = Profil.build({ 
        nom: body.nom,
        prenom : body.prenom,
        adresse : body.adresse,
        mail: body.mail,
        password: body.password,
        points: 0,
        role: 'customer'
      });

      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(body.password, salt, function(err, hash) {
          newUser.password = hash
        });
    });

      await newUser.save()
      res.redirect('/login')

    }
}

module.exports = loginController ;