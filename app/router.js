const express = require( 'express');

const carteController = require('./controllers/carteController');
const loginController = require('./controllers/loginController');
const mainController = require('./controllers/mainController')
const commandeController = require('./controllers/commandecontroller')
const router = express.Router();


// Routes basiques
router.get('/carte', carteController.getAllPlats );
router.get('/', mainController.getIndex);

// Login & Inscription
router.get('/login', loginController.renderLoginPage);
router.post('/login', loginController.loginProfil);
router.get('/deconnexion', loginController.deconnexion)
router.get('/inscription', loginController.getInscriptionPage)
router.post('/inscription', loginController.handleInscription)

// Profil
router.get('/profil', loginController.profilPage);
router.post('/profil', loginController.profilModify);

// 404
router.use((req, res) => {
    res.status(404).render('404', { css: "404" })
  })


module.exports = router;