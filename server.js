import { ApolloServer, gql } from "apollo-server-express"
import dotenv from "dotenv"
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault
} from "apollo-server-core"
import "./DB/db.js"
import resolvers from "./resolvers.js"
import typeDefs from "./schemaGql.js"
import jwt from "jsonwebtoken"
import express from 'express';
import http from 'http';
import cors from "cors"
import path from "path"


if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

// express server
const app = express();
const httpServer = http.createServer(app);

// middleware
app.use(cors())
const context = ({ req }) => {
    const { authorization } = req.headers
    if (authorization) {
        const { email } = jwt.verify(authorization, process.env.SECRET_KEY)
        return { email }
    }
}


// apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [
        process.env.NODE_ENV == 'production' ?
            ApolloServerPluginLandingPageDisabled() :
            ApolloServerPluginLandingPageGraphQLPlayground(),

        ApolloServerPluginDrainHttpServer({ httpServer }),
        // ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ]
})


// production code
if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

await server.start();
server.applyMiddleware({ app, path: '/graphql' });

httpServer.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
})