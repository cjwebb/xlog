"use strict"

var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var gzip = require('compression');
var jwt = require('express-jwt');
var db = require('./db.js');
var config = require('./config.js');
var app = express();

var jwtCheck = jwt({
  secret: new Buffer(config.authSecret, 'base64'),
  audience: config.authId
});

app.use(gzip());
app.use(bodyParser.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/static', express.static(__dirname + '/../build'));

// ---- HTML Routes ----

app.get('/', function(req, res) {
  var authConfig = { authId: config.authId, authDomain: config.authDomain };
  res.render('home', authConfig);
});

// ---- API Routes ----
app.get('/api/datatypes', function(req, res) {
  var payload = [
    "Alice",
    "Bob",
    "Charlie"
  ]
  res.json(payload);
});

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

app.get('/api/:username/:dataname/raw', function(req, res) {
  // todo - santize :username and :dataname
  // todo - check permissions for username (via middleware)
  db.getRaw(req.params.username, req.params.dataname, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'DatabaseError' });
    }
    return res.json({raw: data});
  });
});

app.post('/api/:username/:dataname/raw', function(req, res) {
  if (req.body) {
    db.insertRaw(req.params.username, req.params.dataname, req.body, function(err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'DatabaseError' });
      }
      return res.end();
    });
  } else {
    return res.status(400).json({ error: 'Missing data' });
  }
});

// ---- Initialise App ----
db.initializeDatabase(function() {
  app.listen(3000, function() {
    console.log('Listening on port 3000');
  });
});

