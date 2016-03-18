
var neo4j = require('neo4j');
var tree = require('../../tree.js');

// Connect to the database with credentials
var db = new neo4j.GraphDatabase(process.env.NEO4J_ENDPOINT);

module.exports = function (req, res) {

    // Get the node id from the request url
    var id = parseInt(req.params.id);

    // The actual cypher query used to get the node and its children
    var query = `
        MATCH (b:Node) - [:HAS_PARENT*0..] -> (r:Node)
        WHERE r.id = {id}
        OPTIONAL MATCH (a:Node) - [:HAS_PARENT] -> (b)
        OPTIONAL MATCH (b:Node) - [:HAS_VALUE] -> (v)
        RETURN b AS node, collect(a.id) AS children, head(collect(v)) AS value`;

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


}