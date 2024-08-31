const { gql } = require('apollo-server-express');

// Type definitions (Schema)
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Resolvers
const resolvers = {
    Query: {
        hello: () => 'Hello, world!',
    },
};

module.exports = { typeDefs, resolvers };
