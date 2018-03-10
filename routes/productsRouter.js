var express = require('express');
var productsController = require('./../controller/productsController');
var productsRouter = express.Router();

productsRouter.route('')
	.get(productsController.get)
	.post(productsController.add);
//Routes with ID
productsRouter.route('/:id')
	.get(productsController.getById)
	.put(productsController.update)
	.delete(productsController.del);


module.exports = productsRouter;