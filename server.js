//https://hackernoon.com/restful-api-design-with-node-js-26ccf66eab09

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wecanable');


app.use(express.static('public'));
app.use(express.static('views'));

app.listen(8000, () => {
	console.log('It is time to get things done !');
});

//const path = require('path');
// viewed at http://localhost:8000
//app.get('/', function(req, res) {
//    res.sendFile(path.join(__dirname + '/index.html'));
//});


var entities = require('./Entities');


app.post('/api/issues', function (req, res) {
	var i = new entities.Issue({
		_title: req.body._title,
		_description: req.body._description
	});
	entities.Issue.create(i, function (err, result) {
		if (err) {
			res.send(500, err);
		} else {
			res.send(201, i);
		}
	});
});

app.get('/api/issues', function (req, res) {
	entities.Issue.find({}, function(err, result){
		if(err){
			res.send(500, err);
		}else{
			res.send(200, result);
		}
	});
});

app.get('/api/issues/:id', function (req, res) {
	entities.Issue.find({_id : req.params.id}, function(err, result){
		if(err){
			res.send(500, err);
		}else{
			res.send(200, result);
		}
	});
});


app.put('/api/issues/:id', function (req, res) {
//	var id = mongoose.Types.ObjectId(reqId);
  const newObj = {
		_title: req.body._title,
		_description: req.body._description,
		_level: req.body._level,
		_status: req.body._status,
		_tag: req.body._tag,
	};
	entities.Issue.update({_id: req.params.id}, newObj, function(err, result){
		if(err){
			res.send(500, err);
		}else{
			res.send(200, result);
		}
	});

});
app.delete('/api/issues/:id', function(req, res) {
	const reqId = req.params.id;
	
	entities.Issue.remove({_id: req.params.id}, function(err){
		if(err){
			res.send(500, err);
		}else{
			res.sendStatus(204);
		}
	});
});