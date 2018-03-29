const mongoose = require('mongoose')
const config = require('./config')
const app = require('./app')

mongoose.connect(config.db , { useMongoClient: true } , (err, res) => {
	if (err) {
		return console.log(`Error connect to DB ${err} `)
	}
	console.log('Connection to DB stablished')

	app.listen(config.port, () => {
		console.log(`-->Server is running in port ${config.port}`)
	})
})