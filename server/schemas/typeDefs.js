// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  password: [Password]
}

type Book {
  _id: ID
  Description: String
  createdAt: String
  username: String
  email: Int
  title: String
  image: Image
  link:Link
  reactions: [Reaction]
}

type Description {
  _id: ID
  descriptionBody: String
  createdAt: String
  username: String
}

type Query {
  users: [User]
  user(username: String!): User
  password(password: String): [Password]
  books(_id: ID!): Book
}

type Mutation {
  login(email: String!, password: String!): User
  addUser(username: String!, email: String!, password: String!): User
}
  `;

// export the typeDefs
module.exports = typeDefs;