const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var data = {
// 	id: 10
// };


// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	});
// });

var hashPassword = '2a$10$lxrR3ZQMwU/u47Vjj/xP9u37LUH9Ra0zZdcx2sGhaVJF76g824kkK';

bcrypt.compare(password, hashPassword, (err, res) => {
	console.log(res);
});