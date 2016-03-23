import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean, GraphQLInt } from 'graphql';

export const NodeType = new GraphQLObjectType({
    name: 'node',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                description: 'The unique RFC4122 compliant identifier for this node',
            },
            type: {
                type: GraphQLString,
                description: 'The type of this node',
            },
            name: {
                type: GraphQLString,
                description: 'The administrative name for this node',
            },
            label: {
                type: GraphQLString,
                description: 'The administrative title displayed in the admin UI',
            },
            active: {
                type: GraphQLBoolean
            },
            value: {
                type: ValueType,
                description: 'Holds all the configuration to build a component',
            },
            children: {
                type: new GraphQLList(NodeType)
            }
        }
    }
})

export const ValueType = new GraphQLObjectType({
    name: 'value',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                description: 'The unique RFC4122 compliant identifier for this value',
            },
            type: {
                type: GraphQLString,
                description: 'The type of this value',
            }
        }
    }
})