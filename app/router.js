const express = require( 'express');
const router = express.Router();
const mainController = require('./controllers/mainController')
 
// Routes basiques
router.get('/carte', mainController.getAllPlats );
router.get('/', mainController.getIndex)

module.exports = router;