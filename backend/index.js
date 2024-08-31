const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const app = express();

// Define your GraphQL schema (typeDefs and resolvers)
const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello, world!',
    },
};

// Start the server
const startServer = async () => {
    try {
        // Initialize Apollo Server
        const server = new ApolloServer({ typeDefs, resolvers });

        // Ensure Apollo Server is started before applying middleware
        await server.start();

        // Apply middleware with /api prefix
        app.use('/api', server.getMiddleware());

        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://darshansidev:v20khb6zZEIVp0i1@darshansidev.noizgnt.mongodb.net/')
            .then(() => {
                console.log('MongoDB connected successfully.');
                // Start Express server on port 5005
                app.listen(5005, () =>
                    console.log(`Server running at http://localhost:5005/api`)
                );
            }).catch((e) => {
                console.log("Error For Connection with MongoDB Cluster...", e)
            })

    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
