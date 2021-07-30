// Refer : How to use Apollo Server with Express JS 
// https://www.apollographql.com/docs/apollo-server/integrations/middleware/


const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// const { typeDefs } = require('./Schemas/TypeDefs/TypeDefs');
// const { resolvers } = require('./Schemas/Resolvers/Resolvers');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello World!'
    }
  }
}

async function startApolloServer(typeDefs, resolvers) {

  // Same ApolloServer initialization as before
  const server = new ApolloServer({ typeDefs, resolvers });

  // Required logic for integrating with Express
  await server.start();
  const app = express();
  server.applyMiddleware({
     app,

     // By default, apollo-server hosts its GraphQL endpoint at the
     // server root. However, *other* Apollo Server packages host it at
     // /graphql. Optionally provide this to match apollo-server.
     path: '/graphql'   
  });

  // Modified server startup
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);