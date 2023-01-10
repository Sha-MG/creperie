const express = require( 'express');

const carteController = require('./controllers/carteController');
const commandeController = require('./controllers/commandeController');
const loginController = require('./controllers/loginController');
const mainController = require('./controllers/mainController');
const profilController = require('./controllers/profilController');
const adminController = require('./controllers/adminController');

const router = express.Router();


// Routes basiques
router.get('/', mainController.getIndex);
router.get('/panier', mainController.getPanier) ;
router.get('/contact', mainController.getContactPage);
router.get('/404', mainController.noPage);
router.get('/500', mainController.pageOups)

// Routes carte & panier
router.get('/carte', carteController.getAllPlats );
router.get('/carte/:id', carteController.addPlats);
router.get('/carte/supp/:id', carteController.delPlats);
router.post('/panier', commandeController.handleGettingCommande);

// Login & Inscription
router.get('/login', loginController.renderLoginPage);
router.post('/login', loginController.loginProfil);
router.get('/inscription', loginController.getInscriptionPage)
router.post('/inscription', loginController.handleInscription)

// Profil
router.get('/profil', profilController.profilPage);
router.post('/profil', profilController.profilModify);
router.get('/deconnexion', profilController.deconnexion)

// Admin options
router.get('/profil/carteModif', adminController.modificationCartePage)
router.post('/profil/carteModif', adminController.handleModif)
router.get('/profil/commandeProgress', adminController.commandeProgressionPage )
router.get('/profil/commandeProgress/:id', adminController.commandeProgression)
router.get('/profil/commandeHistory', adminController.commandeHistoryPage)
router.post('/profil/commandeHistory', adminController.commandeHistorySearch)
router.get('/profil/modifProfil', adminController.modifProfilPage)


// 404 si la route appelée ne correspond a aucune de celles du dessus.
router.use((req, res) => {
    res.status(404).redirect('/404')
  })


module.exports = router;