import dotenv from 'dotenv'
import neo4j from 'neo4j-promised-cypher'
import uuid from 'node-uuid'

// Load the env variables first
dotenv.config()

// Connect to the database with credentials
const db = neo4j(process.env.NEO4J_ENDPOINT)

export const getNode = id => {

    // The actual cypher query used to get the node and its children
    const query = `
        MATCH (c:Node) - [:HAS_PARENT] -> (r) - [:HAS_VALUE] -> (v)
        WHERE r.id = {id}
        RETURN r AS node, collect(c) AS children, v AS value`

    // Execute the query and return the response
    return db.query(query, { id })
        .then( item => Object.assign(item.node, {value: item.value, children: item.children}))
        .error( err => {
            throw err
        })
}

export const getChildren = id => {

    // The actual cypher query used to get the node and its children
    const query = `
        MATCH (a:Node) - [:HAS_PARENT] -> (r)
        WHERE r.id = {id}
        OPTIONAL MATCH (a) - [:HAS_VALUE] -> (v)
        RETURN a AS node, head(collect(v)) AS value`

    // Execute the query and return the response
    return db.query(query, { id })
        .then( collection => collection.map( item => Object.assign(item.node, {value: item.value})))
        .error( err => {
            throw err
        })
}

export const insertNode = params => {

    console.log(params)

    // Merge
    const parent  = params.parent
    const props   = Object.assign({}, params.node, {id: uuid.v4()})
    const values  = Object.assign({}, params.value, {id: uuid.v4()})

    // The actual cypher query used to get the node and its children
    var query = `
        MATCH (p:Node)
        WHERE p.id = {parent}
        CREATE (a:Node {props})
        CREATE (v:` + params.node.type + ` {values})
        CREATE (a) - [:HAS_PARENT] -> (p)
        CREATE a - [:HAS_VALUE] -> v
        RETURN a AS node, v AS value`;

    // Execute the query and return the response
    return db.query(query, { parent, props, values })
        .then( item => Object.assign(item.node, {value: item.value}))
        .error( err => {
            throw err
        })

}