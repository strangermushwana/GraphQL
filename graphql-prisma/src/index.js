import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Subscription from './resolvers/Subscription'
import prisma from './prisma'

// Resolvers
const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment,
}

const pubSub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      db,
      pubSub,
      prisma,
      request
    }
  },
})

server.start(() => {
  console.log('The server is runing')
})
