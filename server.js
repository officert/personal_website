"use strict";

/* =========================================================================
 *
 *   Constants
 *
 * ========================================================================= */
var ENV = process.env.NODE_ENV || 'development';
var appConfig = require(__dirname + '/config/appConfig')[ENV];

/* =========================================================================
 *
 *   Dependencies
 *
 * ========================================================================= */
var express = require('express');
var http = require('http');
var app = module.exports = express();
var path = require('path');
var newRelic = require('newrelic');

// Global Variables
global.Website = {};

//app settings
app.set('strict routing', true);

app.use(express.static(path.join(__dirname, '/build')));

/* =========================================================================
 *
 *   Routes
 *
 * ========================================================================= */
app.get('*', function(req, res) {
  res.sendfile('build/index.html');
});

//start server
http.createServer(app).listen(appConfig.port, function() {
  console.log('express server listening on port ' + appConfig.port);
});
