const users = [
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

const posts = [
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

const comments = [
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

const db = {
  users,
  posts,
  comments,
}

export { db as default }
