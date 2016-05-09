"use strict"

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../db.sqlite3');
var _ = require('lodash');
var uuid = require('node-uuid');
var moment = require('moment');

module.exports.initializeDatabase = function(callback) {
  db.run("CREATE TABLE IF NOT EXISTS data (id TEXT, timestamp DATETIME, username TEXT, dataname TEXT, data TEXT)", callback);
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

module.exports.insertRaw = function(username, dataname, data, callback) {
  var id = uuid.v1();
  var timestamp = moment().toISOString();
  var sql = "INSERT INTO data (id, timestamp, username, dataname, data) VALUES ($id, $timestamp, $username, $dataname, $data)";
  var params = {
    $id: id,
    $timestamp: timestamp,
    $username: username,
    $dataname: dataname,
    $data: JSON.stringify(data)
  };
  return db.run(sql, params, callback);
};

module.exports.getRaw = function(username, dataname, callback) {
  var sql = "SELECT * FROM data WHERE username = $username AND dataname = $dataname ORDER BY timestamp DESC, id DESC";
  // todo - implement order by column by munging v1 uuids: https://github.com/broofa/node-uuid/issues/75
  var params = {
    $username: username,
    $dataname: dataname
  };
  return db.all(sql, params, function(err, rows){
    if (err) return callback(err);

    var data = _.map(rows, function(x) {
      x.data = JSON.parse(x.data);
      delete x.username;
      delete x.dataname;
      return x;
    });
    return callback(null, data);
  });
};

