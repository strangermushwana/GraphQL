const Query = {
  users(parent, args, { db }, info) {
    if (args.query) {
      return db.users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    }

    return db.users
  },

  comments(parent, args, { db }, info) {
    return db.comments
  },

  posts(parent, args, { db }, info) {
    if (args.query) {
      return db.posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        )
      })
    }

    return db.posts
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
}

export { Query as default }
