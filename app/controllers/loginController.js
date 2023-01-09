const { Accompagnement, Plat, Vignette, Profil, Commande } = require('../models/index.js');
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

// On récupère le mail et le password
      const mail = req.body.mail.toLowerCase();
      const password = req.body.password;

// On cherche un profil avec le mail indiqué et on y joins les commandes
      const profilFound = await Profil.findOne({ 
          where: { mail }, 
          include : {
          association: 'commandes',
          },
          order: [
            ["commandes", "createdAt", "DESC"]
        ]

      });
     
// Si y a pas de profil
      if (!profilFound) {
          return res.render('login', {
            css: 'login',
            error: "Aucun utilisateur n'existe avec cet email."
          });
      }

// Si le password n'est pas bon
      if (bcrypt.compare(password, profilFound.password, function(err, result){})) {
          return res.render('login', {
              error: "Mot de passe invalide.",
              css: 'login'
          });
      }


// On setup la session avec le profil en enlevant le mdp
      req.session.profil = profilFound;
      delete req.session.profil.password;

      res.redirect('/profil') ;

    },

    getInscriptionPage(req, res){
      res.render('inscription', {css : 'inscription', error:''})
    },

    async handleInscription(req, res){
      const body = req.body
      const mail = req.body.mail.toLowerCase()

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