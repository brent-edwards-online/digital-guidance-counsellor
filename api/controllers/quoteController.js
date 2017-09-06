'use strict';

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'quotes_api',
  password : 'x,2CUM[Y2}wJW/m~',
  database : 'QuotesApi'
});

exports.list_all_quotes = function(req, res) {
  console.log('list_all_quotes');
  //connection.connect()
  connection.query('SELECT * FROM Quotes', function (err, rows, fields) {
    if (err)
      res.send(err);
    res.json(rows);
  })
 // connection.end()
};

exports.create_a_quote = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_quote = function(req, res) {
  console.log('read_a_quote: ' + req.params.quoteId);
  connection.query('SELECT * FROM Quotes WHERE QuoteId = ?', req.params.quoteId, function (err, rows, fields) {
    if (err)
      res.send(err);
    res.json(rows);
  })
};


exports.update_a_quote = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_quote = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
