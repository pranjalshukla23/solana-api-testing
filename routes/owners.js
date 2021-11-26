//express
const express = require('express');

//create router
const router = express.Router();

//function to get owners
const getOwners = require('../controllers/owners')


//post request
router.post('/',getOwners);


//export router
module.exports = router;