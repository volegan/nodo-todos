const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
	email : {
		type: String,
		required: true, 
		trim: true, 
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6 
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});


//limit the returned result from the collection (id, email)
UserSchema.methods.toJson= function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};



//generate token
UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	//insert token to tokens filed array
	user.tokens.push({access, token});

	//save the values to the fields in collection + 
	//return the promise for chaning + it's only a value
	return user.save().then(() => {
		return token;
	});
};


var User = mongoose.model('Users', UserSchema);


module.exports = { User };