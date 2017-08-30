var express = require('express');
var app = express();
var serv = require('http').Server(app);
var data = require('./data.js');

//static file routing
app.use('/client', express.static(__dirname + '/client'));

//api routes for requesting data as json or csv
app.get('/api/show', function(req, res) {
    data.getJsonData()
        .then(data => res.json(data))
        .catch(err => res.send(err));
});
app.get('/api/download', function(req, res) {
    data.getCsvData()
        .then(function(data) {
            console.log(data);
            res.set({
                'Content-Disposition': 'attachment; filename=\"locations.csv\"',
                'Content-type': 'text/csv'
            });
            res.send(data);
        }).catch(err => res.send(err));
});

//route to index
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

//start server
var port = process.env.PORT || 8080;
serv.listen(port);
console.log('Server listening on port', port);