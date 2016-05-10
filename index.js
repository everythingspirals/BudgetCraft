'use strict';

//Modules
var envvar = require('envvar');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var plaid = require('plaid');

var pg = require('pg');


//Environment
var APP_PORT = "8000";
var PLAID_CLIENT_ID = "57182f630259902a3980edcb";
var PLAID_SECRET = "b959df77517a12907da0a036660c18";

//Plaid
var plaidClient = new plaid.Client(PLAID_CLIENT_ID, PLAID_SECRET, plaid.environments.tartan);
var plaidHelper = require('./plaid.js')(plaidClient);

//Express
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({ 
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true
}));

//Postgres
var conn = "postgres://postgres:redpanda@159.203.223.194/budgetcraft"
        
//Views
app.set('views', __dirname + '/views')
app.set('view engine', 'jade');

//Routes
var accounts = require('./accounts/accounts.routes')(app, pg, conn, plaidClient);
var login = require('./login/login.routes')(app, pg, conn);
var budgets = require('./budgets/budgets.routes')(app, pg, conn);

//Server
var server = app.listen(APP_PORT, function () {
  console.log('BudgetCraft listening on port ' + String(APP_PORT));
});

module.exports = app;