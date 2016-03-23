import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLInputObjectType  } from 'graphql';
import { NodeType } from './types/node'
import { getChildren, getNode, insertNode } from './models/nodes'

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            nodes:  {
                type: new GraphQLList(NodeType),
                args: {
                    parent: {
                        description: 'The parent node ID',
                        type: GraphQLString
                    },
                },
                resolve: (root, {parent}) => getChildren(parent)
            },
            node:  {
                type: NodeType,
                args: {
                    id: {
                        description: 'The node ID',
                        type: GraphQLString
                    }
                },
                resolve: (root, {id}) => getNode(id)
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            insertNode: {
                type: NodeType,
                args: {
                    parent: {
                        description: 'The parent node ID',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    node: {
                        description: 'The node properties',
                        type: new GraphQLNonNull(new GraphQLInputObjectType({
                            name: 'nodeProperties',
                            fields: {
                                name: {
                                    description: 'The node name',
                                    type: GraphQLString
                                },
                                type: {
                                    description: 'The node type',
                                    type: new GraphQLNonNull(GraphQLString)
                                },
                            }
                        }))
                    },
                    value: {
                        description: 'The value properties',
                        type: new GraphQLNonNull(new GraphQLInputObjectType({
                            name: 'nodeValue',
                            fields: {
                                type: {
                                    description: 'The value type',
                                    type: new GraphQLNonNull(GraphQLString)
                                },
                            }
                        }))
                    }
                },
                resolve: (root, params) => insertNode(params)
            }
        }
    })
})
