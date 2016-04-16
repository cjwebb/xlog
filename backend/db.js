var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../db.sqlite3');
var _ = require('lodash');

module.exports.initializeDatabase = function(callback) {
  db.run("CREATE TABLE IF NOT EXISTS data (date DATETIME, name TEXT, data TEXT)", callback);
};

module.exports.getUserLog = function(username, callback) {
  db.all("SELECT * FROM data", function(err, rows) {
    if (err) return callback(err);

    var data = _.map(rows, function(x) {
      x.data = JSON.parse(x.data);
      return x;
    });
    return callback(null, data);
  });
};

