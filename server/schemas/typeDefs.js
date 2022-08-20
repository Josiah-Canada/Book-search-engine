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
  token: String
  user: User
}

type Query {
  me: [User]
  user(username: String!): User
  password(password: String): Password
  books(_id: ID!): Book
}

type Mutation {
  login(email: String!, password: String!): User
  addUser(username: String!, email: String!, password: String!): User
  saveBook(author: String!, description: String!, title: String!, bookId: String!, image: String!, link: String!): User
  removeBook(bookId: String!, _id: ID!, username: String!, email: String!, bookCount:Int): User
 
}
  `;

// export the typeDefs
module.exports = typeDefs;