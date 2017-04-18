//const MongoClient = require('mongodb').MongoClient;  property destructing
const {MongoClient, ObjectID} = require('mongodb');


var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

	if (err) {
		return console.log('Unable to connect to mongoDB Server');
	}

	console.log('Connect to mongoDB Server');

	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if  (err) {
	// 		return console.log('Unable to insert todo', err);
	// 	}
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });


	// db.collection('Users').insertOne({
	// 	name: 'Mostafa Esmat',
	// 	age: 29,
	// 	location: 'Egypt'
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert User');
	// 	}
	// 	console.log( result.ops[0]._id.getTimestamp()) ;
	// });

	db.close();
});