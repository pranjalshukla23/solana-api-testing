//express
const express = require('express');

//create express router
const router = express.Router();


//function to get tokens
const getTokens = require('../controllers/tokens.js');


//post request
router.post('/tokens',getTokens);


//export the router
module.exports = router;

