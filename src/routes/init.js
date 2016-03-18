
var neo4j = require('neo4j');

// Connect to the database with credentials
var db = new neo4j.GraphDatabase(process.env.NEO4J_ENDPOINT);

module.exports = function (req, res) {

    // The actual cypher query used to get the node and its children
    var query = `
        CREATE (a:Node {id: "n1", name: "root", order: 0})
        CREATE (b:Node {id: "n2", name: "child 1", order: 0})
        CREATE (c:Node {id: "n3", name: "child 2", order: 0})
        CREATE (e:Node {id: "n4", name: "child 4", order: 0})
        CREATE (d:Node {id: "n5", name: "child 3", order: 0})
        CREATE (v1:Box {id: "v1", class: "box box--offset m p"})
        CREATE (v2:Link {id: "v2", href: "/testurl", class: "btn btn--positive"})
        CREATE (v3:Text {id: "v3", text: "Hello"})
        CREATE (v4:Text {id: "v4", text: "World"})
        CREATE (b) - [:HAS_PARENT] -> (a)
        CREATE (c) - [:HAS_PARENT] -> (a)
        CREATE (d) - [:HAS_PARENT] -> (c)
        CREATE (e) - [:HAS_PARENT] -> (c)
        CREATE a - [:HAS_VALUE] -> v1
        CREATE c - [:HAS_VALUE] -> v2
        CREATE d - [:HAS_VALUE] -> v3
        CREATE e - [:HAS_VALUE] -> v4`;

    // Execute the query and return the response
    db.cypher({ query: query }, function (err, results) {

        // Something went wrong
        if (err) throw err;

        return res.send('Nodes created!');
    });


}