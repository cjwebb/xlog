"use strict"

var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var gzip = require('compression');
var jwt = require('express-jwt');
var db = require('./db.js');
var config = require('./config.js');

var jwtCheck = jwt({
  secret: new Buffer(config.authSecret, 'base64'),
  audience: config.authId
});

app.use(gzip());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/static', express.static(__dirname + '/../build'));

// ---- HTML Routes ----

app.get('/', function(req, res) {
  var payload = [
    { name: "Alice", age: 31 },
    { name: "Bob", age: 33 },
    { name: "Charlie", age: 26 }
  ]
  res.render('home', { payload: JSON.stringify(payload) });
});

// ---- API Routes ----
app.use('/api/users', jwtCheck);
app.use('/api/users', function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'InvalidAuthToken' });
  }
});

app.get('/api/users/:name', function(req, res) {
  // todo - sanitize :name
  db.getUserLog(req.name, function(err, data) {
    if (err) {
      console.log(err);
      return res.json("oh noes");
    }
    res.json(data);
  });
});

// ---- Initialise App ----
db.initializeDatabase(function() {
  app.listen(3000, function() {
    console.log('Listening on port 3000');
  });
});

