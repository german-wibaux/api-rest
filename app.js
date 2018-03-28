var express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan')
var productsRouter = require('./routes/productsRouter')
var loginRouter = require('./routes/loginRouter')
var signUpRouter = require('./routes/signUpRouter')
var bodyParser = require('body-parser')
var auth = require('./auth')
const config = require('./config')

mongoose.connect(config.db , { useMongoClient: true } , (err, res) => {
	if (err) {
		return console.log(`Error connect to DB ${err} `)
	}
	console.log('Connection to DB stablished')

	app.listen(config.port, () => {
		console.log(`-->Server is running in port ${config.port}`)
	})
})

var app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Set endpoints
app.use('/login', loginRouter);
//app.use('/signup', signUpRouter);

//Set token for products
app.use('/products', productsRouter);



