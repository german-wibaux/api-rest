var express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan')
var productsRouter = require('./routes/productsRouter')
var loginRouter = require('./routes/loginRouter')
var signUpRouter = require('./routes/signUpRouter')
var bodyParser = require('body-parser')
var auth = require('./auth')
const port = process.env.PORT || 3000

//For connect to mlab.com usign mongodb and mongoose add the next line
//mongodb://<dbuser>:<dbpassword>@ds125623.mlab.com:25623/productsdb
//var db = mongoose.connect("mongodb://localhost/ProductsDb");


mongoose.connect('mongodb://localhost:27017/properties', { useMongoClient: true } , (err, res) => {
	if (err) {
		return console.log(`Error connect to DB ${err} `)
	}
	console.log('Connection to DB stablished')

	app.listen(port, () => {
		console.log(`-->Server is running in port ${port}`)
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



