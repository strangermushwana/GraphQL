import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import { resolvers, fragmentReplacements } from './resolvers/index'
import prisma from './prisma'

const pubSub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      db,
      pubSub,
      prisma,
      request,
    }
  },
  fragmentReplacements,
})

server.start(() => {
  console.log('The server is runing')
})
