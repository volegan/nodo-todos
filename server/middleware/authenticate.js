var {User} = require('./../models/user');

//private route - middleware
var authenticate = (req, res, next) => {
	var token = req.header('x-auth');

	User.findByToken(token).then((user) => {
		if(!user){
			return Promise.reject();
		}

		req.user  = user;
		req.token = token;
		next();

	}).catch((e) => {
		res.status(400).send();
	});
};

module.exports = {authenticate};