var Product = require('./../model/productModel');
var isEmpty = require('is-empty');

//GET
//endpoint: /products      
//endpoint: /products?{filter}
var get = function (req, res) {
	//Get all products and can filters them by category, price_from, price_to
	//or any combination 
	var query = {};

	for (var key in req.query) {
		//Creates the query from the filters
		switch (key) {
			case 'category':
				query.category = req.query[key];
				break;
			case 'price_from':
				if (!query.price)
					query.price = { '$gte': req.query['price_from'] }
				else
					query.price['$gte'] = req.query['price_from'];
				break;
			case 'price_to':
				if (!query.price)
					query.price = { '$lte': req.query['price_to'] }
				else
					query.price['$lte'] = req.query['price_to'];
				break;
		}
	}

	//If the query is empty returns all the products otherwise apply it
	Product.find(query).exec(function (err, products) {
		if (err) {
			res.status(500);
			res.send({msg:"Internal server error"});
		}
		else {
			res.status(200);
			res.send(products);
		}
	});

};

//GET
//endpint: /products/{id}
var getById = function (req, res) {
	//Get a product by id, if it doesn't exist returns and error
	Product.findById(req.params.id, function (err, product) {
		if (err) {
			res.status(404);
			res.send({ msg: 'Product not found' });
		}
		else {
			res.status(200);
			res.send(product);
		}
	});
};


//POST
//endpoint: /products 
var add = function (req, res) {
	//Add a new product
	var product = new Product(req.body);
	product.save(function (err) {
		//If some field of product is invalid returns error
		console.log(err);
		if (err) {
			res.status(412);
			res.send({msg: "Failed add"});
		}
		else {
			res.status(201);
			res.send(product);
		}
	});
};

//PUT
//endpoint: /products/{id}
var update = function (req, res) {
	//Update at least one product's field
	Product.findById(req.params.id, function (err, product) {
		//Get a product by id, if it doesn't exist returns and error
		if (!err) {
			//Avoids modifying product's id
			if (req.body._id) {
				delete req.body._id;
			}
			//Update field by field
			for (var p in req.body) {
				product[p] = req.body[p];
			}
			product.save(function (err) {
				if (!err) {
					res.status(200);
					res.send(product);
				}
				else {
					if (err) {
						//Returns the list of error with a description
						var errorResp = {};
						
						var errors = Object.keys(err.errors);				

						errors.forEach(e => {
							errorResp[e] = err.errors[e].name;
						})
						
						res.status(412);
						res.send({ errors: errorResp });
					} else {
						res.status(500);
						res.send({msg: "Internal server error"});
					}
				}
			});
		}
		else {
			res.status(404);
			res.send({msg: "Product not found"});
		};
	});
};

//DELETE
//endpoint: /products/{id}
var del = function (req, res) {
	//Delete a product by id
	Product.findById(req.params.id, function (err, product) {
		//If the product exists is delated, otherwise returns error
		if (err) {
			res.status(404);
			res.send({msg: "Product not found"});
		}
		else {
			product.remove(function (err) {
				if (err) {
					res.status(500);
					res.send({msg: "Internal server error"});
				}
				else {
					res.status(200);
					res.send({msg : "Successfully removed"});
				};
			});
		};
	});
};


module.exports = {
	add: add,
	get: get,
	getById: getById,
	update: update,
	del: del,
};