var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../db.sqlite3');
var app = express();
var _ = require('lodash');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  fs.readFile('../build/TestHelloWorld.js', function(err, data){
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

app.get('/api/users/colin', function(req, res) {
  db.all("SELECT * FROM data", function(err, rows){
    if (err) return res.json("oh noes");
    res.json(_.map(rows, function(x){
      x.data = JSON.parse(x.data);
      return x;
    }));
  });
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

