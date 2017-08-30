//server layer for setting up api and routes

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var data = require('./data.js');

//static resource routing
app.use('/client', express.static(__dirname + '/client'));

//api routes for requesting data as json or csv
app.get('/api/show', function(req, res) {
    //retrieve json data from data access layer
    data.getJsonData()
        .then(data => res.json(data))
        .catch(err => res.send(err));
});
app.get('/api/download', function(req, res) {
    //retrieve csv data from data access layer
    data.getCsvData()
        .then(data => res.send(data))
        .catch(err => res.send(err));
});

//route to index page
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

//start server
var port = process.env.PORT || 8080;
serv.listen(port);
console.log('Server listening on port', port);