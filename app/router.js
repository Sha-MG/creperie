const express = require( 'express');
const carteController = require('./controllers/carteController');
const router = express.Router();
const mainController = require('./controllers/mainController')
 
// Routes basiques
router.get('/carte', carteController.getAllPlats );
router.get('/', mainController.getIndex)

module.exports = router;