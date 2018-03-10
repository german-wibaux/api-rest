//User model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
	nickname: { type: String, required: true },
	password: { type: String, required: true }
});

module.exports = mongoose.model("User", userModel);