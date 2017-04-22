const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email : {
		type: String,
		required: true, 
		trim: true, 
		minlength: 1,
		unique: true,
		validate: {
			// isAsync: false,
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
UserSchema.methods.toJson = function () {
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


//find user by token and verify the token
UserSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;

	try{
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});


};


//find user for login with email and password
UserSchema.statics.findByCredential = function (email, password) {
	var User = this;

	return User.findOne({email}).then( (user) => {
		if(!user) {
			return Promise.reject();
		}

		return new Promise( (resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					resolve(user);
				} else {
					reject();
				}
			});
		});

	});

};



//middleware to encrypte the password
UserSchema.pre('save', function(next) {
	var user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	}else{
	   next();
	}
});

var User = mongoose.model('Users', UserSchema);


module.exports = { User };