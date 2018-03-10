//product model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productModel = new Schema({
	name : { type:String, required:true },
	category : String,
	price : Number,
	seller : { type:String, required:true }	
});

module.exports = mongoose.model("Product", productModel);