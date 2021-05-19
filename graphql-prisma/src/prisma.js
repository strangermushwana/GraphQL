import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'thisistheasuperamazingsecret',
  fragmentReplacements,
})

export { prisma as default }

// const createPostForUser = async (authorId, data) => {
//     const userExists = await prisma.exists.User({ id: authorId })

//     if (!userExists) {
//         throw new Error('User not found')
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         },

//     }, '{ author { id name email posts {  id title published }  }}')
//     return post.author
// }

// const updatePostForUser = async (postId, data) => {
//     const postExists = await prisma.exists.Post({
//         id: postId
//     })

//     if (!postExists) {
//         throw new Error('Post not found')
//     }

//     const post = await prisma.mutation.updatePost({
//         data,
//         where: {
//             id: postId
//         }
//     }, '{  author {  id name email posts { id title published } } }')

//     return post.author
// }

// updatePostForUser('ckoty9lzb038x0956xo24g2sq', {published: false}).then((user) => {
//     console.log(JSON.stringify(user, undefined, 3))
// }).catch((error) => {
//     console.log(error.message)
// })

// createPostForUser('ckottk29g00ck09569i3ul1m5', {
//     title: 'Now let me add something',
//     body: 'The man who saw tommorw',
//     published: 'true'
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 3))
// }).catch((error) => {
//     console.log(error.message)
// })
