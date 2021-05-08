const Subscription = {
  comment: {
    subscribe(parent, { postID }, { db, pubSub }, info) {
      const post = db.posts.find((post) => {
        return post.id === postID && post.published
      })

      if (!post) {
        throw new Error('Post not found')
      }

      return pubSub.asyncIterator(`comment ${postID}`)
    },
  },

  post: {
    subscribe(parent, args, { db, pubSub }, info) {
      return pubSub.asyncIterator('post')
    },
  },
}

export { Subscription as default }
