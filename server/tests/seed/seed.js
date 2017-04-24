const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();

const user = [{
	_id: userOneId,
	email: 'mostafa@email.com',
	password: 'password',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()

	}] 
},{
	_id: userTwoId,
	email: 'jan@email.com',
	password: 'password',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()

	}] 
}];


const todos = [ 
	{_id: new ObjectID(), text: 'this is the first text', _creator: userOneId}, 
	{_id: new ObjectID(), text: 'this is the second text', completed: true, completedAt: 333, _creator: userTwoId} 
	];

//to remove all db recoreds before the assertion test
//add seedind to the db after remove all
var populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then( () => done());
};


var populateUsers = (done) => {
	User.remove({}).then( () => {
		var userOne = new User(user[0]).save();
		var userTwo = new User(user[1]).save();

		return Promise.all([userOne, userTwo]);
	}).then(() => done());
};

module.exports = {todos, populateTodos, user, populateUsers};