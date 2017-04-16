
const {MongoClient, ObjectID} = require('mongodb');


var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

	if (err) {
		return console.log('Unable to connect to mongoDB Server');
	}

	console.log('Connect to mongoDB Server');

	//deleteMany
	// db.collection('Todos').deleteMany({text: 'eat breakfast'}).then( (result) => {
	// 	console.log(result);
	// });

	//deleteOne
	// db.collection('Todos').deleteOne({text: 'Something to do'}).then( (result) => {
	// 	console.log(result);
	// });

	//findOneAndDelete
	// db.collection('Todos').findOneAndDelete({text: 'eat breakfast'}).then( (result) => {
	// 	console.log(result);
	// });

	//challenge
	// db.collection('Users').deleteMany({name: 'mostafa'}).then( (result) =>  {
	// 	console.log(result);
	// });


	//chanllenge by Id
	db.collection('Users').findOneAndDelete({_id: new ObjectID('58f1e9ef79c53c3ce8d0211c')}).then((result) => {
		console.log(result);
	});


	//db.close();
});