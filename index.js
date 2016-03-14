require('dotenv').config();

var express = require('express');
var app = express();
var neo4j = require('neo4j');
var tree = require('./tree.js');

// Connect to the database with credentials
var db = new neo4j.GraphDatabase(process.env.NEO4J_ENDPOINT);

// We must allow CORS access from the outside.
// For now, this is one local test website
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CORS_ALLOWED_ORIGIN);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Request handler for showing one node and all its children
// presented as a node tree.
app.get('/node/:id', function (req, res) {

    // Get the node id from the request url
    var id = parseInt(req.params.id);

    // The actual cypher query used to get the node and its children
    var query = `
        MATCH (b:Node) - [:HAS_PARENT*0..] -> (r:Node)
        WHERE r.id = {id}
        OPTIONAL MATCH (a:Node) - [:HAS_PARENT] -> (b)
        OPTIONAL MATCH (b:Node) - [:HAS_VALUE] -> (v)
        RETURN b AS node, collect(a.id) AS children, head(collect(v)) AS value
        ORDER BY id(node)`;

    // Execute the query and return the response
    db.cypher({
        query: query,
        params: {
            id: id
        }
    }, function (err, results) {

        // Something went wrong
        if (err) throw err;

        // Node does not exist
        if(!results.length) {
            res.status(404);
            return res.send('Node not found');
        }

        // Found a node with children, create a tree out of it.
        var node = tree.makeTree(results, id);

        // Just for presentation purposes, format the output
        // Can be stripped out for less overhead.
        var json = JSON.stringify(node, null, 4);

        return res.send(json);
    });


});


app.listen(process.env.PORT, function () {
    console.log('Example app listening on port', process.env.PORT);
});