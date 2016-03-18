
var neo4j = require('neo4j');

// Connect to the database with credentials
var db = new neo4j.GraphDatabase(process.env.NEO4J_ENDPOINT);

module.exports = function (req, res) {

    // The actual cypher query used to get the node and its children
    var query = `
        MATCH (v2) <-[:HAS_VALUE]- (p) -[:HAS_PARENT*0..]-> (a:Node) - [:HAS_VALUE] -> (v)
        WHERE a.id = {id}
        DETACH DELETE a, p, v, v2`;

    // Execute the query and return the response
    db.cypher({
        query: query,
        params: {
            id: req.params.id
        }
    }, function (err, results) {

        // Something went wrong
        if (err) throw err;

        return res.send('Node deleted!');
    });


}