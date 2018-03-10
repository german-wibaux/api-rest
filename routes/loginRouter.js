var express = require('express');
var loginController = require('./../controller/loginController');
var loginRouter = express.Router();

loginRouter.route('')
	.post(loginController.login);


module.exports = loginRouter;