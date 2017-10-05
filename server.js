var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
app.use(bodyParser.json({ extended: true }));

// CRUD
// create read update delete (destroy)

// Get all users
app.get('/users', function(req, res) {

});

// Get one user
app.get('/users/:id', function(req, res) {

});

// Create new user
app.post('/users', function(req, res) {

});

// Update one user
app.put('/users/:id', function(req, res) {

});

// Delete one user
app.delete('/users/:id', function(req, res) {
  console.log("Making a delete request");

  res.json(req.params.id);
});

app.listen(port, function() {
  console.log('Listening on', port);
});
