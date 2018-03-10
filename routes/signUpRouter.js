var express = require('express');
var signUpController = require('./../controller/signUpController');
var signUpRouter = express.Router();

signUpRouter.route('')
	.post(signUpController.signUp);


module.exports = signUpRouter;