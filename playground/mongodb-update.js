//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unabled to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// deleteMany
	/*db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('5b578bc1e1210f13a4d8f9c8')
	}, {
		$set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});*/

	// set name to another
	// increment age
	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5b518076b3dbe1291cae0a5e')
	}, {
		$set: {
			name: 'Jirka'
		},
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	})

	//db.close();
});