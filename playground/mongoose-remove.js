const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

/*Todo.remove({}).then((result) => {
	console.log(result);
});*/

/*Todo.findOneAndRemove({}).then((result) => {
});*/
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5b7335d81806da359d013d58').then((todo) => {
	console.log(todo);
});