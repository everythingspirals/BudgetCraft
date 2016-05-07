'use strict';

//Modules
var envvar = require('envvar');
var express = require('express');
var session = require('express-session');
var bluebird = require('bluebird');
var bodyParser = require('body-parser');
var plaid = require('plaid');
var plaidHelper = require('./plaid.js');
var pg = require('pg');


//Environment
var APP_PORT = "8000";
var PLAID_CLIENT_ID = "57182f630259902a3980edcb";
var PLAID_SECRET = "b959df77517a12907da0a036660c18";

//Plaid
var plaidClient = new plaid.Client(PLAID_CLIENT_ID, PLAID_SECRET, plaid.environments.tartan);

//Express
var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 60000 }}));

//Postgres
var conn = "postgres://postgres:redpanda@159.203.223.194/budgetcraft"
        
//Views
app.set('views', __dirname + '/views')
app.set('view engine', 'jade');

//Routes
require('./accounts/accounts.routes')(app, pg, conn);

//Server
var server = app.listen(APP_PORT, function () {
  console.log('BudgetCraft listening on port ' + String(APP_PORT));
});
