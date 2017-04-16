const {MongoClient, ObjectID} = require('mongodb');


var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

	if (err) {
		return console.log('Unable to connect to mongoDB Server');
	}

	console.log('Connect to mongoDB Server');

	//findOneAndUpdate
	// db.collection('Todos').findOneAndUpdate({_id: new ObjectID('58f360cae3cc914734db3e33')}, 
	// 	{
	// 		$set: {
	// 			completed: true
	// 		}
	// 	}, {
	// 		returnOriginal: false
	// 	}).then( (result) => {
	// 		console.log(result);
	// 	});


	//challenge
	db.collection('Users').findOneAndUpdate({name: 'Mostafa Esmat'}, { $set: {name: 'Mostafa'}, $inc: {age: 1} },
	 {returnOriginal: false}).then((result) => {
	 	console.log(result);
	 });

	//db.close();
});