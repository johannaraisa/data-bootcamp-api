﻿var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var db = require('./config/database');
var bodyParser = require('body-parser');

mongoose.connect(db.getConnectUrl());

var app = express();

app.set('port', 9030);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
