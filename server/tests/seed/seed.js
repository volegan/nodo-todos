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
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()

	}] 
},{
	_id: userTwoId,
	email: 'jan@email.com',
	password: 'password'
}];


const todos = [ 
	{_id: new ObjectID(), text: 'this is the first text'}, 
	{_id: new ObjectID(), text: 'this is the second text', completed: true, completedAt: 333} 
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