
var neo4j = require('neo4j');

// Connect to the database with credentials
var db = new neo4j.GraphDatabase(process.env.NEO4J_ENDPOINT);

module.exports = function (req, res) {

    // Required
    var id      = req.params.id;

    // Optional
    var order   = parseInt(req.body.order);
    var type    = req.body.type;
    var props   = Object.assign({}, req.body.props, {order: order})
    var values  = Object.assign({}, req.body.values)

    // The actual cypher query used to get the node and its children
    var query = `
        MATCH (a:Node) - [:HAS_VALUE] -> (v)
        WHERE a.id = {id}`;

    var params = {id: id}

    for(var key in props) {
        query += ` SET a.` + key + ` = {prop_` + key + `}`
        params['prop_' + key] = props[key]
    }

    for(var key in values) {
        query += ` SET v.` + key + ` = {value_` + key + `}`
        params['value_' + key] = values[key]
    }

    query += ` RETURN a`


    // Execute the query and return the response
    db.cypher({
        query: query,
        params: params
    }, function (err, results) {

        // Something went wrong
        if (err) throw err;

        console.log(results)

        // Node does not exist
        if(!results.length) {
            res.status(404);
            return res.send('Node not found');
        }

        return res.send('Node updated!');
    });


}