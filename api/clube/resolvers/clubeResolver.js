const { GraphQLScalarType } = require('graphql')

const clubeResolvers = {

    ClubeOrigem : {
        NACIONAL: "NACIONAL",
        INTERNACIONAL: "INTERNACIONAL"
    },

    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'string de data e hora no formato ISO-8601',
        serialize: (value) => value,
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
    }),

    Query: {
        clubes : (root, args, { dataSources } ) => dataSources.clubeAPI.getClubes(),
        clube : (root, {id}, {dataSources}) => dataSources.clubeAPI.getClubeById(id)
    },

    Mutation: {
        addClube: async (root, {clube}, {dataSources}) => dataSources.clubeAPI.addClube(clube),
        updateClube: async (root, data, {dataSources}) => dataSources.clubeAPI.updateClube(data),
        deleteClube: async (root, { id }, { dataSources }) => dataSources.clubeAPI.deleteClube(id)
    }
} 

module.exports = clubeResolvers