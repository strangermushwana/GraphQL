import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

//Scaler types - String, Booliean, Int, Float, ID

// Demo user data
let users = [
  {
    id: '1',
    name: 'John',
    email: 'john@exapmle.com',
    age: 24,
  },
  {
    id: '2',
    name: 'Maria Johnson',
    email: 'maria@exapmle.com',
  },
  {
    id: '3',
    name: 'Michael',
    email: 'mike@exapmle.com',
    age: 52,
  },
]

let posts = [
  {
    id: '10',
    title: 'The art of war',
    body: 'Some book that I will maybe read one day',
    published: true,
    author: '1',
  },
  {
    id: '20',
    title: 'Hero of the north',
    body: 'I have no idea',
    published: false,
    author: '2',
  },
  {
    id: '30',
    title: 'Harry Potter and the half blood prince',
    body: 'One of the harry potter books',
    published: true,
    author: '1',
  },
]

let comments = [
  {
    id: '14',
    text: 'This is the fist comment',
    author: '1',
    post: '10',
  },
  {
    id: '15',
    text: 'Hello darkness my old friend',
    author: '1',
    post: '20',
  },
  {
    id: '16',
    text: 'I came to speak with you again',
    author: '3',
    post: '10',
  },
  {
    id: '17',
    text: 'I dont remember the last part of the song',
    author: '2',
    post: '30',
  },
]

// Type definitions(Schema)
const typeDefs = `
  type Query {
    me: User!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    post: Post!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput): Post!
    deletePost(id: ID!): Post!
    createComment(data: CreateCommentInput) : Comment!
    deleteComment(id: ID!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
`

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (args.query) {
        return users.filter((user) => {
          return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
      }

      return users
    },

    comments(parent, args, ctx, info) {
      return comments
    },

    posts(parent, args, ctx, info) {
      if (args.query) {
        return posts.filter((post) => {
          return (
            post.title.toLowerCase().includes(args.query.toLowerCase()) ||
            post.body.toLowerCase().includes(args.query.toLowerCase())
          )
        })
      }

      return posts
    },

    me() {
      return {
        id: '123098aaB',
        name: 'Michael',
        email: 'mike@gmail.com',
        age: 42,
      }
    },

    post() {
      return {
        id: '123098aaCCSA',
        title: 'The man who saw the end',
        body: 'This is a body',
        published: true,
      }
    },
  },

  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => {
        return user.email === args.data.email
      })

      if (emailTaken) {
        throw new Error('Email taken.')
      }

      const user = {
        id: uuidv4.v4(),
        ...args.data,
      }

      users.push(user)
      return user
    },

    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex((user) => {
        return user.id === args.id
      })

      if (userIndex === -1) {
        throw new Error('User not found')
      }

      const deletedUser = users.splice(userIndex, 1)
      posts = posts.filter((post) => {
        const match = post.author === args.id
        if (match) {
          comments = comments.filter((comment) => {
            return comment.post !== post.id
          })
        }

        return !match
      })

      comments = comments.filter((comment) => {
        return comment.author !== args.id
      })

      return deletedUser[0]
    },

    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => {
        return user.id === args.data.author
      })

      if (!userExists) {
        throw new Error('User not found.')
      }

      const post = {
        id: uuidv4.v4(),
        ...args.data,
      }

      posts.push(post)
      return post
    },

    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex((post) => {
        return post.id === args.id
      })

      if (postIndex === -1) {
        throw new Error('Post not found')
      }

      const deletedPost = posts.splice(postIndex, 1)
      comments = comments.filter((comment) => comment.post !== args.id)

      return deletedPost[0]
    },

    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => {
        return user.id === args.data.author
      })

      const postExists = posts.some((post) => {
        return post.id === args.data.post && post.published
      })

      if (!userExists || !postExists) {
        throw new Error('Unable to find user and post')
      }

      const comment = {
        id: uuidv4.v4(),
        ...args.data,
      }

      comments.push(comment)
      return comment
    },

    deleteComment(parent, args, ctx, info) {
      const commentIndex = comments.findIndex((comment) => {
        return comment.id === args.id
      })
      if (commentIndex === -1) {
        throw new Error('Comment not found')
      }
      const deletedComment = comments.splice(commentIndex, 1)
      return deletedComment[0]
    },
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
    },
  },

  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },

    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
      })
    },
  },
}

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
})

server.start(() => {
  console.log('The server is runing')
})
