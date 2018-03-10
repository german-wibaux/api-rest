var User = require('./../model/userModel');
var jwt = require('jsonwebtoken');

//POST
//endpoint: /login
var login = function (req, res) {
    //Checks that nickname and password are valid and returns a token 
    User.findOne( {nickname: req.body.nickname} , function (err, user) {
        //If the nickname doesn't exist returs error
        if (err || !user) {
            res.status(401);
            res.send({msg: "nickname or password invalid"});
        }
        else {
            if (user.password != req.body.password) {
                //If the password doesn't match with the stored password returs error
                res.status(401);
                res.send({msg: "nickname or password invalid"}); 
            }
            else {
                //Token is created. Could set a secret word to create the token and the expiration time
                //jwt.sign(user, 'secretword',{exprieIn: 60}) 
                var token = jwt.sign(user, 'supersecretpassword');
                res.status(200);
                res.send({ msj: "Welcome", token: token });
            }
        }
    });
};

module.exports = {
    login: login
}