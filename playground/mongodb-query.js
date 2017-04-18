const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '8f5fd8bea5a55428c6d3ad6';
var userId = '58f37bcc29857325f0ad08a0';

// if (!ObjectID.isValid(id) ) {
// 	console.log('ID is not valid');
// } 

// Todo.find({_id:id}).then((todo) => {
// 	console.log('todos', todo);
// });


// Todo.findOne({_id:id}).then((todo) =>{
// 	console.log('todo one', todo);
// });

// Todo.findById(id).then((todo) => {
// 	if(!todo) {
// 		return console.log('not found');
// 	}
// 	console.log('todo by id', todo);
// }).catch((e) => console.log(e));


User.findById(userId).then((user) =>{
	if(!user) {
		return console.log('user not found');
	}
	console.log(user);
}, (e) => { 
	console.log(e);
});

