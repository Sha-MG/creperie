const express = require( 'express');
const router = express.Router();
const mainController = require('./controllers/mainController')
 
// Route /carte 
router.get('/carte', mainController.getAllPlats );


module.exports = router;