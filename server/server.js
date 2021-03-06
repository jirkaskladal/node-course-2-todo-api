const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	//console.log(req.body);
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	})
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	
	//valid id using isValid
	if (!ObjectID.isValid(id)) {
		console.log('ID not valid');
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		console.log('Find sucessfully, but?!');
		if (!todo) {
			console.log('No todos!');
			return res.status(404).send();	
		}
		console.log('Todo found!');

		res.send({todo});
	}).catch((e) => {
		console.log('Exception...');
		res.status(400).send(e);
	})
});

app.delete('/todos/:id', (req, res) => {
  // get the id
	var id = req.params.id;

  // validate the id -> not valid? return 404
	if (!ObjectID.isValid(id)) {
		console.log('ID not valid');
		return res.status(404).send();
	}

  //remove todo by id
	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		return res.status(200).send({todo});
	}).catch((e) => {
			res.status(400).send(e);
	});
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

  // validate the id -> not valid? return 404
	if (!ObjectID.isValid(id)) {
		console.log('ID not valid');
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findOneAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(400).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});


app.listen(3000, () => {
	console.log('Started on port 3000');
});

module.exports = {app};