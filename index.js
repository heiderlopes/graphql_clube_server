const {ApolloServer} = require("apollo-server")
const clubeSchema = require('./api/clube/schema/clube.graphql')
const clubeResolvers = require('./api/clube/resolvers/clubeResolver.js')

const ClubeAPI = require("./api/clube/datasource/clube")

const typeDefs = [clubeSchema]
const resolvers = [clubeResolvers]

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    dataSources: () => {
        return {
            clubeAPI: new ClubeAPI()
        }
    }
});

server.listen().then(({url}) => {
    console.log(`Servidor rodando na porta ${url}` );
})
