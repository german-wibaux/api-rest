var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var productsRouter = require('./routes/productsRouter');
var loginRouter = require('./routes/loginRouter');
var signUpRouter = require('./routes/signUpRouter');
var bodyParser = require('body-parser');
var auth = require('./auth');

//For connect to mlab.com usign mongodb and mongoose add the next line
//mongodb://<dbuser>:<dbpassword>@ds125623.mlab.com:25623/productsdb
var db = mongoose.connect("mongodb://localhost/ProductsDb");

var app = express();
app.use(bodyParser.json());

app.listen(3000, function () {
	console.log("Server is running");
});

//Set endpoints
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);

//Set token for products
app.use('/products',auth.auth, productsRouter);



