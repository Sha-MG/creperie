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

router.get('/profil', loginController.profilPage);
router.post('/profil', loginController.profilModify);



module.exports = router;