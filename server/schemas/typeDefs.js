// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  password: String
  savedBooks: [String]
}

type Book {
 authors: [String]
 description: String
 bookId: String
 image: String
 link: String
 title: String
}

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
  users: [User]
  user(username: String!): User
  books(username: String): [Book]
  book(_id: ID!): Book
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(author: String!, description: String!, title: String!, bookId: String!, image: String!, link: String!): User
  removeBook(bookId: String!, _id: ID!, username: String!, email: String!, bookCount:Int): User
 
}
  `;

// export the typeDefs
module.exports = typeDefs;