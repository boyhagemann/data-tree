var util = require('util');
var neo4j = require('neo4j');
var uuid = require('node-uuid');

// Connect to the database with credentials
var db = new neo4j.GraphDatabase(process.env.NEO4J_ENDPOINT);

module.exports = function (req, res) {

    // Validate
    req.checkBody('parent', 'Parent is required').notEmpty();
    req.checkBody('order', 'Order is required and must be a number').notEmpty().isInt();
    req.checkBody('type', 'Type is required').notEmpty();

    // On error, show response
    var errors = req.validationErrors();
    if (errors) {
        res.send('There have been validation errors: ' + util.inspect(errors), 400);
        return;
    }

    // Sanitize
    req.sanitizeBody('order').toInt();

    // Merge
    var props   = Object.assign({}, req.body.props, {id: uuid.v4(), order: req.body.order})
    var values  = Object.assign({}, req.body.values, {id: uuid.v4()})

    // The actual cypher query used to get the node and its children
    var query = `
        MATCH (p:Node)
        WHERE p.id = {parent}
        CREATE (a:Node {props})
        CREATE (v:` + req.body.type + ` {values})
        CREATE (a) - [:HAS_PARENT] -> (p)
        CREATE a - [:HAS_VALUE] -> v`;

    // Execute the query and return the response
    db.cypher({
        query: query,
        params: {
            parent: req.body.parent,
            props: props,
            values: values,
        }
    }, function (err, results) {

        // Something went wrong
        if (err) throw err;

        return res.send('Node created!');
    });


}