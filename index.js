require('dotenv').config();

var express = require('express');
var validator = require('express-validator');
var graphqlHTTP = require('express-graphql');
var app = express();
var bodyParser = require('body-parser')

var initRoute = require('./src/routes/init')
var treeRoute = require('./src/routes/tree')
var showRoute = require('./src/routes/show')
var childrenRoute = require('./src/routes/children')
var storeRoute = require('./src/routes/store')
var updateRoute = require('./src/routes/update')
var deleteRoute = require('./src/routes/delete')


// We must allow CORS access from the outside.
// For now, this is one local test website
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CORS_ALLOWED_ORIGIN);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(validator());

// Request handler for showing one node and all its children
// presented as a node tree.
app.get('/init', initRoute);
app.get('/tree/:id', treeRoute);
app.get('/node/:id', showRoute);
app.get('/children/:id', childrenRoute);
app.post('/node', storeRoute);
app.put('/node/:id', updateRoute);
app.delete('/node/:id', deleteRoute);


app.listen(process.env.PORT, function () {
    console.log('Example app listening on port', process.env.PORT);
});