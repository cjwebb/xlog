var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');

var app = express();
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

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

