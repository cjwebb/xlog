var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var app = express();
var jwt = require('express-jwt');
var db = require('./db.js');

var jwtCheck = jwt({
  // todo - read from environment
  secret: new Buffer('YOUR_CLIENT_SECRET', 'base64'),
  audience: 'YOUR_CLIENT_ID'
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// ---- HTML Routes ----

app.get('/', function(req, res) {
  fs.readFile('../build/Main.js', function(err, data){
    if (err) {
      res.send("oh noes");
      return console.log(err);
    }
    var payload = [
      { name: "Alice", age: 31 },
      { name: "Bob", age: 33 },
      { name: "Charlie", age: 26 }
    ]
    res.render('home', { elm: data, payload: JSON.stringify(payload) });
  });
});

// ---- API Routes ----
app.use('/api/users', jwtCheck);

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

