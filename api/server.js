var express = require('express');
var app = express();
var port = process.env.PORT || 3002;
var bodyParser = require('body-parser');
var cors = require('cors');
var connection  = require('express-myconnection'); 
var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  connection(mysql,{
    host     : 'localhost',
    user     : 'dgc_api',
    password : 'x,2CUM[Y2}wJW/m~',
    port     : 3306, //port mysql
    database : 'DigitalGuidanceCounsellor'
  },'request')
);

var routes = require('./routes/routes'); //importing route
routes(app); //register the route
app.listen(port, function(){
  console.log('RESTful API server started on: ' + port);
});


