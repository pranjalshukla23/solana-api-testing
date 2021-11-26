//express
const express = require('express');

const bodyParser = require("body-parser");

//create express app
const app = express();



//routes
const ownerRoute = require('./routes/owners');

const tokensRoute = require('./routes/tokens');



//middleware to serve static files
app.use('/',express.static('static'));


//middleware to handle request with json body
app.use(express.json());

//middleware to read form data
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}))


//middleware to handle owner route
app.use('/post/owners',ownerRoute);

//middleware to handle tokens route
app.use('/post',tokensRoute);



//listen to sever
app.listen('3000',()=> {

    console.log('Server running at port 3000..');

});




