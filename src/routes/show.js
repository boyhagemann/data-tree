
var neo4j = require('neo4j');
var tree = require('../../tree.js');

// Connect to the database with credentials
var db = new neo4j.GraphDatabase(process.env.NEO4J_ENDPOINT);

module.exports = function (req, res) {

    const depth = req.query.depth || ''

    // The actual cypher query used to get the node and its children
    var query = `
        MATCH (r:Node)
        WHERE r.id = {id}
        OPTIONAL MATCH (a:Node) - [:HAS_PARENT] -> (r)
        OPTIONAL MATCH (r:Node) - [:HAS_VALUE] -> (v)
        RETURN r AS node, r.id AS id, collect(a) AS children, head(collect(v)) AS value`;

    // Execute the query and return the response
    db.cypher({
        query: query,
        params: {
            id: req.params.id
        }
    }, function (err, results) {

        // Something went wrong
        if (err) throw err;

        // Node does not exist
        if(!results.length) {
            res.status(404);
            return res.send('Node not found');
        }

        // Just for presentation purposes, format the output
        // Can be stripped out for less overhead.
        var json = JSON.stringify(results[0], null, 4);

        return res.send(json);
    });


}