import fastify from "fastify"
import * as db from "./db"
import * as resolvers from "./resolvers"
import fs from "fs"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { ApolloServer, gql } from 'apollo-server-fastify';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
// import fastifyCors from "fastify-cors"

const typeDefs = gql(fs.readFileSync('./src/schema.graphql', { encoding:'utf-8' }))
const schema = makeExecutableSchema({ typeDefs, resolvers })

const port = process.env.PORT || 9000
const app = fastify()

const server = new ApolloServer({
  typeDefs,
  resolvers
})

app.get("/", (req, res) => {
  res.send("Welcome to my graphql api");
})

// app.register(fastifyCors, {
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
// })

server.start().then(() => app.register(
  server.createHandler({ path: '/graphql' })
))

app.listen(
  port, () => console.info(
    `Server started on port ${port}`
  )
)