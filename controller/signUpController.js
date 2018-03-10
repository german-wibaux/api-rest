var User = require('./../model/userModel');

//POST
//endpint: /signup
var signUp = function (req, res) {
	//Check that the nickname does not exist, if it exists it returns error
	//otherwise the user is registered
	User.findOne({ nickname: req.body.nickname }, function (err, user) {
		if (!user) {
			var user = new User(req.body);
			user.save(function (err) {
				//Check that nickname and password aren't null or invalid
				if (err) {
					res.status(412);
					res.send({msg: "Failed add"});
				}
				else {
					res.status(201);
					res.send({msg: "Added"});
				};
			});
		}
		else {
			res.status(409);
			res.send({msg: "User already exist"});
		}
	});
};

module.exports = {
	signUp: signUp
}