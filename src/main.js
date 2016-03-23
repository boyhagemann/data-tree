import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'
import cors from 'cors'

const app = express()

// We must allow CORS access from the outside.
app.options('/graphql', cors())
app.use(cors())

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port', process.env.PORT);
});