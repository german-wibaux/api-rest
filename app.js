var express = require('express')
var morgan = require('morgan')
var productsRouter = require('./routes/productsRouter')
var loginRouter = require('./routes/loginRouter')
var signUpRouter = require('./routes/signUpRouter')
var bodyParser = require('body-parser')
var auth = require('./auth')
var app = express();


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
//Set endpoints
app.use('/login', loginRouter);
//app.use('/signup', signUpRouter);
//Set token for products
app.use('/products', productsRouter);

module.exports = app



