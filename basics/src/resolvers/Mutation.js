import uuidv4 from 'uuid/v4'

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => {
      return user.email === args.data.email
    })

    if (emailTaken) {
      throw new Error('Email taken.')
    }

    const user = {
      id: uuidv4.v4(),
      ...args.data,
    }

    db.users.push(user)
    return user
  },

  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => {
      return user.id === args.id
    })

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const deletedUser = db.users.splice(userIndex, 1)
    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id
      if (match) {
        db.comments = db.comments.filter((comment) => {
          return comment.post !== post.id
        })
      }

      return !match
    })

    db.comments = db.comments.filter((comment) => {
      return comment.author !== args.id
    })

    return deletedUser[0]
  },

  createPost(parent, args, { db }, info) {
    const userExists = db.users.some((user) => {
      return user.id === args.data.author
    })

    if (!userExists) {
      throw new Error('User not found.')
    }

    const post = {
      id: uuidv4.v4(),
      ...args.data,
    }

    db.posts.push(post)
    return post
  },

  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => {
      return post.id === args.id
    })

    if (postIndex === -1) {
      throw new Error('Post not found')
    }

    const deletedPost = db.posts.splice(postIndex, 1)
    db.comments = db.comments.filter((comment) => comment.post !== args.id)

    return deletedPost[0]
  },

  createComment(parent, args, { db }, info) {
    const userExists = db.users.some((user) => {
      return user.id === args.data.author
    })

    const postExists = db.posts.some((post) => {
      return post.id === args.data.post && post.published
    })

    if (!userExists || !postExists) {
      throw new Error('Unable to find user and post')
    }

    const comment = {
      id: uuidv4.v4(),
      ...args.data,
    }

    db.comments.push(comment)
    return comment
  },

  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex((comment) => {
      return comment.id === args.id
    })
    if (commentIndex === -1) {
      throw new Error('Comment not found')
    }
    const deletedComment = db.comments.splice(commentIndex, 1)
    return deletedComment[0]
  },
}

export { Mutation as default }
